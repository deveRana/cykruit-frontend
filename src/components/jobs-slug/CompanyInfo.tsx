"use client";

import React from "react";
import { Globe, Briefcase, Users } from "lucide-react";
import { Job } from "@/features/jobs/types/jobSlug";

interface CompanyInfoProps {
    job: Pick<Job, "company" | "companyLogo" | "website" | "industry" | "size" | "description">;
}

export default function CompanyInfo({ job }: CompanyInfoProps) {
    return (
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md">
            <div className="w-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                    <Briefcase size={48} className="text-blue-600" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center lg:text-left">{job.company}</h2>

            {job.description && (
                <p className="text-gray-600 text-sm leading-relaxed text-center lg:text-left">
                    {job.description}
                </p>
            )}

            <div className="text-gray-700 space-y-3 w-full">
                {job.website && (
                    <p className="flex items-center gap-2">
                        <Globe size={16} />
                        <a
                            href={job.website}
                            className="text-blue-600 underline hover:text-blue-800 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {job.website}
                        </a>
                    </p>
                )}
                {job.industry && (
                    <p className="flex items-center gap-2">
                        <Briefcase size={16} /> {job.industry}
                    </p>
                )}
                {job.size && (
                    <p className="flex items-center gap-2">
                        <Users size={16} /> {job.size}
                    </p>
                )}
            </div>
        </div>
    );
}
