import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token from Cookies
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Attaching token to request:", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
