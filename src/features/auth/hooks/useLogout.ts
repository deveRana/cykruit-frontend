"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutApi } from "@/features/auth/auth.service";
import { persistor } from "@/store";
import { clearAuth } from "@/store/slices/auth.slice";
import { broadcastLogout } from "@/lib/utils/broadcastAuth";
import Cookies from "js-cookie";

export function useLogout(setIsLoggingOut?: (v: boolean) => void) {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { user } = useAppSelector((state) => state.auth);

    const hardLogout = async () => {
        try {
            if (setIsLoggingOut) setIsLoggingOut(true);

            queryClient.cancelQueries();       // stop ongoing queries
            dispatch(clearAuth());             // clear Redux
            Cookies.remove("role");            // clear cookie
            queryClient.clear();               // clear cache
            await persistor.purge();           // clear persisted storage
            broadcastLogout();                 // notify other tabs
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            if (setIsLoggingOut) setIsLoggingOut(false);
        }
    };

    const logoutMutation = useMutation({
        mutationFn: async () => {
            if (!user) return;
            return await logoutApi(user.id);
        },
        onSuccess: () => hardLogout(),
        onError: () => hardLogout(),
    });

    return logoutMutation;
}
