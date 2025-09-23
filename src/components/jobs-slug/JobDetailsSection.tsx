// app/jobs/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import React from "react";
import { jobs } from "./dummyJobs"; // You can keep all job data in a separate file
import JobHeader from "./JobHeader";
import CompanyInfo from "./CompanyInfo";
import JobInfo from "./JobInfo";

export default function JobDetailsPage() {
    const { slug } = useParams();
    const job = jobs.find((j) => j.slug === slug);

    const handleApply = () => alert(`Applying for ${job?.title}`);
    const handleShare = () => alert(`Sharing ${job?.title}`);

    if (!job) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-red-500 text-lg">
                Job not found
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50 p-6 sm:p-12">
            <JobHeader job={job} onApply={handleApply} onShare={handleShare} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                <CompanyInfo job={job} />
                <JobInfo job={job} />
            </div>
        </div>
    );
}
