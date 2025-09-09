"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setAuth, clearAuth } from "@/store/slices/auth.slice";
import { loginApi, registerApi, getMeApi, verifyEmailApi, logoutApi } from "@/features/auth/services.api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { BackendError } from "@/lib/models/backend-error.model";

export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    // 🔹 Fetch current user if token exists
    const { data: me, isLoading: isMeLoading, isError, refetch: refetchMe } = useQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
        enabled: !!token,
    });

    // ✅ Sync fetched user to Redux
    useEffect(() => {
        if (me) dispatch(setAuth({ user: me, token }));
    }, [me, token, dispatch]);

    // 🔹 Clear auth if fetch fails
    useEffect(() => {
        if (isError) dispatch(clearAuth());
    }, [isError, dispatch]);

    // 🔹 Login mutation
    const login = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            dispatch(setAuth({ user: data.user, token: data.accessToken }));
        },
        onError: (errors: BackendError[]) => errors,
    });

    // 🔹 Register mutation
    const register = useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            dispatch(setAuth({ user: data.user, token: data.accessToken }));
        },
        onError: (errors: BackendError[]) => errors,
    });

    // 🔹 Logout mutation
    const logout = useMutation({
        mutationFn: async () => {
            if (!user) return;
            return await logoutApi(user.id);
        },
        onSuccess: () => dispatch(clearAuth()),
        onError: () => dispatch(clearAuth()), // clear anyway if API fails
    });

    // 🔹 Verify email mutation
    const verifyEmail = useMutation({
        mutationFn: verifyEmailApi,
        onError: (errors: BackendError[]) => errors,
    });

    return {
        user: me || user,
        token,
        isMeLoading,
        login,
        register,
        logout,
        refetchMe,
        verifyEmail,
    };
}
