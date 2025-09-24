"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import ResumeSelector from "./ResumeSelector";
import { useMessageModal } from "../common/MessageModal";
import { ApplyType, DetailedJob, PreScreeningJob } from "@/features/jobs/types/jobSlug";
import { useSeekerResume } from "@/features/seeker/profile/hooks/useSeekerResume";

interface ApplyModalProps {
  job: DetailedJob;
  onClose: () => void;
  onSubmit: (payload: {
    jobId: string;
    resumeId?: string;
    answers?: { questionId: bigint; answer: string }[];
  }) => void;
}

export default function ApplyModal({ job, onClose, onSubmit }: ApplyModalProps) {
  const [step, setStep] = useState<"questions" | "resume">(
    job.applyType === ApplyType.PRE_SCREENING ? "questions" : "resume"
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const { showMessage } = useMessageModal();

  // Use hook to fetch user's resumes
  const { resume: resumes, uploadResume, isLoading: loadingResume, loader } = useSeekerResume();
  const [fileUploading, setFileUploading] = useState(false);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleUpload = async (file: File) => {
    setFileUploading(true);
    await uploadResume(file);
    setFileUploading(false);
  };

  const hasScreeningQuestions =
    job.applyType === "PRE_SCREENING" &&
    Array.isArray(job.questions) &&
    job.questions.length > 0;

  const handleSubmit = () => {
    // Validate screening questions
    if (hasScreeningQuestions) {
      const missing = (job.questions ?? []).filter(
        (q) => q.required && !answers[q.id]
      );
      if (missing.length > 0) {
        alert("Please answer all required questions.");
        return;
      }
    }

    onSubmit({
      jobId: job.id.toString(),
      resumeId: selectedResume || undefined, // ✅ use selectedResume here
      answers: hasScreeningQuestions
        ? Object.entries(answers).map(([questionId, answer]) => ({
          questionId: BigInt(questionId),
          answer,
        }))
        : undefined,
    });
  };

  const allQuestionsAnswered =
    job.applyType === ApplyType.PRE_SCREENING
      ? (job as PreScreeningJob).questions.every(
        (q) => answers[q.id] && answers[q.id].trim() !== ""
      )
      : true;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Apply for {job.title}
        </h2>

        {/* Pre-screening questions */}
        {job.applyType === ApplyType.PRE_SCREENING && step === "questions" && (
          <div className="space-y-4">
            {(job as PreScreeningJob).questions.map((q) => (
              <div key={q.id}>
                <label className="block font-medium text-gray-700">{q.question}</label>
                <input
                  type="text"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0062FF]"
                />
              </div>
            ))}

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setStep("resume")}
                disabled={!allQuestionsAnswered}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition
                  ${allQuestionsAnswered
                    ? "bg-[#0062FF] text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Next
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Resume selector */}
        {step === "resume" && (
          <div className="space-y-4">
            <ResumeSelector
              resume={resumes?.map((r) => ({ ...r, id: r.id.toString() }))}
              resumeId={selectedResume || ""}
              setResumeId={setSelectedResume}
              loadingResume={loadingResume}
              fileUploading={fileUploading}
              loader={loader}
              onFileChange={handleUpload}
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSubmit}
                disabled={!selectedResume}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition
                  ${selectedResume
                    ? "bg-[#0062FF] text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Apply
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
