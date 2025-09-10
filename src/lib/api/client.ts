import axios, { AxiosError } from "axios";
import { store } from "@/store";
import { normalizeBackendError } from "../utils/handleBackendError";
import { BackendError } from "../models/backend-error.model";
import { refreshApi } from "@/features/auth/auth.service";
import { clearAuth, setAuth } from "@/store/slices/auth.slice";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    withCredentials: true,
});

// 🔹 Add token from Redux state
client.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

// 🔹 Response interceptor
client.interceptors.response.use(
    (response) => response, // ✅ success
    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        // ✅ Skip refresh for login/register endpoints
        const isAuthRequest =
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/users/register");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = "Bearer " + token;
                        return client(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const data = await refreshApi();
                store.dispatch(setAuth({ user: data.user, token: data.accessToken }));
                processQueue(null, data.accessToken);

                originalRequest.headers.Authorization = "Bearer " + data.accessToken;
                return client(originalRequest);
            } catch (err) {
                processQueue(err, null);
                store.dispatch(clearAuth());
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        // fallback: normalize error
        const normalizedErrors: BackendError[] = normalizeBackendError(error);
        return Promise.reject(normalizedErrors);
    }
);

export default client;
