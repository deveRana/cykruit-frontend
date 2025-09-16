// src/app/(seeker)/saved-jobs/page.tsx
"use client";

import React, { useState } from "react";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import { FiTrash2, FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import Loader from "@/components/common/Loader";

const SavedJobsPage = () => {
    const { savedJobs, isLoading, loader, removeSavedJob } = useSavedJobs();
    const [removingJobId, setRemovingJobId] = useState<string | null>(null);

    const handleRemove = (jobId: string) => {
        setRemovingJobId(jobId);
        removeSavedJob(jobId);
        setRemovingJobId(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <Loader />}
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
                            className="border-l-4 border-[#0F123F] bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between gap-3"
                        >
                            <div className="space-y-2">
                                <p className="text-xl font-bold text-[#0F123F]">{job.job.title}</p>
                                {job.job.companyName && (
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <FiBriefcase className="text-[#0F123F]" /> {job.job.companyName}
                                    </p>
                                )}
                                {job.job.location && (
                                    <p className="flex items-center gap-2 text-gray-700">
                                        <FiMapPin className="text-[#0F123F]" /> {job.job.location}
                                    </p>
                                )}
                                {job.job.postedAt && (
                                    <p className="flex items-center gap-2 text-gray-500">
                                        <FiCalendar className="text-[#0F123F]" /> {new Date(job.job.postedAt).toDateString()}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <FiTrash2
                                    className={`cursor-pointer ${removingJobId === job.id ? "text-gray-400" : "text-red-500 hover:text-red-600"
                                        }`}
                                    onClick={() => handleRemove(job.jobId)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedJobsPage;
