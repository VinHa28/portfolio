import axios from 'axios';
import { url } from './url';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer <token>` // handle by interceptor
    }
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use((response) => response, async (error) => {
    if (error.response && error.response.status === 401) {
        console.log("Token expired, trying to refresh...");
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) throw new Error('No refresh token');

            //Send request to get new accessToken
            const res = await axios.post(`${import.meta.env.VITE_API_URL}${url.refreshToken}`, { refreshToken });
            const { accessToken: newAccessToken } = res.data;
            localStorage.setItem('accessToken', newAccessToken);

            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(error.config);
        } catch (refreshError) {
            console.log('Refresh token failed: ', refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/admin';
            return Promise.reject(refreshError);
        }
    }
})

export default api;
