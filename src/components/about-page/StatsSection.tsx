"use client";

import React from 'react';
import { Briefcase, Building, User } from "lucide-react";

// The StatsSection component is a a visually appealing showcase of key statistics,
// designed with a modern, clean aesthetic using Tailwind CSS and Lucide icons.
// Each statistic is presented in a card with a subtle glassmorphism effect,
// and the icons are dynamically chosen based on the data.

const stats = [
    {
        value: "3,200+",
        label: "Active Cybersecurity Jobs",
        icon: Briefcase,
        color: "blue"
    },
    {
        value: "500+",
        label: "Verified Companies",
        icon: Building,
        color: "blue"
    },
    {
        value: "45,000+",
        label: "Skilled Professionals",
        icon: User,
        color: "blue"
    },
];

export default function StatsSection() {
    return (
        <section className="relative w-full py-24 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`
              p-8 sm:p-10 rounded-xl shadow-lg
              bg-white/50 backdrop-filter backdrop-blur-sm
              border-2 border-white
              flex flex-col items-center justify-center
              transition-all duration-300
              hover:shadow-2xl hover:scale-105
              ${stat.label === "Verified Companies" ? 'border-[#0062FF]' : 'border-gray-200'}
            `}
                    >
                        {/* Icon and Value */}
                        <div className="flex items-center space-x-4 mb-4">
                            <stat.icon className={`text-${stat.color}-600 w-10 h-10`} />
                            <h3 className={`text-4xl sm:text-5xl font-extrabold text-[#0062FF]`}>
                                {stat.value}
                            </h3>
                        </div>

                        {/* Label */}
                        <p className="text-lg text-gray-700 font-medium">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
