"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import JobHeader from "./JobHeader";
import CompanyInfo from "./CompanyInfo";
import JobInfo from "./JobInfo";
import ApplyModal from "./ApplyModal";
import { ApplyType, Job } from "@/features/jobs/types/jobSlug";
import { useJobDetail } from "@/features/jobs/hooks/useJobs";

export default function JobDetailsPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const { jobDetail: job, isLoading } = useJobDetail(slug!);
    console.log(job);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApply = () => {
        if (!job) return;

        if (job.applyType === ApplyType.EXTERNAL && "applyUrl" in job) {
            window.open(job.applyUrl, "_blank");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleShare = () => alert(`Sharing ${job?.title}`);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-gray-500">
                Loading...
            </div>
        );
    }

    if (!job) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-red-500 text-lg">
                Job not found
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-blue-50">
            <JobHeader job={job} onApply={handleApply} onShare={handleShare} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 p-6 sm:p-12 pt-0 sm:pt-0">
                <CompanyInfo job={job} />
                <JobInfo job={job} />
            </div>

            {isModalOpen && <ApplyModal job={job} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
