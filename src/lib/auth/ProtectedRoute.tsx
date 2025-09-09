"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/micro-interactions/loaders/Loader";

interface ProtectedRouteProps {
    children: ReactNode;
    roles?: ("SEEKER" | "EMPLOYER")[]; // optional: restrict to certain roles
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const router = useRouter();
    const { user, isMeLoading } = useAuth();
    console.log(user);

    useEffect(() => {
        if (!isMeLoading) {
            if (!user) {
                // Not logged in, redirect to login
                router.replace("/login?role=seeker");
            } else if (roles && !roles.includes(user.role)) {
                // Logged in but role not allowed, redirect to dashboard
                router.replace(`/${user.role.toLowerCase()}/dashboard`);
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
