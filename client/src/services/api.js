import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api` || "http://localhost:5000/api",
});

// attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendMessage = async (message) => {
  // 🔒 ensure message is always a string
  const safeMessage =
    typeof message === "string" ? message : JSON.stringify(message ?? "");

  const res = await api.post("/chat", {
    message: safeMessage,
  });

  return res.data;
};

export default api;
