// src\app\(seeker)\layout.tsx
"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface SeekerLayoutProps {
    children: ReactNode;
}

const navLinks = [
    { name: "Dashboard", href: "/seeker/dashboard" },
    { name: "Profile", href: "/seeker/profile" },
    { name: "Jobs", href: "/jobs" }, // Add other links if needed
];

export default function SeekerLayout({ children }: SeekerLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col transition-all duration-300">
                {/* Logo */}
                <div className="h-16 flex items-center justify-center border-b border-gray-200">
                    <Image src="/assets/logo.svg" alt="Logo" width={50} height={35} />
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-6 space-y-3">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${isActive ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm" : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Optional Sidebar Footer */}
                <div className="p-6 border-t border-gray-200 text-gray-400 text-sm">
                    CyKruit Seeker Dashboard
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
                    <h1 className="text-lg font-semibold text-gray-700 hidden sm:block">
                        {pathname.includes("dashboard")
                            ? "Dashboard"
                            : pathname.includes("profile")
                                ? "Profile"
                                : "Welcome"}
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            🔔
                        </button>

                        {/* User Info */}
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/avatar.png"
                                alt="User Avatar"
                                width={36}
                                height={36}
                                className="rounded-full border border-gray-200"
                            />
                            <span className="font-medium text-gray-700">John Doe</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 bg-gray-50">{children}</main>

                {/* Footer */}
                <footer className="h-14 bg-white shadow-inner flex items-center justify-center text-sm text-gray-500 border-t border-gray-200">
                    © 2025 CyKruit. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
