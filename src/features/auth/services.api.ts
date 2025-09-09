import client from "@/lib/api/client";

// Input types
export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    fullName: string;
    role: "SEEKER" | "EMPLOYER";
}

// Auth APIs
export const loginApi = async (data: LoginInput) => {
    const res = await client.post("/auth/login", data);
    return res.data.data; // instead of res.data
};

export const registerApi = async (data: RegisterInput) => {
    const res = await client.post("/users/register", data);
    return res.data;
};

export const getMeApi = async () => {
    const res = await client.get("/auth/me");
    return res.data;
};

export const verifyEmailApi = async (token: string) => {
    const res = await client.post("/auth/verify-email", { token });
    return res.data;
};
