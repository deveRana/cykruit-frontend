"use client";

import Loader from "@/components/common/loader";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

const LoginComponent = dynamic(() => import("./LoginComponent"), {
    ssr: false,
    loading: () => <Loader />,
});

export default function LoginPage() {
    const router = useRouter();
    const { user, isMeLoading } = useAuth();
    const [fadeOut, setFadeOut] = useState(false);

    // Smooth redirect if session exists
    useEffect(() => {
        if (!isMeLoading && user) {
            setFadeOut(true); // fade out UI
            const redirectUrl = user.role === "EMPLOYER" ? "/employer/dashboard" : "/dashboard";
            const timeout = setTimeout(() => {
                router.replace(redirectUrl);
            }, 300); // 300ms fade transition

            return () => clearTimeout(timeout);
        }
    }, [user, isMeLoading, router]);

    return (
        <div className={`min-h-screen relative transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            <LoginComponent />
        </div>
    );
}
