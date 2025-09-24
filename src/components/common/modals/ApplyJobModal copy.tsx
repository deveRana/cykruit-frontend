"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSeekerResume } from "@/features/seeker/profile/hooks/useSeekerResume";
import ResumeSelector from "@/components/jobs/slug/apply-modal/ResumeSelector";
import ScreeningQuestions from "@/components/jobs/slug/apply-modal/ScreeningQuestions";

interface ScreeningQuestion {
    id: string;
    question: string;
    required?: boolean;
}

interface JobDetailForModal {
    id: string | number;
    title: string;
    applyType: "DIRECT" | "PRE_SCREENING" | "EXTERNAL";
    questions?: ScreeningQuestion[];
}

interface ApplyJobModalProps {
    jobDetail: JobDetailForModal;
    onClose: () => void;
    onSubmit: (payload: {
        jobId: string;
        resumeId?: string;
        answers?: { questionId: bigint; answer: string }[];
    }) => void;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ jobDetail, onClose, onSubmit }) => {
    const { resume, uploadResume, isLoading: loadingResume, loader } = useSeekerResume();
    const [resumeId, setResumeId] = useState<string>("");
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [fileUploading, setFileUploading] = useState(false);
    const [step, setStep] = useState<number>(1); // step 1 = resume, step 2 = screening questions

    const hasScreeningQuestions =
        jobDetail.applyType === "PRE_SCREENING" &&
        Array.isArray(jobDetail.questions) &&
        jobDetail.questions.length > 0;

    const handleChangeAnswer = (qid: string, value: string) => {
        setAnswers((prev) => ({ ...prev, [qid]: value }));
    };

    const handleFileChange = async (file: File) => {
        setFileUploading(true);
        await uploadResume(file);
        setFileUploading(false);
    };

    const handleNext = () => {
        // Validate resume selection
        if (!resumeId) {
            alert("Please select a resume before proceeding.");
            return;
        }

        // If screening questions exist, go to step 2
        if (hasScreeningQuestions) {
            setStep(2);
        } else {
            handleSubmit(); // Direct apply
        }
    };

    const handleSubmit = () => {
        // Validate screening questions
        if (hasScreeningQuestions) {
            const missing = (jobDetail.questions ?? []).filter(
                (q) => q.required && !answers[q.id]
            );
            if (missing.length > 0) {
                alert("Please answer all required questions.");
                return;
            }
        }

        onSubmit({
            jobId: jobDetail.id.toString(),
            resumeId: resumeId || undefined,
            answers: hasScreeningQuestions
                ? Object.entries(answers).map(([questionId, answer]) => ({
                    questionId: BigInt(questionId),
                    answer,
                }))
                : undefined,
        });
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg relative flex flex-col gap-4">
                <h2 className="text-lg font-bold text-[#0F123F] mb-2">
                    Apply for {jobDetail.title}
                </h2>

                {step === 1 && (jobDetail.applyType === "DIRECT" || jobDetail.applyType === "PRE_SCREENING") && (
                    <ResumeSelector
                        resume={resume?.map((r) => ({ ...r, id: r.id.toString() }))}
                        resumeId={resumeId}
                        setResumeId={setResumeId}
                        loadingResume={loadingResume}
                        fileUploading={fileUploading}
                        loader={loader}
                        onFileChange={handleFileChange}
                    />
                )}

                {step === 2 && hasScreeningQuestions && (
                    <ScreeningQuestions
                        questions={jobDetail.questions!}
                        answers={answers}
                        onChange={handleChangeAnswer}
                    />
                )}


                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    {step === 1 && hasScreeningQuestions ? (
                        <Button className="bg-[#0F123F] text-white" onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button className="bg-[#0F123F] text-white" onClick={handleSubmit}>
                            Apply
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyJobModal;
