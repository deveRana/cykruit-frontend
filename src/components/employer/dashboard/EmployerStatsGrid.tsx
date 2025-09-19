"use client";

import React from "react";

interface Stat {
    title: string;
    value: number;
}

interface Props {
    stats: Stat[];
}

export default function EmployerStatsGrid({ stats }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                    <h3 className="text-sm text-gray-400 uppercase tracking-wide">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
            ))}
        </div>
    );
}
