"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import { SavedJob } from "@/features/jobs/types/jobSlug";
import { Briefcase, Eye, Share2, Trash2 } from "lucide-react";
import ShareModal from "@/components/common/ShareModal";

const SmallLoader = () => (
    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
);

export default function SavedJobsPage() {
    const { savedJobs, removeSavedJob, isLoading, loader } = useSavedJobs();
    const [removingJobId, setRemovingJobId] = useState<string | null>(null);
    const [shareJob, setShareJob] = useState<SavedJob | null>(null);
    const handleRemove = async (jobId: string) => {
        setRemovingJobId(jobId);
        await removeSavedJob(jobId);
        setRemovingJobId(null);
    };

    // 🟢 helper: show "time ago" like JobCard
    const getTimeAgo = (date?: string | Date) => {
        if (!date) return "Recently";
        const postedDate = date instanceof Date ? date : new Date(date);
        const now = new Date();
        const diffMs = now.getTime() - postedDate.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30)
            return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
        if (diffDays < 365)
            return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
        return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? "s" : ""
            } ago`;
    };

    if (isLoading && !removingJobId) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <div>Loading...</div>}
            </div>
        );
    }

    return (
        <div className="space-y-6 py-6">
            {savedJobs && savedJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl">
                    <p className="text-gray-500 mb-4 text-lg">No saved jobs yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs?.map((saved) => {
                        const job = saved.job;
                        if (!job) return null;

                        return (
                            <div
                                key={saved.id}
                                className="relative bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex flex-col h-full min-h-[320px]"
                            >
                                {/* Posted At */}
                                <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {getTimeAgo(job.postedAt)}
                                </span>

                                {/* Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                        {job.company?.[0] ?? <Briefcase size={22} />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {job.company || "Company"}
                                        </h3>
                                        {job.location && (
                                            <p className="text-sm text-gray-500">{job.location}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Title + Desc */}
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    {job.title}
                                </h4>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {job.description || "No description provided."}
                                </p>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {job.type && (
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                                            {job.type}
                                        </span>
                                    )}
                                    {job.mode && (
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                                            {job.mode}
                                        </span>
                                    )}
                                    {job.experienceLevel && (
                                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600">
                                            {job.experienceLevel}
                                        </span>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShareJob(saved)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                        >
                                            <Share2 size={16} />
                                        </button>
                                        <Link
                                            href={`/jobs/${job.slug}`}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(saved.jobId.toString())}
                                        disabled={removingJobId === saved.id}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        {removingJobId === saved.id ? (
                                            <SmallLoader />
                                        ) : (
                                            <Trash2 size={16} className="text-red-500" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Share Modal */}
            {shareJob?.job && (
                <ShareModal
                    isOpen={!!shareJob}
                    onClose={() => setShareJob(null)}
                    jobTitle={shareJob.job.title}
                    jobSlug={shareJob.job.slug}
                />
            )}
        </div>
    );
}
