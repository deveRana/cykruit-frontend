"use client";

import dynamic from "next/dynamic";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import Loader from "@/components/micro-interactions/loaders/Loader";

// Lazy load the dashboard content
const DashboardContent = dynamic(
    () => import("./EmployerDashboardContent"), // move the main content to a separate file
    { loading: () => <Loader /> }
);

export default function EmployerDashboardPage() {
    return (
        <ProtectedRoute roles={["EMPLOYER"]}>
            <DashboardContent />
        </ProtectedRoute>
    );
}
