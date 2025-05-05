// src/common/api/axiosConfig.ts
import axios from 'axios';

// Temel ayar
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Token otomatik ekleniyor
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor: Hatalar burada ele alınabilir
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Oturum süresi dolmuş olabilir
            console.warn('Yetkisiz erişim. Oturum süresi dolmuş olabilir.');
            // logout() veya yönlendirme burada yapılabilir
        }
        return Promise.reject(error);
    }
);
