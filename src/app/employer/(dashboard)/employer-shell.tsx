"use client";

import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/employer/layout/sidebar";

interface EmployerShellProps {
    children: ReactNode;
}

export default function EmployerShell({ children }: EmployerShellProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            <Sidebar
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />

            <div
                className={`bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
