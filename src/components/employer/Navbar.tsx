"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

interface Props {
    toggleSidebar?: () => void;
}

export default function EmployerNavbar({ toggleSidebar }: Props) {
    const pathname = usePathname();
    const user = useAppSelector((state) => state.auth.user);

    const getTitle = () => {
        if (pathname.includes("dashboard")) return "Dashboard";
        if (pathname.includes("jobs")) return "Jobs";
        if (pathname.includes("applicants")) return "Applicants";
        if (pathname.includes("analytics")) return "Analytics";
        if (pathname.includes("settings")) return "Settings";
        return "Welcome";
    };

    return (
        <header className="h-16 bg-[#F1F5F9] shadow-md flex items-center justify-between px-6 sm:px-12 rounded-tr-2xl rounded-br-2xl">
            {/* Left: Toggle + Title */}
            <div className="flex items-center gap-4">
                {toggleSidebar && (
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-gray-200 transition-all duration-200"
                    >
                        <Menu className="w-5 h-5 text-gray-700" />
                    </button>
                )}
                <h1 className="text-xl font-semibold text-gray-800 tracking-wide hidden sm:block">
                    {getTitle()}
                </h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 sm:gap-6">
                <button className="relative p-2 rounded-full hover:bg-gray-200 transition-all duration-200 shadow-sm">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-[#F1F5F9]"></span>
                </button>

                {user ? (
                    <Link
                        href="/employer/dashboard"
                        className="flex items-center gap-2 sm:gap-3 px-2 py-1 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-full shadow-md transition-all duration-300"
                    >
                        {user.profilePicture ? (
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={user.profilePicture}
                                    alt="Avatar"
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ) : (
                            <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                                {user.fullName?.charAt(0).toUpperCase() || "E"}
                            </div>
                        )}
                        <span className="hidden sm:inline-block truncate max-w-[120px]">
                            {user.fullName.split(' ')[0]}
                        </span>
                    </Link>
                ) : (
                    <Link
                        href="/login?role=employer"
                        className="ml-2 sm:ml-6 px-4 py-2 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-lg shadow-md transition-all duration-300"
                    >
                        Get Started
                    </Link>
                )}
            </div>
        </header>
    );
}
