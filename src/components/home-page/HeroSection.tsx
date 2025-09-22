"use client";

import SearchBox from "@/components/home-page/SearchBox";
import Navbar from "@/components/layout/Navbar";

export default function HeroSection() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 text-foreground">
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/70" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                {/* Hero Section */}
                <div className="max-w-3xl text-center space-y-4 sm:space-y-6 px-2 sm:px-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug sm:leading-tight md:leading-tight">
                        The Smartest Way to{" "}
                        <span className="text-[#25324B] font-bold">Hire & Get Hired</span>{" "}
                        in <span className="text-[#0142D3] font-bold">Cybersecurity</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-[#414141] font-light">
                        CyberJobs connects top cybersecurity professionals with vetted
                        companies. Trusted by startups, enterprises, and government
                        recruiters.
                    </p>
                </div>

                {/* Search Box Component */}
                <div className="mt-6 w-full max-w-3xl px-2 sm:px-0">
                    <SearchBox />
                </div>
            </div>
        </div>
    );
}
