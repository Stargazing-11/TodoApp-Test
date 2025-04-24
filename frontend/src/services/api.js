import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if deployed
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle 401 (unauthorized) globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      message.warning("Session expired. Please log in again.");

      // Clear token + redirect
      localStorage.removeItem("token");
      window.location.href = "/login"; // 🔁 force redirect
    }
    return Promise.reject(err);
  }
);

export default API;
