"use client";

import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import React, { ReactNode } from "react";

export default function EmployerVerificationLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedRoute roles={["EMPLOYER"]}>
            <div >
                {children}
            </div>
        </ProtectedRoute>
    );
}
