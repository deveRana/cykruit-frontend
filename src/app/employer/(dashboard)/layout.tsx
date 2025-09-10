// src/app/employer/EmployerLayout.tsx
"use client";

import dynamic from "next/dynamic";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";
import Loader from "@/components/common/Loader";

// Lazy load the layout content
const EmployerLayoutContent = dynamic(
    () => import("../../../components/employer/EmployerLayoutContent"),
    { loading: () => <Loader /> }
);

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute roles={["EMPLOYER"]}>
            <EmployerOnboardingGuard>
                <EmployerLayoutContent>{children}</EmployerLayoutContent>
            </EmployerOnboardingGuard>
        </ProtectedRoute>
    );
}
