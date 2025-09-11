"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/common/Loader";
import { User } from "@/store/slices/auth.slice";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: User["role"][]; // strictly "SEEKER" | "EMPLOYER"
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isMeLoading } = useAuth();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!isMeLoading) {
            if (!user) {
                // Redirect based on role query or default to seeker
                router.replace("/login?role=seeker");
            } else {
                // ✅ Ensure user.role is strictly "SEEKER" | "EMPLOYER"
                const role: User["role"] =
                    user.role === "SEEKER" ? "SEEKER" : "EMPLOYER";

                if (roles && !roles.includes(role)) {
                    // Redirect to default dashboard if role mismatch
                    router.replace(role === "EMPLOYER" ? "/employer/dashboard" : "/dashboard");
                } else {
                    setChecking(false); // safe to render children
                }
            }
        }
    }, [user, isMeLoading, roles, router]);

    if (isMeLoading || checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;
}
