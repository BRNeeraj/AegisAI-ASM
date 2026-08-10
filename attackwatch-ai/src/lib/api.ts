import axios from "axios";

export const API_BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("aegis_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export function apiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;

    // FastAPI validation errors
    if (Array.isArray(data?.detail)) {
      return data.detail.map((e: any) => e.msg).join(", ");
    }

    // FastAPI HTTPException
    if (typeof data?.detail === "string") {
      return data.detail;
    }

    // Custom API message
    if (typeof data?.message === "string") {
      return data.message;
    }

    if (error.code === "ERR_NETWORK") {
      return `Backend unreachable at ${API_BASE_URL}`;
    }

    return error.message;
  }

  return "Unexpected error";
}