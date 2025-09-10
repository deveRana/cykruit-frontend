"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/micro-interactions/loaders/Loader";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: ("SEEKER" | "EMPLOYER")[]; // optional: restrict to certain roles
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isMeLoading } = useAuth();

    useEffect(() => {
        if (!isMeLoading) {
            if (!user) {
                // Not logged in → go to login
                router.replace("/login?role=seeker");
            } else if (roles && !roles.includes(user.role)) {
                // Logged in but wrong role → redirect accordingly
                if (user.role === "EMPLOYER") {
                    router.replace("/employer/dashboard");
                } else if (user.role === "SEEKER") {
                    router.replace("/dashboard");
                }
            }
        }
    }, [user, isMeLoading, roles, router]);

    if (isMeLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;
}
