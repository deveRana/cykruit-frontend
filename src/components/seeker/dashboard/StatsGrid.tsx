"use client";

import { Card } from "@/components/ui/card";
import { Briefcase, Bookmark, Eye, Calendar } from "lucide-react";
import React from "react"; // ✅ needed for React.ReactNode

const iconMap: Record<string, React.ReactNode> = {
    "Jobs Applied": <Briefcase className="w-6 h-6 text-indigo-600" />,
    "Saved Jobs": <Bookmark className="w-6 h-6 text-pink-500" />,
    "Profile Views": <Eye className="w-6 h-6 text-emerald-500" />,
    "Interviews Scheduled": <Calendar className="w-6 h-6 text-amber-500" />,
};

export default function StatsGrid({
    stats,
}: {
    stats: { title: string; value: number | string }[];
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card
                    key={stat.title}
                    className="p-6 rounded-xl shadow-sm border hover:shadow-md transition-all bg-white flex items-center gap-4"
                >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                        {iconMap[stat.title]}
                    </div>

                    {/* Text */}
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                            {stat.value}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
