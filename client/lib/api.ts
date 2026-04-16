import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9001/api";
const FALLBACK_API_URL = process.env.NEXT_PUBLIC_FALLBACK_API_URL;

const RATE_LIMIT_KEY = "srm_login_cooldown";
const RATE_FAIL_COUNT_KEY = "srm_login_fail_count";

export function getLoginCooldownRemaining(): number {
  if (typeof window === "undefined") return 0;
  const until = parseInt(localStorage.getItem(RATE_LIMIT_KEY) || "0", 10);
  const remaining = Math.ceil((until - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
}

export function applyLoginCooldown(escalate = false): void {
  if (typeof window === "undefined") return;
  const current = parseInt(localStorage.getItem(RATE_FAIL_COUNT_KEY) || "0", 10);
  const fails = escalate ? Math.min(current + 2, 4) : current + 1;
  localStorage.setItem(RATE_FAIL_COUNT_KEY, String(fails));
  const delays = [15, 30, 60, 120];
  const delaySec = delays[Math.min(fails - 1, delays.length - 1)];
  localStorage.setItem(RATE_LIMIT_KEY, String(Date.now() + delaySec * 1000));
}

export function clearLoginCooldown(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RATE_LIMIT_KEY);
  localStorage.removeItem(RATE_FAIL_COUNT_KEY);
}

const SRM_BLOCK_PHRASES = [
  "server ip",
  "ip-blocked",
  "ip blocked",
  "erp-application error",
  "rejected request from this server",
  "use a different hosting",
  "portal rejected",
  "your ip",
];

export function isSrmIpBlockError(message: string): boolean {
  const lower = message.toLowerCase();
  return SRM_BLOCK_PHRASES.some((phrase) => lower.includes(phrase));
}

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retried?: boolean;
  }
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retried?: boolean } =
      error.config;

    if (error.response?.status === 401 && typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }

    const serverErrorMsg: string =
      error.response?.data?.error || error.message || "";

    if (isSrmIpBlockError(serverErrorMsg)) {
      applyLoginCooldown(true);
      return Promise.reject(Object.assign(error, { isSrmIpBlock: true }));
    }

    const isNetworkError = !error.response;
    const isForbidden = error.response?.status === 403;
    const isServerError =
      error.response?.status >= 500 && error.response?.status <= 599;

    if (
      (isNetworkError || isForbidden || isServerError) &&
      !originalRequest._retried
    ) {
      originalRequest._retried = true;
      originalRequest.baseURL = FALLBACK_API_URL;

      const token =
        typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

      const fallbackInstance = axios.create({
        baseURL: FALLBACK_API_URL,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      try {
        return await fallbackInstance(originalRequest);
      } catch (fallbackError) {
        return Promise.reject(fallbackError);
      }
    }

    return Promise.reject(error);
  },
);

export const auth = {
  getCaptcha: () => api.get("/captcha"),
  login: (credentials: any) => api.post("/login", credentials),
  logout: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }
  },
};



export const roommates = {
  getAll: () => api.get("/roommates"),
};

export const payment = {
  createOrder: () => api.post("/payment/create-order"),
  verifyPayment: (orderId: string) => api.post("/payment/verify", { orderId }),
  manualVerify: () => api.post("/payment/manual-verify"),
  getStatus: () => api.get("/payment/status"),
  getConfig: () => api.get("/payment/config"),
};

export default api;
