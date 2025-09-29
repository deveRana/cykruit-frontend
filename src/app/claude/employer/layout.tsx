"use client";

import React, { useState } from "react";
import Sidebar from "@/components/employer/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
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
