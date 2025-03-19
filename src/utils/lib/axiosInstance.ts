import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent for authentication
});

// Add Authorization token from NextAuth session
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.id) {
    config.headers.Authorization = `Bearer ${session.user.id}`;
  }
  return config;
});

export default api;
