import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../config/config";

const API_URL = BASE_URL;

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
