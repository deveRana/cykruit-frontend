import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "@/store";
import { normalizeBackendError } from "../utils/handleBackendError";
import { BackendError } from "../models/backend-error.model";
import { refreshApi } from "@/features/auth/auth.service";
import { clearAuth, setAuth, User } from "@/store/slices/auth.slice";

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
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

// ----------------- 🔹 Refresh Token Handling -----------------

interface FailedRequest {
    resolve: (token?: string | null) => void;
    reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

// 🔹 Response interceptor
client.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
        if (!originalRequest) {
            return Promise.reject(error);
        }

        const isAuthRequest =
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/users/register");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    if (token && originalRequest.headers) {
                        originalRequest.headers.Authorization = "Bearer " + token;
                    }
                    return client(originalRequest);
                }).catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const data = await refreshApi();

                const role: "SEEKER" | "EMPLOYER" = data.user.role === "SEEKER" ? "SEEKER" : "EMPLOYER";

                const user: User = {
                    ...data.user,
                    role,
                };

                store.dispatch(setAuth({ user, token: data.accessToken }));
                processQueue(null, data.accessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = "Bearer " + data.accessToken;
                }

                return client(originalRequest);
            } catch (err) {
                processQueue(err, null);
                store.dispatch(clearAuth());
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        const normalizedErrors: BackendError[] = normalizeBackendError(error);
        return Promise.reject(normalizedErrors);
    }
);

export default client;
