import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,  // ← IMPORTANTE: Envía cookies
});

// ==========================================
// INTERCEPTOR PARA AGREGAR CSRF TOKEN
// ==========================================
api.interceptors.request.use(
    (config) => {
        // Obtener CSRF token de las cookies
        const csrfToken = getCookie('csrftoken');
        
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        
        console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Función para obtener cookie por nombre
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

api.interceptors.response.use(
    (response) => {
        console.log(`✅ ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error(`❌ ${error.response?.status || 'NETWORK'} ${error.config?.url}`);
        console.error('Error completo:', error.response?.data || error.message);
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
