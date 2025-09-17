// lib/hooks/useBroadcastLogoutListener.ts
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/slices/auth.slice";
import { logoutChannel } from "@/lib/utils/broadcastLogout";

export function useBroadcastLogoutListener() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleLogout = (msg: MessageEvent) => {
            if (msg.data === "logout") {
                dispatch(clearAuth());
                window.location.href = "/"; // optional: redirect to home/login
            }
        };

        logoutChannel.addEventListener("message", handleLogout);

        return () => logoutChannel.removeEventListener("message", handleLogout);
    }, [dispatch]);
}
