"use client";

import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutApi } from "@/features/auth/services.api";
import { persistor } from "@/store";
import { clearAuth } from "@/store/slices/auth.slice";

export function useLogout() {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    const hardLogout = async () => {
        // 1. Stop redux-persist from rehydrating
        persistor.pause();

        // 2. Clear redux state instantly
        dispatch(clearAuth());

        // 3. Purge storage completely
        await persistor.purge();

        // 4. Resume persistor (now with empty state)
        persistor.persist();
    };

    const logoutMutation = useMutation({
        mutationFn: async () => {
            if (!user) return;
            return await logoutApi(user.id);
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
