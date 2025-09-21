"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { useJobDetail } from "@/features/jobs/hooks/useJobs";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import { useApplications } from "@/features/seeker/applications/hooks/useApplications";
import { useToast } from "@/components/common/Toast";
import { FiStar } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import JobHeader from "@/components/jobs/slug/JobHeader";
import JobInfo from "@/components/jobs/slug/JobInfo";
import JobSection from "@/components/jobs/slug/JobSection";
import Loader from "@/components/common/Loader";
import ApplyJobModal from "@/components/common/modals/ApplyJobModal";

import type { ApplyJobPayload, JobApplication } from "@/features/seeker/applications/types/applications";
import type { JobDetail } from "@/features/jobs/types/jobs";
import { useAppSelector } from "@/store/hooks";

interface ScreeningQuestion {
    id: string;
    question: string;
}

const JobDetailPage = () => {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const user = useAppSelector((state) => state.auth.user);
    const isJobSeeker = user?.role === "SEEKER"; // ✅ check role

    const { jobDetail, isLoading: loadingJob, emptyState } = useJobDetail(slug!);

    // Only call these hooks for job seekers
    const { savedJobs, saveJob, removeSavedJob, isLoading: loadingSavedJobs } = useSavedJobs(isJobSeeker);
    const { applications, applyToJob, isLoading: loadingApplications } = useApplications(isJobSeeker);

    const { error, success, info } = useToast();

    const [isSaved, setIsSaved] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);

    const isLoading = loadingJob || loadingSavedJobs || loadingApplications;

    // Update saved state for job seekers
    useEffect(() => {
        if (isJobSeeker && jobDetail && savedJobs) {
            const saved = savedJobs.some((job) => job.jobId === jobDetail.id.toString());
            setIsSaved(saved);
        }
    }, [jobDetail, savedJobs, isJobSeeker]);

    const handleSaveClick = useCallback(() => {
        if (!isJobSeeker) return; // Only job seekers can save
        if (!user) return error("Please login to save jobs!");
        if (!jobDetail) return;

        if (isSaved) {
            removeSavedJob(jobDetail.id.toString());
            setIsSaved(false);
            info("Job removed from saved jobs");
        } else {
            saveJob(jobDetail.id.toString());
            setIsSaved(true);
            success("Job saved successfully");
        }
    }, [user, isSaved, jobDetail, removeSavedJob, saveJob, error, success, info, isJobSeeker]);

    const handleApplyClick = useCallback(async () => {
        if (!isJobSeeker) return; // Only job seekers can apply
        if (!user) return error("Please login to apply for jobs!");
        if (!jobDetail || !applyToJob) return;

        if (jobDetail.applyType === "EXTERNAL") {
            try {
                const payload: ApplyJobPayload = { jobId: jobDetail.id.toString() };
                const res: JobApplication & { redirectUrl?: string } = await applyToJob(payload);

                success("Redirecting to external application...");
                if (res && res.redirectUrl) window.open(res.redirectUrl, "_blank");
            } catch {
                error("Failed to apply");
            }
        } else {
            setShowApplyModal(true);
        }
    }, [user, jobDetail, applyToJob, success, error, isJobSeeker]);

    const handleApplyModalSubmit = useCallback(
        async (payload: ApplyJobPayload & { answers?: { questionId: string | number | bigint; answer: string }[] }) => {
            if (!jobDetail || !applyToJob) return;

            try {
                const transformedPayload: ApplyJobPayload = {
                    ...payload,
                    answers: payload.answers?.map((a) => ({
                        questionId: BigInt(a.questionId),
                        answer: a.answer,
                    })),
                };

                const res: JobApplication & { redirectUrl?: string } = await applyToJob(transformedPayload);

                success("Applied successfully!");
                setShowApplyModal(false);

                if (res && res.redirectUrl) window.open(res.redirectUrl, "_blank");
            } catch {
                error("Failed to apply");
            }
        },
        [jobDetail, applyToJob, success, error]
    );

    const alreadyApplied =
        isJobSeeker && user && jobDetail
            ? applications.some((app) => app.jobId.toString() === jobDetail.id.toString())
            : false;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader />
            </div>
        );
    }

    if (!jobDetail) return emptyState;

    return (
        <div className="min-h-screen bg-[#F1F5F9] py-12 px-4 md:px-12 flex justify-center">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-5xl flex flex-col gap-10 transition-all hover:shadow-3xl">

                {/* Save button only for job seekers */}
                {isJobSeeker && (
                    <button
                        onClick={handleSaveClick}
                        className={`absolute top-6 right-6 text-2xl transition-transform duration-300 
                            ${isSaved ? "text-yellow-500 scale-110" : "text-gray-400"} 
                            hover:text-yellow-500 hover:scale-125`}
                    >
                        <FiStar
                            className={`${isSaved ? "text-yellow-500" : "text-gray-400"} transition-colors duration-300`}
                        />
                    </button>
                )}

                <JobHeader jobDetail={jobDetail as JobDetail} />
                <JobInfo jobDetail={jobDetail as JobDetail} />
                <JobSection title="Job Description" content={jobDetail.description} />
                <JobSection title="Responsibilities" content={jobDetail.responsibilities || []} />
                <JobSection title="Requirements" content={jobDetail.requirements || []} />
                <JobSection title="Benefits" content={jobDetail.benefits || []} />

                {/* Apply button only for job seekers */}
                {isJobSeeker && (
                    <div className="mt-6">
                        <Button
                            className="w-full rounded-xl bg-[#0F123F] text-white shadow-lg py-3 text-lg font-semibold transition-all disabled:opacity-50"
                            onClick={handleApplyClick}
                            disabled={!user || alreadyApplied}
                        >
                            {!user ? "Login to Apply" : alreadyApplied ? "Already Applied" : "Apply Now"}
                        </Button>
                    </div>
                )}
            </div>

            {showApplyModal && isJobSeeker && (
                <ApplyJobModal
                    jobDetail={{
                        ...jobDetail,
                        questions: (jobDetail as { screeningQuestions?: ScreeningQuestion[] }).screeningQuestions ?? [],
                    }}
                    onClose={() => setShowApplyModal(false)}
                    onSubmit={handleApplyModalSubmit}
                />
            )}
        </div>
    );
};

export default JobDetailPage;
