"use client";

import React, { ReactNode, useState } from "react";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import EmployerSidebar from "@/components/employer/Sidebar";
import EmployerNavbar from "@/components/employer/Navbar";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";

interface EmployerLayoutProps {
    children: ReactNode;
}

export default function EmployerLayout({ children }: EmployerLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <ProtectedRoute roles={["EMPLOYER"]}>
            <EmployerOnboardingGuard>

                <div className="flex h-screen bg-gray-50 text-gray-800">
                    {/* Sidebar */}
                    <div className={` transition-all duration-300 h-full`}>
                        <EmployerSidebar collapsed={isSidebarCollapsed} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 flex flex-col h-full">
                        {/* Navbar */}
                        <div className="h-16 flex-shrink-0">
                            <EmployerNavbar toggleSidebar={toggleSidebar} />
                        </div>

                        {/* Page content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                            {children}
                        </div>
                    </div>
                </div>
            </EmployerOnboardingGuard>

        </ProtectedRoute>
    );
}
