"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clearAuth, setAuth, User } from "@/store/slices/auth.slice";
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
import Cookies from "js-cookie";
import { broadcastLogin } from "@/lib/utils/broadcastAuth";

export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    // Instant role from cookie (avoids flash)
    const roleFromCookie = Cookies.get("role");

    // Fetch me from server only if token exists
    const { data: me, isLoading: isMeLoading, isError, refetch: refetchMe } = useQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
        enabled: !!token,
    });

    // Update Redux user whenever `me` changes
    useEffect(() => {
        if (me) dispatch(setAuth({ user: me as User, token }));
    }, [me, token, dispatch]);

    // Clear auth on query error
    useEffect(() => {
        if (isError) dispatch(clearAuth());
    }, [isError, dispatch]);

    // ❌ Removed logoutChannel listener from here
    // RootLayoutInner handles cross-tab logout via useBroadcastLogoutListener

    const login = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            const role: "SEEKER" | "EMPLOYER" =
                data.user.role === "SEEKER" ? "SEEKER" : "EMPLOYER";

            const userObj: User = { ...data.user, role };

            dispatch(setAuth({ user: userObj, token: data.accessToken }));

            // 🔹 Broadcast login to other tabs
            broadcastLogin(data.user.id);
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
        user,                      // ✅ always from Redux
        token,
        role: roleFromCookie || user?.role,
        isMeLoading,
        login,
        register,
        logout,
        refetchMe,
        verifyEmail,
        resendVerificationEmail,
    };
}
