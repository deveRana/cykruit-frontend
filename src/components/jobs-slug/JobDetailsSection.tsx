"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Bookmark, BookmarkCheck } from "lucide-react";

import JobHeader from "./JobHeader";
import CompanyInfo from "./CompanyInfo";
import JobInfo from "./JobInfo";
import Loader from "../common/Loader";
import ApplyJobModal from "../common/modals/ApplyJobModal";

import { useJobDetail } from "@/features/jobs/hooks/useJobs";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import { useApplications } from "@/features/seeker/applications/hooks/useApplications";
import { useMessageModal } from "../common/MessageModal";
import { useAppSelector } from "@/store/hooks";
import { ApplyType, PreScreeningJob } from "@/features/jobs/types/jobSlug";


export default function JobDetailsPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const user = useAppSelector((state) => state.auth.user);
    const isJobSeeker = user?.role === "SEEKER";

    const { jobDetail: job, isLoading: loadingJob } = useJobDetail(slug!);
    const { savedJobs, saveJob, removeSavedJob } = useSavedJobs(isJobSeeker);
    const { applications, applyToJob } = useApplications(isJobSeeker);
    const { showMessage } = useMessageModal();

    const [isSaved, setIsSaved] = useState<boolean | null>(null);
    const [showApplyModal, setShowApplyModal] = useState(false);

    // update saved state
    useEffect(() => {
        if (isJobSeeker && job && savedJobs) {
            setIsSaved(savedJobs.some((j) => j.jobId.toString() === job.id.toString()));
        } else {
            setIsSaved(null);
        }
    }, [job, savedJobs, isJobSeeker]);

    // toggle save
    const handleSave = useCallback(() => {
        if (!user) return showMessage("warning", "Please login to save jobs!");
        if (!isJobSeeker) return showMessage("warning", "Only job seekers can save jobs!");
        if (!job || isSaved === null) return;

        if (isSaved) {
            removeSavedJob(job.id.toString());
            setIsSaved(false);
            showMessage("info", "Job removed from saved jobs");
        } else {
            saveJob(job.id.toString());
            setIsSaved(true);
            showMessage("success", "Job saved successfully ✅");
        }
    }, [isSaved, job, isJobSeeker, user, removeSavedJob, saveJob, showMessage]);

    // apply click
    const handleApply = useCallback(async () => {
        if (!user) return showMessage("warning", "Please login to apply!");
        if (!isJobSeeker) return showMessage("warning", "Only job seekers can apply!");
        if (!job) return;

        const alreadyApplied = applications?.some((app) => app.jobId.toString() === job.id.toString());
        if (alreadyApplied) return showMessage("info", "You have already applied to this job!");

        if (job.applyType === ApplyType.EXTERNAL && "applyUrl" in job) {
            window.open(job.applyUrl, "_blank");
        } else {
            setShowApplyModal(true);
        }
    }, [job, user, isJobSeeker, applications, showMessage]);

    // modal submit
    const handleApplyModalSubmit = useCallback(
        async (payload: {
            jobId: string;
            resumeId?: string;
            answers?: { questionId: string | number | bigint; answer: string }[];
        }) => {
            if (!job || !applyToJob) return;

            try {
                const transformedPayload = {
                    ...payload,
                    answers: payload.answers?.map((a) => ({ questionId: BigInt(a.questionId), answer: a.answer })),
                };

                const res = await applyToJob(transformedPayload);

                showMessage("success", "Applied successfully 🎉");
                setShowApplyModal(false);

            } catch {
                showMessage("error", "Failed to apply");
            }
        },
        [job, applyToJob, showMessage]
    );

    const alreadyApplied =
        isJobSeeker && user && job
            ? applications?.some((app) => app.jobId.toString() === job.id.toString())
            : false;

    if (loadingJob) return <Loader />;

    if (!job) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-red-500 text-lg">
                Job not found
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-blue-50 p-6 lg:p-12">
            {/* Save button */}
            {isJobSeeker && isSaved !== null && (
                <button
                    onClick={handleSave}
                    className="z-50 absolute top-0 right-0 w-16 h-16 bg-[#0062FF] flex items-center justify-center
          rounded-b-full shadow-xl hover:bg-blue-700 transition"
                >
                    {isSaved ? <BookmarkCheck size={24} className="text-white" /> : <Bookmark size={24} className="text-white" />}
                </button>
            )}

            {/* Header with Apply button */}
            <JobHeader
                job={job}
                onApply={handleApply}
                alreadyApplied={alreadyApplied}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-1">
                    <CompanyInfo job={job} />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <JobInfo job={job} />
                </div>
            </div>

            {/* Apply modal */}
            {showApplyModal && isJobSeeker && (
                <ApplyJobModal
                    jobDetail={{
                        ...job,
                        questions: (job as { screeningQuestions?: PreScreeningJob[] }).screeningQuestions ?? [],
                    }}
                    onClose={() => setShowApplyModal(false)}
                    onSubmit={handleApplyModalSubmit}
                />
            )}
        </div>
    );
}
