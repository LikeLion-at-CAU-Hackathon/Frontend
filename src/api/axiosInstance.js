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

export const resolveApiAssetUrl = (assetUrl) => {
  if (!assetUrl) return "";
  if (!/^https?:/.test(API_BASE_URL)) return assetUrl;

  const resolvedUrl = new URL(assetUrl, `${API_BASE_URL}/`);

  if (resolvedUrl.pathname.startsWith("/media/")) {
    return new URL(
      `${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`,
      `${API_BASE_URL}/`,
    ).href;
  }

  return resolvedUrl.href;
};

export default axiosInstance;
