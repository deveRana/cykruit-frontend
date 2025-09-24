"use client";

import React, { useState } from "react";
import { MapPin, Bookmark, BookmarkCheck } from "lucide-react";
import { Job } from "@/features/jobs/types/jobSlug";

interface JobHeaderProps {
    job: Pick<Job, "title" | "role" | "location" | "type" | "mode" | "time" | "deadline">;
    onApply: () => void;
    onShare: () => void;
}

export default function JobHeader({ job, onApply, onShare }: JobHeaderProps) {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(!saved);
        alert(saved ? "Job removed from saved" : "Job saved successfully ✅");
    };

    return (
        <div className="relative flex flex-col sm:flex-row p-6 sm:p-12 sm:pb-0 pb-0 sm:justify-between sm:items-start mb-8 gap-6">

            {/* Save button with bottom-left half-circle */}
            <button
                onClick={handleSave}
                className="absolute top-0 right-0 w-16 h-16 bg-[#0062FF] flex items-center justify-center
                           rounded-b-full  shadow-xl hover:bg-blue-700 transition"
            >
                {saved ? (
                    <BookmarkCheck size={24} className="text-white" />
                ) : (
                    <Bookmark size={24} className="text-white" />
                )}
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-gray-700">{job.role}</p>

                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <MapPin size={16} /> {job.location}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                            {job.type}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium">
                            {job.mode}
                        </span>
                        {job.deadline && (
                            <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                                Apply by {job.deadline}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                    onClick={onApply}
                    className="px-6 py-3 rounded-xl bg-[#0062FF] text-white font-semibold shadow-md transition-all duration-300
                   hover:bg-blue-700 hover:shadow-lg hover:scale-105"
                >
                    Apply Now
                </button>
                <button
                    onClick={onShare}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition"
                >
                    Share
                </button>
            </div>
        </div>
    );
}
