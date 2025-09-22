"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const user = useAppSelector((state) => state.auth.user);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

    return (
        <nav className="w-full bg-background text-foreground transition-colors duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 flex items-center justify-between h-20">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-300"
                >
                    Cykruit
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-base font-medium">
                    <Link href="/about" className="hover:text-primary transition-colors duration-300">
                        About
                    </Link>
                    <Link href="/jobs" className="hover:text-primary transition-colors duration-300">
                        Jobs
                    </Link>
                    <Link href="/employer" className="hover:text-primary transition-colors duration-300">
                        Employers
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition-colors duration-300">
                        Contact Us
                    </Link>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-full shadow-md transition-all duration-300"
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
                                    {user.fullName?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                        </Link>
                    ) : (
                        <div className="hidden md:flex gap-2">
                            <Link
                                href="/login?role=seeker"
                                className="px-4 py-2 bg-[#0062FF] text-white hover:bg-accent hover:text-accent-foreground font-semibold rounded-lg shadow-md transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register?role=seeker"
                                className="px-4 py-2 bg-[#0062FF] text-white hover:bg-accent hover:text-accent-foreground font-semibold rounded-lg shadow-md transition-all duration-300"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
                        onClick={toggleMobileMenu}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-background w-full px-4 pb-4 space-y-2">
                    <Link
                        href="/about"
                        className="block w-full text-left py-2 hover:text-primary transition-colors duration-200"
                        onClick={() => setMobileOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/jobs"
                        className="block w-full text-left py-2 hover:text-primary transition-colors duration-200"
                        onClick={() => setMobileOpen(false)}
                    >
                        Jobs
                    </Link>
                    <Link
                        href="/employer"
                        className="block w-full text-left py-2 hover:text-primary transition-colors duration-200"
                        onClick={() => setMobileOpen(false)}
                    >
                        Employers
                    </Link>
                    <Link
                        href="/contact"
                        className="block w-full text-left py-2 hover:text-primary transition-colors duration-200"
                        onClick={() => setMobileOpen(false)}
                    >
                        Contact Us
                    </Link>

                    {!user && (
                        <div className="flex flex-col gap-2 mt-2">
                            <Link
                                href="/login?role=seeker"
                                className="w-full text-center px-4 py-2 bg-[#0062FF] text-white rounded-lg shadow-md hover:bg-accent transition-all duration-300"
                                onClick={() => setMobileOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register?role=seeker"
                                className="w-full text-center px-4 py-2 bg-[#0062FF] text-white rounded-lg shadow-md hover:bg-accent transition-all duration-300"
                                onClick={() => setMobileOpen(false)}
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
