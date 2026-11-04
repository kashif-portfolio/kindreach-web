import axios from "axios";

const api = axios.create({
  // Session cookie ke liye frontend aur PHP ka hostname same rakho.
  baseURL: `http://${window.location.hostname === "127.0.0.1" ? "127.0.0.1" : "localhost"}/kindreach/backend`,
  withCredentials: true, // Har API call ke saath session cookie bhejo.
  headers: {
    "Content-Type": "application/json",
  },
});

// Session khatam ho to login par bhejo.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("user");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
