"use client";

import { useMessageModal } from "@/components/common/MessageModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Shield, User, LogOut, Bell } from "lucide-react";
import React from "react";

const KYCNavbar = () => {
    const { logout } = useAuth();

    const messageModal = useMessageModal();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
            },
            onError: () => {
                messageModal.showMessage({ type: "error", title: "Failed to logout. Try again." })
            },
        });
    };
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <a href="/" target="_blank" >
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Cykruit
                                </h1>
                                <p className="text-xs text-gray-500">Employer Portal</p>
                            </div>
                        </div>
                    </a>

                    <div className="flex items-center space-x-4">
                        <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default KYCNavbar;