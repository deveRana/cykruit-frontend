// src/app/(seeker)/saved-jobs/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import {
    FiTrash2,
    FiBriefcase,
    FiMapPin,
    FiCalendar,
    FiEye,
} from "react-icons/fi";
import Loader from "@/components/common/Loader";

const SmallLoader = () => (
    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
);

const SavedJobsPage = () => {
    const { savedJobs, removeSavedJob, isLoading, loader } = useSavedJobs();
    const [removingJobId, setRemovingJobId] = useState<string | null>(null);

    const handleRemove = async (jobId: string) => {
        setRemovingJobId(jobId);
        await removeSavedJob(jobId);
        setRemovingJobId(null);
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
                    {savedJobs?.map((job) => (
                        <div
                            key={job.id}
                            className="relative flex flex-col border border-gray-100 bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
                        >
                            {/* Header: Logo + Info */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 font-bold">
                                    {job.job.companyName?.[0] ?? "🏢"}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition">
                                        {job.job.title}
                                    </h3>
                                    {job.job.companyName && (
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <FiBriefcase className="text-indigo-500" />
                                            {job.job.companyName}
                                        </p>
                                    )}
                                    {job.job.location && (
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <FiMapPin className="text-indigo-500" />
                                            {job.job.location}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {job.job.salaryMin && job.job.salaryMax && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                        💰 {job.job.currency} {job.job.salaryMin} - {job.job.salaryMax}
                                    </span>
                                )}
                                {job.job.employmentType && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                        {job.job.employmentType}
                                    </span>
                                )}
                                {job.job.experience && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                                        {job.job.experience}
                                    </span>
                                )}
                                {job.job.postedAt && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                                        <FiCalendar className="text-gray-500" />{" "}
                                        {new Date(job.job.postedAt).toDateString()}
                                    </span>
                                )}
                            </div>

                            {/* Footer actions */}
                            <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">
                                <Link
                                    href={`/jobs/${job.job.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
                                >
                                    <FiEye /> View
                                </Link>

                                <button
                                    onClick={() => handleRemove(job.jobId)}
                                    disabled={removingJobId === job.id}
                                    className="flex items-center justify-center"
                                >
                                    {removingJobId === job.id ? (
                                        <SmallLoader />
                                    ) : (
                                        <FiTrash2 className="cursor-pointer text-lg text-red-500 hover:text-red-600 transition" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobsPage;
