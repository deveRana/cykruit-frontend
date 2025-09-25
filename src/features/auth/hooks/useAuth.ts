"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();

    const roleFromCookie = Cookies.get("role");
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const { data: me, isLoading: isMeLoading, refetch: refetchMe, isError } = useQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
        enabled: !!token && !isLoggingOut,
        staleTime: 5 * 60 * 1000,
    });

    // Update Redux user whenever `me` changes
    useEffect(() => {
        if (me && !isLoggingOut) dispatch(setAuth({ user: me as User, token }));
    }, [me, token, dispatch, isLoggingOut]);

    // Clear auth on query error
    useEffect(() => {
        if (isError && !isLoggingOut) dispatch(clearAuth());
    }, [isError, dispatch, isLoggingOut]);

    const login = useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            const role: "SEEKER" | "EMPLOYER" =
                data.user.role === "SEEKER" ? "SEEKER" : "EMPLOYER";

            const userObj: User = { ...data.user, role };

            dispatch(setAuth({ user: userObj, token: data.accessToken }));
            broadcastLogin(data.user.id); // notify other tabs
        },
        onError: (errors: BackendError[]) => errors,
    });

    const register = useMutation({
        mutationFn: registerApi,
        onSuccess: () => { },
        onError: (errors: BackendError[]) => errors,
    });

    const logout = useLogout(setIsLoggingOut); // pass setter

    const verifyEmail = useMutation({
        mutationFn: verifyEmailApi,
        onError: (errors: BackendError[]) => errors,
    });

    const resendVerificationEmail = useMutation({
        mutationFn: resendVerificationEmailApi,
        onError: (errors: BackendError[]) => errors,
    });

    return {
        user,
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
