"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutApi } from "@/features/auth/auth.service";
import { persistor } from "@/store";
import { clearAuth } from "@/store/slices/auth.slice";

export function useLogout() {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const { user } = useAppSelector((state) => state.auth);

    const hardLogout = async () => {
        dispatch(clearAuth());          // clear redux
        queryClient.clear();            // clear React Query cache
        await persistor.purge();        // purge persisted storage
    };

    const logoutMutation = useMutation({
        mutationFn: async () => {
            if (!user) return;
            return await logoutApi(user.id); // optional server call
        },
        onSuccess: () => {
            hardLogout();
        },
        onError: () => {
            hardLogout();
        },
    });

    return logoutMutation;
}
