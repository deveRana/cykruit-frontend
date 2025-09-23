"use client";

import Link from "next/link";

export default function CTA() {
    return (
        <section className="w-full bg-[#0062FF] py-20 relative overflow-hidden clip-top-left-bottom-right">
            <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Take Your Cybersecurity Career to the Next Level
                </h2>
                <p className="text-white text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                    Join thousands of cybersecurity professionals finding the right roles, improving skills, and growing their careers with CyberJobs.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link
                        href="/login?role=seeker"
                        className="w-full sm:w-auto relative px-8 py-3 bg-white text-[#0062FF] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md text-center"
                    >
                        Sign Up Free
                    </Link>
                    <Link
                        href="/jobs"
                        className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0062FF] transition-colors duration-200 shadow-md text-center"
                    >
                        Explore Listings
                    </Link>
                </div>
            </div>
        </section>
    );
}
