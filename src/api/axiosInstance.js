import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000000000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
