"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import JobHeader from "./JobHeader";
import CompanyInfo from "./CompanyInfo";
import JobInfo from "./JobInfo";
import ApplyModal from "./ApplyModal";
import { useJobDetail } from "@/features/jobs/hooks/useJobs";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { ApplyType } from "@/features/jobs/types/jobSlug";
import Loader from "../common/Loader";

export default function JobDetailsPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const { jobDetail: job, isLoading } = useJobDetail(slug!);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleApply = () => {
        if (!job) return;
        if (job.applyType === ApplyType.EXTERNAL && "applyUrl" in job) {
            window.open(job.applyUrl, "_blank");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleShare = () => alert(`Sharing ${job?.title}`);

    const handleSave = () => {
        setSaved(!saved);
        alert(saved ? "Job removed from saved" : "Job saved successfully ✅");
    };

    if (isLoading) {
        return (
            <Loader />
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
        <div className="relative min-h-screen w-full bg-blue-50 p-6 lg:p-12">
            <JobHeader job={job} onApply={handleApply} onShare={handleShare} />

            {/* Save button */}
            <button
                onClick={handleSave}
                className="absolute top-0 right-0 w-16 h-16 bg-[#0062FF] flex items-center justify-center
                           rounded-full shadow-xl hover:bg-blue-700 transition"
            >
                {saved ? (
                    <BookmarkCheck size={24} className="text-white" />
                ) : (
                    <Bookmark size={24} className="text-white" />
                )}
            </button>

            {/* Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8  ">
                {/* Company Info takes 1/3 */}
                <div className="lg:col-span-1">
                    <CompanyInfo job={job} />
                </div>

                {/* Job Info takes 2/3 */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <JobInfo job={job} />
                </div>
            </div>

            {isModalOpen && <ApplyModal job={job} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
