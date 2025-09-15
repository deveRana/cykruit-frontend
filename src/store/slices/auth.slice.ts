import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the shape of a User returned by backend
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: "SEEKER" | "EMPLOYER"; // strictly these two
    isVerified?: boolean;
    profilePicture?: string; // 🔹 optional field for avatar
}

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{ user: User; token: string | null }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
