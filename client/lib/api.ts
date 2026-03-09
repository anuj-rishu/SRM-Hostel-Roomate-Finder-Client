import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const FALLBACK_API_URL =
  process.env.NEXT_PUBLIC_FALLBACK_API_URL ||
  "https://kdgj5icx4u5ytmrzpcpyddecne0xmdgm.lambda-url.us-east-1.on.aws/api";

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
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retried?: boolean } =
      error.config;

    // Handle 401 – clear session
    if (error.response?.status === 401 && typeof window !== "undefined") {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    }

    // Fallback: retry once against the backup API on network errors, 403, or 5xx
    const isNetworkError = !error.response;
    const isForbidden = error.response?.status === 403;
    const isServerError =
      error.response?.status >= 500 && error.response?.status <= 599;

    if ((isNetworkError || isForbidden || isServerError) && !originalRequest._retried) {
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

export const passkey = {
  getRegistrationOptions: () => api.get("/passkey/register-options"),
  verifyRegistration: (data: any) => api.post("/passkey/register-verify", data),
  getAuthenticationOptions: () => api.get("/passkey/auth-options"),
  verifyAuthentication: (data: any) => api.post("/passkey/auth-verify", data),
  completeLogin: (data: any) => api.post("/passkey/auth-complete", data),
  list: () => api.get("/passkey/list"),
  remove: (credentialId: string) =>
    api.delete(`/passkey/${encodeURIComponent(credentialId)}`),
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
