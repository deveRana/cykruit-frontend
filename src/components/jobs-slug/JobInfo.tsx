"use client";

import React from "react";
import { Tag, Briefcase } from "lucide-react";
import { Job } from "@/features/jobs/types/jobSlug";

interface JobInfoProps {
    job: Pick<Job, "description" | "skills" | "certifications" | "salary" | "time" | "location" | "type">;
}

export default function JobInfo({ job }: JobInfoProps) {
    return (
        <div className=" space-y-6">
            {/* Description */}
            <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Skills */}
            {job.skills?.length > 0 && (
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
            )}

            {/* Certifications */}
            {job.certifications && job.certifications.length > 0 && (
                <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h2>
                    <ul className="space-y-2 text-gray-600">
                        {job.certifications.map((cert, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <Briefcase size={16} className="text-blue-500 mt-1" /> {cert}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
