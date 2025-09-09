import Link from "next/link";
import React from "react";

export default function Navbar() {
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
                <Link
                    href="/jobs"
                    className="hover:text-primary transition-colors duration-300"
                >
                    Jobs
                </Link>
                <Link
                    href="/employer"
                    className="hover:text-primary transition-colors duration-300"
                >
                    Employers
                </Link>
                <Link
                    href="/about"
                    className="hover:text-primary transition-colors duration-300"
                >
                    About
                </Link>
            </div>

            {/* Right Button */}
            <div>
                <Link
                    href="/login"
                    className="ml-6 px-5 py-2 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-semibold rounded-lg shadow-md transition-all duration-300"
                >
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
