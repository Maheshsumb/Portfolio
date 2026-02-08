import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update in production to relative or env var
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, e.g., 401 logout
    if (error.response && error.response.status === 401) {
        // Optional: Trigger logout or redirect
    }
    return Promise.reject(error);
  }
);

export default api;
