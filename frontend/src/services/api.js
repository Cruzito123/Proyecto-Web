// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Para debugging
api.interceptors.request.use(request => {
    console.log(`📤 ${request.method?.toUpperCase()} ${request.url}`, request.data || '');
    return request;
});

api.interceptors.response.use(
    response => {
        console.log(`✅ ${response.status} ${response.config.url}`);
        return response;
    },
    error => {
        console.error(`❌ ${error.response?.status || 'NETWORK'} ${error.config?.url}`);
        console.error('Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const reviewAPI = {
    getAll: () => api.get('/resenas/'),
    create: (data) => api.post('/resenas/', data),
};

export const platilloAPI = {
    getAll: () => api.get('/platillos/'),
};

export default api;