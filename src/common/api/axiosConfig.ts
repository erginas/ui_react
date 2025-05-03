// src/common/api/axiosConfig.ts
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1/',
    headers: {'Content-Type': 'application/json'},
    timeout: 10000,
});

// İsteğe bağlı interceptors
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        // Global error handling
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);