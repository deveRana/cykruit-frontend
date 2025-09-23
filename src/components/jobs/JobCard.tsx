"use client";

import React, { useState } from "react";
import { Briefcase, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import ShareModal from "../common/ShareModal";
import { Job } from "@/features/jobs/types/jobs";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const [isShareOpen, setIsShareOpen] = useState(false);

    // Helper to display "time ago" from postedAt
    const getTimeAgo = (date?: string | Date) => {
        if (!date) return "Recently";

        const postedDate = date instanceof Date ? date : new Date(date);
        const now = new Date();
        const diffMs = now.getTime() - postedDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;

        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? "s" : ""} ago`;
    };

    return (
        <>
            <div className="relative bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col h-full min-h-[320px]">
                {/* Posted At - Top Right */}
                <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {getTimeAgo(job.postedAt)}
                </span>

                {/* Job Card Header */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-100 to-blue-50 flex items-center justify-center text-blue-600">
                        <Briefcase size={22} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{job.company}</h3>
                        <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                </div>

                {/* Job Title */}
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {job.description || "No description provided."}
                </p>

                {/* Job Details */}
                <div className="flex items-center justify-between mt-auto pt-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                            {job.type}
                        </span>
                        {job.mode && (
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                                {job.mode}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        {/* Share Button */}
                        <button
                            onClick={() => setIsShareOpen(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Share2 size={16} />
                        </button>

                        {/* View Button */}
                        <Link
                            href={`/jobs/${job.slug}`}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <Eye size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                jobTitle={job.title}
                jobSlug={job.slug}
            />
        </>
    );
}
