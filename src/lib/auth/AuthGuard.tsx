"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface AuthGuardProps {
    children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { user, isMeLoading } = useAuth();

    useEffect(() => {
        if (!isMeLoading && user) {
            if (user.role === "SEEKER") {
                router.replace(`/dashboard`);
            } else if (user.role === "EMPLOYER") {
                router.replace(`/employer/dashboard`);
            }
        }
    }, [user, isMeLoading, router]);

    if (isMeLoading) {
        return null; // or <Loader fullScreen /> if you want
    }

    return <>{children}</>;
}
