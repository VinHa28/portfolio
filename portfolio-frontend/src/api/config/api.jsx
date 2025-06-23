import axios from "axios";
import { url } from "../services/url";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer <token>` // handle by interceptor
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (
//             error.response &&
//             error.response.status === 401 &&
//             !originalRequest?._retry &&
//             !originalRequest?.url.includes('/auth/login') &&
//             !originalRequest?.url.includes('/auth/refresh-token')
//         ) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = localStorage.getItem("refreshToken");
//                 if (!refreshToken) throw new Error("No refresh token");

//                 const res = await axios.post(
//                     `${import.meta.env.VITE_API_URL}${url.refreshToken}`,
//                     { refreshToken }
//                 );
//                 const { accessToken: newAccessToken } = res.data;
//                 localStorage.setItem("accessToken", newAccessToken);

//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 console.log("Refresh token failed: ", refreshError);
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("refreshToken");
//                 navigateToLogin();
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest?._retry &&
            !originalRequest?.url.includes("/auth/login") &&
            !originalRequest?.url.includes("/auth/refresh-token")
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                console.log("Found refreshToken:", refreshToken);

                if (!refreshToken) throw new Error("No refresh token");

                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}${url.refreshToken}`,
                    { refreshToken }
                );
                const { accessToken: newAccessToken } = res.data;
                localStorage.setItem("accessToken", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.log("Refresh token failed:", refreshError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
