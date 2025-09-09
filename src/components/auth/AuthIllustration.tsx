"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface AuthIllustrationProps {
    className?: string;
    urlPath?: "/login" | "/signup"; // optional, defaults to /login
}

interface IllustrationData {
    image: string;
    title: string;
    description: string;
}

export default function AuthIllustration({ className, urlPath = "/login" }: AuthIllustrationProps) {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "seeker"; // default role
    const key = `${role}-${urlPath}`; // unique key for mapping

    // Map each combination of role + URL path to image and description
    const illustrationMap: Record<string, IllustrationData> = {
        "seeker-/login": {
            image: "/assets/auth/seeker-login-bg.svg",
            title: "Secure Access to Your CyberJobs Account",
            description:
                "Log in safely to access personalized job recommendations,manage your applications, and connect with top cybersecurity employers.",
        },
        "seeker-/signup": {
            image: "/assets/auth/seeker-signup-bg.svg",
            title: "The Smartest Way to Hire & Get Hired in Cybersecurity",
            description:
                "Sign up to create your profile,explore the latest cybersecurity job opportunities, <br />and get discovered by leading employers in the industry.",
        },
        "employer-/login": {
            image: "/assets/auth/employer-login-bg.svg",
            title: "Access Your Employer Dashboard Securely",
            description:
                "Log in to manage job postings,track applications efficiently, and <br /> engage with top cybersecurity talent for your organization.",
        },
        "employer-/signup": {
            image: "/assets/auth/employer-signup-bg.svg",
            title: "Secure the Right Talent for Your Organization",
            description:
                "Sign up to post jobs,showcase your company, and <br /> attract the best cybersecurity professionals to build a strong team.",
        },
    };



    const illustration = illustrationMap[key];

    return (
        <div
            className={`hidden lg:flex w-1/2 relative bg-[var(--primary)] flex-col items-center justify-center p-6 overflow-hidden ${className || ""}`}
        >
            {/* Background shapes */}
            <div className="absolute -top-1 right-0">
                <Image
                    src="/assets/auth/triangle-1-bg.svg"
                    alt="Edge Top Right"
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-0 left-0 translate-x-[-20%] translate-y-[20%]">
                <Image
                    src="/assets/auth/triangle-2-bg.svg"
                    alt="Edge Bottom Left"
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>

            {/* Main illustration */}
            <div className="flex items-center justify-center mb-8 relative z-10">
                <Image
                    src={illustration.image}
                    alt={`${role} illustration`}
                    width={600}
                    height={600}
                    className="object-contain"
                />
            </div>

            {/* Text description */}
            <div className="px-6 text-center relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-foreground)] leading-snug">
                    {illustration.title}
                </h2>
                <p
                    className="mt-4 text-sm md:text-base text-[var(--primary-foreground)]"
                    dangerouslySetInnerHTML={{ __html: illustration.description }}
                />
            </div>
        </div>
    );
}
