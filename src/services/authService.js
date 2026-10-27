import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register.php', userData);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login.php', { email, password });
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.post('/auth/update_profile.php', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post('/auth/change_password.php', data);
  return response.data;
};