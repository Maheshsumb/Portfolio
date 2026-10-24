import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 logout only for protected admin routes
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('userInfo');
        // Only redirect to login if the user is currently on an admin page
        if (window.location.pathname.startsWith('/admin')) {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
  }
);

export default api;
