"use client";

import React, { ReactNode } from "react";
import ProtectedRoute from "@/lib/auth/ProtectedRoute";
import SeekerSidebar from "@/components/seeker/Sidebar";
import SeekerNavbar from "@/components/seeker/Navbar";

interface SeekerLayoutProps {
    children: ReactNode;
}

export default function SeekerLayout({ children }: SeekerLayoutProps) {
    return (
        <ProtectedRoute roles={["SEEKER"]}>
            <div className="flex h-screen bg-gray-50 text-gray-800">
                {/* Sidebar - fixed width */}
                <div className="w-64 h-full">
                    <SeekerSidebar />
                </div>

                {/* Main content wrapper */}
                <div className="flex-1 flex flex-col h-full">
                    {/* Navbar */}
                    <div className="h-16 flex-shrink-0">
                        <SeekerNavbar />
                    </div>

                    {/* Page Content - scrollable */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                        {children}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
