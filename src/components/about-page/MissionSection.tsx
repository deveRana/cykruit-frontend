"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function MissionSection() {
    const missionCards = [
        {
            title: "Trust & Verification",
            description: "Every job and candidate is screened for quality and relevance.",
            className: "border-gray-300 text-gray-800",
            icon: <ArrowUpRight size={24} />,
        },
        {
            title: "Empowerment First",
            description: "Tools to help pros grow, upskill, and thrive in the field.",
            className: "bg-[#0062FF] text-white",
            icon: <ArrowUpRight size={24} className="text-white" />,
        },
        {
            title: "Talent-Driven Future",
            description: "We believe security is powered by people — and we're building the platform to support that.",
            className: "border-gray-300 text-gray-800",
            icon: <ArrowUpRight size={24} />,
        },
    ];

    return (
        <section className="relative w-full py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Text Section */}
                <div className="text-center lg:text-left">
                    <h2 className="text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                        Our <span className="text-[#0062FF]">Mission</span>
                    </h2>
                    <p className="text-lg text-gray-700 max-w-lg lg:max-w-none mx-auto lg:mx-0">
                        To connect cybersecurity talent with mission-critical roles — SOC analysts, red teamers, CISOs, and more. We help professionals upskill and stand out while enabling companies to hire with speed and confidence.
                    </p>
                </div>

                {/* Right Cards Section */}
                <div className="grid grid-cols-2 gap-6">
                    {/* First row: first two cards */}
                    {missionCards.slice(0, 2).map((card, index) => (
                        <div
                            key={index}
                            className={`
                                p-6 rounded-xl border-2
                                transition-all duration-300 transform hover:scale-105
                                ${card.className}
                            `}
                        >
                            <div className="flex flex-col justify-between items-start mb-4">
                                {card.icon}
                                <h3 className="text-xl font-semibold mt-3">{card.title}</h3>
                            </div>
                            <p className="text-base">{card.description}</p>
                        </div>
                    ))}

                    {/* Second row: third card spanning both columns */}
                    <div
                        className={`
                            p-6 rounded-xl border-2
                            transition-all duration-300 transform hover:scale-105
                            ${missionCards[2].className}
                            col-span-2
                        `}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">{missionCards[2].title}</h3>
                            {missionCards[2].icon}
                        </div>
                        <p className="text-base">{missionCards[2].description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
