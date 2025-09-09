import React from "react";

export default function Footer() {
    return (
        <footer className="w-full h-20 flex flex-col sm:flex-row items-center justify-between px-8 py-4 shadow-inner mt-auto bg-background text-muted-foreground transition-colors duration-300">
            {/* Left / copyright */}
            <div className="text-sm sm:text-base">
                &copy; {new Date().getFullYear()} Cykruit. All rights reserved.
            </div>

            {/* Right / links */}
            <div className="flex gap-6 mt-2 sm:mt-0">
                <a
                    href="/privacy"
                    className="hover:text-primary transition-colors duration-300"
                >
                    Privacy Policy
                </a>
                <a
                    href="/terms"
                    className="hover:text-primary transition-colors duration-300"
                >
                    Terms of Service
                </a>
            </div>
        </footer>
    );
}
