import axios from 'axios';

const api = axios.create({
  // Keep frontend and PHP on the same hostname so the session cookie works.
  baseURL: `http://${window.location.hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost'}/kindreach/backend`,
  withCredentials: true, // Send the PHP session cookie with each API request.
  headers: {
    'Content-Type': 'application/json',
  },
});

// A missing/expired session should send the user back to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default api;