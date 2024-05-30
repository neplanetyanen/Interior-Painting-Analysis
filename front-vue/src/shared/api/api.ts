import axios from 'axios';

import { __BASE_URL__ } from '../config/environment';
import {
    USER_LOCAL_STORAGE_KEY,
    TOKEN_LOCAL_STORAGE_KEY
} from '../consts/localStorage';

export const api = axios.create({
    baseURL: __BASE_URL__,
    headers: {
        'Content-type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (config) => config,

    async (error) => {
        const originalRequest = error.config;

        const isStatusUnauthorized = error.response.status === 401;
        const isSameRequest = originalRequest;
        const isRetry = error.config._isRetry;

        if (isStatusUnauthorized && isSameRequest && !isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await api.post(
                    '/auth/refresh',
                    {},
                    { withCredentials: true }
                );
                const { token } = response.data;
                localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);

                return api.request(originalRequest);
            } catch (e) {
                console.error('Refresh token error: ', e);
            }
        } else {
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
            localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
        }
        throw error;
    }
);
