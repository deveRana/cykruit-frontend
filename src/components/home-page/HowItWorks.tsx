"use client";

import { User, Briefcase, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
    {
        icon: User,
        title: "Create Profile",
        desc: "Upload your resume, list certifications, and highlight your cyber expertise.",
    },
    {
        icon: Briefcase,
        title: "Apply or Post Jobs",
        desc: "Search for roles or publish openings with built-in screening options.",
    },
    {
        icon: Users,
        title: "Match & Connect",
        desc: "We smartly connect candidates and employers based on skills, intent, and security domain.",
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full py-16 sm:py-20 bg-[#EBEAFF]">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center lg:text-start">
                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    How <span className="text-[#0062FF]">Cykruit</span> Works?
                </h2>
                <p className="text-gray-700 mb-12 sm:mb-14 max-w-3xl text-base sm:text-lg md:text-xl mx-auto lg:mx-0">
                    Discover a streamlined hiring process built specifically for the cybersecurity industry.
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {steps.map((step, i) => (
                        <Card
                            key={i}
                            className={`flex flex-col items-center justify-start px-4 sm:px-6 py-8 sm:py-10 rounded-none shadow-none bg-transparent transition-all
                                ${i === 1 ? "border-x-2 border-y-0 border-gray-300" : "border-none"}`}
                        >
                            {/* Icon with bg */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-[#0062FF] text-white mb-5 sm:mb-6">
                                <step.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3">{step.title}</h3>

                            {/* Description */}
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center lg:text-left">
                                {step.desc}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
