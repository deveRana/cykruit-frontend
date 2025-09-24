"use client";

import React from "react";
import { Globe2, Briefcase, Users } from "lucide-react";
import { Job } from "@/features/jobs/types/jobSlug";

interface CompanyInfoProps {
    job: Pick<Job, "company" | "companyLogo" | "website" | "industry" | "size" | "description">;
}

export default function CompanyInfo({ job }: CompanyInfoProps) {
    // Extract only the domain from website
    const domain = job.website ? (() => {
        try {
            return new URL(job.website).hostname;
        } catch {
            return job.website;
        }
    })() : null;

    return (
        <div className="flex flex-col items-center lg:items-start gap-6 bg-white backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            {/* Logo or placeholder */}
            <div className="w-full flex items-center justify-center">
                {job.companyLogo ? (
                    <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-32 h-32 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                        <Briefcase size={48} className="text-blue-600" />
                    </div>
                )}
            </div>

            {/* Company Name */}
            <h2 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
                {job.company}
            </h2>

            {/* Details */}
            <div className="text-gray-700 space-y-3 w-full">
                {domain && (
                    <p className="flex items-center gap-2 break-words">
                        <Globe2 className="text-black" size={16} />
                        <a
                            href={job.website}
                            className="text-blue-600 underline hover:text-blue-800 transition-colors break-all"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {domain}
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
