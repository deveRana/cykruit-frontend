import axios, { AxiosError } from "axios";
import { store } from "@/store";
import { normalizeBackendError } from "../utils/handleBackendError";
import { BackendError } from "../models/backend-error.model";

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

// 🔹 Response interceptor to normalize all backend errors
client.interceptors.response.use(
    (response) => response, // pass through successful responses
    (error: AxiosError) => {
        const normalizedErrors: BackendError[] = normalizeBackendError(error);
        // reject with normalized errors
        return Promise.reject(normalizedErrors);
    }
);

export default client;
