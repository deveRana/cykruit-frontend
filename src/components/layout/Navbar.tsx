"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Image from "next/image";

export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="w-full h-16 flex items-center justify-between px-8 sm:px-24 shadow-md bg-background text-foreground transition-colors duration-300">
            {/* Logo */}
            <Link
                href="/"
                className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-300"
            >
                Cykruit
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-8 text-base font-medium">
                <Link href="/jobs" className="hover:text-primary transition-colors duration-300">
                    Jobs
                </Link>
                <Link href="/employer" className="hover:text-primary transition-colors duration-300">
                    Employers
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors duration-300">
                    About
                </Link>
            </div>

            {/* Right Button / Profile */}
            <div>
                {user ? (
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 ml-6 px-2 py-1 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-full shadow-md transition-all duration-300"
                    >
                        {/* Profile picture or first letter */}
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
                                {user.fullName?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </Link>
                ) : (
                    <Link
                        href="/login?role=seeker"
                        className="ml-6 px-5 py-2 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-lg shadow-md transition-all duration-300"
                    >
                        Get Started
                    </Link>
                )}
            </div>

        </nav>
    );
}
