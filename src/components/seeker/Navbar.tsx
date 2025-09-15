"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function SeekerNavbar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const getTitle = () => {
        if (pathname.includes("dashboard")) return "Dashboard";
        if (pathname.includes("profile")) return "Profile";
        if (pathname.includes("saved-jobs")) return "Saved Jobs";
        if (pathname.includes("applications")) return "Applications";
        if (pathname.includes("settings")) return "Settings";
        return "Welcome";
    };

    return (
        <header className="h-16 bg-[#F1F5F9] shadow-md flex items-center justify-between px-6 rounded-tr-2xl rounded-br-2xl">
            {/* Page Title */}
            <h1 className="text-xl font-semibold text-gray-800 tracking-wide hidden sm:block">
                {getTitle()}
            </h1>

            {/* Right Side */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-gray-200 transition-all duration-200 shadow-sm">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#F1F5F9]"></span>
                </button>

                {/* User Avatar & Name */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Image
                            src={user?.profilePicture || "/assets/avatar.png"}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full border-2 border-white shadow-md ring-2 ring-indigo-500/40 object-cover"
                        />
                    </div>
                    <span className="font-medium text-gray-800">
                        {user?.fullName || "Guest"}
                    </span>
                </div>
            </div>
        </header>
    );
}
