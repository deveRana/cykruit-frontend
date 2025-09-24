"use client";

import React, { useState } from "react";
import { MapPin, Briefcase, Calendar, User } from "lucide-react";
import { Job } from "@/features/jobs/types/jobSlug";

interface JobHeaderProps {
    job: Pick<
        Job,
        "title" | "role" | "location" | "type" | "mode" | "time" | "deadline" | "experienceLevel"
    >;
    onApply: () => void;
    onShare: () => void;
}

export default function JobHeader({ job, onApply, onShare }: JobHeaderProps) {


    return (
        <div className="relative flex flex-col sm:flex-row p-8 sm:p-12 rounded-2xl bg-white shadow-lg gap-6 items-start">


            {/* Job info */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">{job.title}</h1>
                    <p className="text-gray-700 text-lg mt-1">{job.role}</p>

                    <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100">
                            <MapPin size={16} /> {job.location}
                        </span>

                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                            <Briefcase size={14} /> {job.type}
                        </span>

                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                            🏠 {job.mode}
                        </span>

                        {job.experienceLevel && (
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                <User size={14} /> {job.experienceLevel}
                            </span>
                        )}

                        {job.deadline && (
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                                <Calendar size={14} /> Apply by {job.deadline}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                    onClick={onApply}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition transform"
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
