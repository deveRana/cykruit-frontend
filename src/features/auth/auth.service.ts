import client from "@/lib/api/client";

// Input types
export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "SEEKER" | "EMPLOYER";
}

// Auth API response type
export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
        isVerified: boolean;
    };
    accessToken: string;
    expiresIn?: number;
    redirectUrl?: string;
}

// 🔹 Login
export const loginApi = async (data: LoginInput): Promise<AuthResponse> => {
    const res = await client.post("/auth/login", data);
    return res.data.data; // backend wraps login data in `data`
};

// 🔹 Register
export const registerApi = async (data: RegisterInput): Promise<AuthResponse> => {
    const res = await client.post("/users/register", data);
    return res.data.data; // normalize like login
};

// 🔹 Get current user
export const getMeApi = async (): Promise<AuthResponse["user"]> => {
    const res = await client.get("/auth/me");
    return res.data.data; // normalize backend response
};

// 🔹 Verify email
export const verifyEmailApi = async (token: string): Promise<{ message: string; redirectUrl: string }> => {
    const res = await client.post("/auth/verify-email", { token });
    return res.data;
};

// 🔹 Logout
export const logoutApi = async (userId: string): Promise<{ message: string }> => {
    // Authorization header automatically added via Axios interceptor
    const res = await client.post(`/auth/logout?userId=${userId}`);
    return res.data;
};

// 🔹 Refresh token
export const refreshApi = async (): Promise<AuthResponse> => {
    const res = await client.post("/auth/refresh", {}, { withCredentials: true });
    return res.data.data; // normalize
};

// 🔹 Resend verification email
export const resendVerificationEmailApi = async (): Promise<{ message: string }> => {
    const res = await client.post("/auth/resend-verification");
    return res.data;
};