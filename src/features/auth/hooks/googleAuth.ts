"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/slices/auth.slice";
import Cookies from "js-cookie";
import { broadcastLogin } from "@/lib/utils/broadcastAuth"; // import broadcast

export function useGoogleAuth() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const startGoogleLogin = () => {
        const width = 500;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            "_blank",
            `width=${width},height=${height},top=${top},left=${left}`
        );

        if (!popup) return;

        const listener = (event: MessageEvent) => {
            const backendOrigin = process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:5000";
            if (event.origin !== backendOrigin) return;

            const data = event.data;
            if (data?.accessToken && data?.user) {
                // ✅ Set Redux and cookie
                dispatch(setAuth({ user: data.user, token: data.accessToken }));
                Cookies.set("role", data.user.role);

                // 🔹 Broadcast login to other tabs
                broadcastLogin(data.user.id);

                // ✅ Redirect based on role
                router.replace(data.user.role === "EMPLOYER" ? "/employer/dashboard" : "/dashboard");

                popup.close();
                window.removeEventListener("message", listener);
            }
        };

        window.addEventListener("message", listener);
    };

    return { startGoogleLogin };
}
