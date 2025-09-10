"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/micro-interactions/loaders/Loader";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: ("SEEKER" | "EMPLOYER")[];
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
            } else if (roles && !roles.includes(user.role)) {
                // Redirect to default dashboard if role mismatch
                router.replace(
                    user.role === "EMPLOYER" ? "/employer/dashboard" : "/seeker/dashboard"
                );
            } else {
                setChecking(false); // ✅ safe to render children
            }
        }
    }, [user, isMeLoading, roles, router]);

    // ✅ Lazy loader: wait until auth state resolves
    if (isMeLoading || checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;
}
