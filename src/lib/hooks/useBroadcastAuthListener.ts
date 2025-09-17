"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth, setAuth, User } from "@/store/slices/auth.slice";
import { authChannel } from "@/lib/utils/broadcastAuth";

export function useBroadcastAuthListener() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleAuthMessage = (msg: MessageEvent) => {
            const data = msg.data;
            if (data.type === "logout") {
                dispatch(clearAuth());
                window.location.href = "/"; // optional redirect
            } else if (data.type === "login") {
                window.location.href = "/";
            }
        };

        authChannel.addEventListener("message", handleAuthMessage);
        return () => authChannel.removeEventListener("message", handleAuthMessage);
    }, [dispatch]);
}
