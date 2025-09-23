"use client";

import React from "react";
import { MapPin, Clock, DollarSign, Tag, Briefcase } from "lucide-react";

interface JobInfoProps {
    job: {
        location: string;
        time: string;
        type: string;
        description: string;
        requirements: string[];
        responsibilities: string[];
        skills: string[];
        salary: string;
    };
}

export default function JobInfo({ job }: JobInfoProps) {
    return (
        <div className="lg:col-span-8 space-y-6">

            {/* Description */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h2>
                <ul className="space-y-2 text-gray-600">
                    {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <Tag size={16} className="text-green-500 mt-1" /> {req}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h2>
                <ul className="space-y-2 text-gray-600">
                    {job.responsibilities.map((res, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                            <Tag size={16} className="text-yellow-500 mt-1" /> {res}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Skills */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h2>
                <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                        >
                            <Tag size={14} /> {skill}
                        </span>
                    ))}
                </div>
            </div>


        </div>
    );
}
