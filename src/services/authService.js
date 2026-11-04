import api from "./api";

// Naya account banao.
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register.php", userData);
  return response.data;
};

// Login ki details bhejo.
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login.php", { email, password });
  return response.data;
};

// Apni profile save karo.
export const updateProfile = async (data) => {
  const response = await api.post("/auth/update_profile.php", data);
  return response.data;
};

// Apna password change karo.
export const changePassword = async (data) => {
  const response = await api.post("/auth/change_password.php", data);
  return response.data;
};

// Current PHP session ki details lao.
export const getSession = async () => {
  const response = await api.get("/auth/session.php");
  return response.data;
};

// Login session khatam karo.
export const logoutUser = async () => {
  const response = await api.post("/auth/logout.php");
  return response.data;
};
