import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const auth = {
  getCaptcha: () => api.get("/captcha"),
  login: (credentials: any) => api.post("/login", credentials),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

export default api;
