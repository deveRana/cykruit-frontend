"use client";

import React from "react";
import { Monitor, Shield, Award, MessageSquare, FileText, Bell } from "lucide-react";

export default function FeaturesSection() {
    const features = [
        {
            title: "Cyber-Only Focus",
            description: "Chat securely with recruiters. End-to-end encrypted.",
            icon: <Monitor size={32} />,
        },
        {
            title: "Skill-Based Matching",
            description: "Smart filters & resume analyzer help highlight what matters.",
            icon: <Shield size={32} />,
        },
        {
            title: "Certifications & Badges",
            description: "Upload certs to boost visibility and trust with recruiters.",
            icon: <Award size={32} />,
        },
        {
            title: "Secure Messaging",
            description: "Chat securely with recruiters. End-to-end encrypted.",
            icon: <MessageSquare size={32} />,
        },
        {
            title: "Resume Builder",
            description: "Craft a security-focused resume right inside the app.",
            icon: <FileText size={32} />,
        },
        {
            title: "Job Alerts & Insights",
            description: "Stay ahead with alerts, salary data, and market trends.",
            icon: <Bell size={32} />,
        },
    ];

    return (
        <section className="relative w-full py-24 bg-[#EBEAFF] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Heading */}
                <div className="text-center mb-16 lg:text-left">
                    <h2 className="text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                        Why <span className="text-[#0062FF]">Cyberjobs?</span>
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0">
                        Built by security professionals — for security professionals.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`
                                group p-6 rounded-xl border-2 min-h-[260px] flex flex-col justify-between
                                transition-all duration-300 transform hover:scale-105
                                ${index === 1
                                    ? "bg-[#0062FF] text-white border-[#0062FF]"
                                    : "bg-white text-gray-800 border-gray-200 hover:bg-[#0062FF] hover:text-white hover:border-[#0062FF]"}
                            `}
                        >
                            <div className="flex flex-col items-start mb-4">
                                <div
                                    className={`
                                        p-3 rounded-lg mb-3
                                        transition-colors duration-300
                                        ${index === 1
                                            ? "bg-white text-[#0062FF]"
                                            : "bg-gray-100 text-[#0062FF] group-hover:bg-white group-hover:text-[#0062FF]"}
                                    `}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                            </div>
                            <p className="text-base leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
