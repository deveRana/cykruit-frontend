"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clearAuth, setAuth } from "@/store/slices/auth.slice";
import {
    loginApi,
    registerApi,
    getMeApi,
    verifyEmailApi,
    resendVerificationEmailApi,
} from "@/features/auth/auth.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { BackendError } from "@/lib/models/backend-error.model";
import { useLogout } from "./useLogout";
import Cookies from "js-cookie"; // ✅ import js-cookie

export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    // 🔹 Instant role from cookie (avoids flash)
    const roleFromCookie = Cookies.get("role");

    const { data: me, isLoading: isMeLoading, isError, refetch: refetchMe } = useQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
        enabled: !!token,
    });

    useEffect(() => {
        if (me) dispatch(setAuth({ user: me, token }));
    }, [me, token, dispatch]);

    useEffect(() => {
        if (isError) dispatch(clearAuth());
    }, [isError, dispatch]);

    const login = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            dispatch(setAuth({ user: data.user, token: data.accessToken }));
        },
        onError: (errors: BackendError[]) => errors,
    });

    const register = useMutation({
        mutationFn: registerApi,
        onSuccess: () => { },
        onError: (errors: BackendError[]) => errors,
    });

    const logout = useLogout();

    const verifyEmail = useMutation({
        mutationFn: verifyEmailApi,
        onError: (errors: BackendError[]) => errors,
    });

    const resendVerificationEmail = useMutation({
        mutationFn: resendVerificationEmailApi,
        onError: (errors: BackendError[]) => errors,
    });

    return {
        user: me || user,
        token,
        role: roleFromCookie || me?.role || user?.role, // ✅ instant role
        isMeLoading,
        login,
        register,
        logout,
        refetchMe,
        verifyEmail,
        resendVerificationEmail,
    };
}
