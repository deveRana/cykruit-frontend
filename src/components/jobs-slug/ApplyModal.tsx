"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import ResumeSelector from "./ResumeSelector";
import { useMessageModal } from "../common/MessageModal";
import { ApplyType, BaseJob, DetailedJob, PreScreeningJob } from "@/features/jobs/types/jobSlug";

interface ApplyModalProps {
  job: DetailedJob;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [step, setStep] = useState<"questions" | "resume">(
    job.applyType === ApplyType.PRE_SCREENING ? "questions" : "resume"
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const { showMessage } = useMessageModal();

  const [uploadedResumes, setUploadedResumes] = useState<{ id: string; name: string }[]>([
    { id: "resume1", name: "John_Doe_Resume.pdf" },
    { id: "resume2", name: "Jane_Doe_Resume.pdf" },
  ]);

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [idx]: value }));
  };

  const handleUpload = (file: File) => {
    const newResume = { id: `resume-${Date.now()}`, name: file.name };
    setUploadedResumes((prev) => [...prev, newResume]);
    setSelectedResume(file.name);
  };

  const handleApply = () => {
    if (selectedResume) {
      showMessage("success", `Successfully applied for ${job.title} with ${selectedResume} ✅`);
      onClose();
    }
  };

  // Check if all pre-screening questions are answered
  const allQuestionsAnswered =
    job.applyType === ApplyType.PRE_SCREENING
      ? (job as PreScreeningJob).questions.every(
        (_, idx) => answers[idx] && answers[idx].trim() !== ""
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

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Apply for {job.title}
        </h2>

        {/* Step 1: Pre-Screening Questions */}
        {job.applyType === ApplyType.PRE_SCREENING && step === "questions" && (
          <div className="space-y-4">
            {(job as PreScreeningJob).questions.map((q, idx) => (
              <div key={q.id}>
                <label className="block font-medium text-gray-700">{q.question}</label>
                <input
                  type="text"
                  value={answers[idx] || ""}
                  onChange={(e) => handleAnswerChange(idx, e.target.value)}
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

        {/* Step 2: Resume Selector */}
        {step === "resume" && (
          <div className="space-y-4">
            <ResumeSelector
              resumes={uploadedResumes}
              selectedResume={selectedResume}
              onSelect={setSelectedResume}
              onUpload={handleUpload}
            />

            {/* Buttons Row */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleApply}
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
