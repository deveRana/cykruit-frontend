"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useJobDetail } from "@/features/jobs/hooks/useJobs";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import { useApplications } from "@/features/seeker/applications/hooks/useApplications";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useToast } from "@/components/common/Toast";
import { FiStar } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import JobHeader from "@/components/jobs/slug/JobHeader";
import JobInfo from "@/components/jobs/slug/JobInfo";
import JobSection from "@/components/jobs/slug/JobSection";
import Loader from "@/components/common/Loader";

const JobDetailPage = () => {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const { jobDetail, isLoading: loadingJob, loader: jobLoader, emptyState } = useJobDetail(slug!);
    const { savedJobs, saveJob, removeSavedJob, isLoading: loadingSavedJobs } = useSavedJobs();
    const { applications, applyToJob, isLoading: loadingApplications } = useApplications();
    const { user } = useAuth();
    const { error, success, info } = useToast();

    const [isSaved, setIsSaved] = useState(false);

    // Merge all loading states
    const isLoading = loadingJob || loadingSavedJobs || loadingApplications;

    useEffect(() => {
        if (jobDetail && savedJobs) {
            setIsSaved(savedJobs.some((job) => job.jobId === jobDetail.id.toString()));
        }
    }, [jobDetail, savedJobs]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader />
            </div>
        );
    }

    if (!jobDetail) return emptyState;

    const handleSaveClick = () => {
        if (!user) return error("Please login to save jobs!");

        if (isSaved) {
            removeSavedJob(jobDetail.id.toString());
            setIsSaved(false);
            info("Job removed from saved jobs");
        } else {
            saveJob(jobDetail.id.toString());
            setIsSaved(true);
            success("Job saved successfully");
        }
    };

    const handleApplyClick = () => {
        if (!user) return error("Please login to apply for jobs!");

        applyToJob({ jobId: jobDetail.id.toString() });
        success("Applied successfully!");
    };

    // Check if already applied or user not logged in
    const alreadyApplied = user
        ? applications.some((app) => app.jobId.toString() === jobDetail.id.toString())
        : false;

    return (
        <div className="min-h-screen bg-[#F1F5F9] py-12 px-4 md:px-12 flex justify-center">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-5xl flex flex-col gap-10 transition-all hover:shadow-3xl">

                {/* Save Icon */}
                <button
                    onClick={handleSaveClick}
                    className={`absolute top-6 right-6 text-2xl transition-transform duration-300 
            ${isSaved ? "text-yellow-500 scale-110" : "text-gray-400"} 
            hover:text-yellow-500 hover:scale-125`}
                >
                    <FiStar className={`${isSaved ? "text-yellow-500" : "text-gray-400"} transition-colors duration-300`} />
                </button>

                <JobHeader jobDetail={jobDetail} />
                <JobInfo jobDetail={jobDetail} />
                <JobSection title="Job Description" content={jobDetail.description} />
                <JobSection title="Responsibilities" content={jobDetail.responsibilities || []} />
                <JobSection title="Requirements" content={jobDetail.requirements || []} />
                <JobSection title="Benefits" content={jobDetail.benefits || []} />

                <div className="mt-6">
                    <Button
                        className="w-full rounded-xl bg-[#0F123F] text-white shadow-lg py-3 text-lg font-semibold transition-all disabled:opacity-50"
                        onClick={handleApplyClick}
                        disabled={!user || alreadyApplied} // disable if not logged in or already applied
                    >
                        {!user ? "Login to Apply" : alreadyApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;
