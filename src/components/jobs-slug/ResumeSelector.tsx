"use client";

import React from "react";
import { cn } from "@/lib/utils/utils";

interface Resume {
    id: string;
    fileName: string;
}

interface ResumeSelectorProps {
    resume: Resume[];
    resumeId: string;
    setResumeId: (id: string) => void;
    loadingResume: boolean;
    fileUploading: boolean;
    loader?: React.ReactNode;
    onFileChange: (file: File) => void;
}

const ResumeSelector: React.FC<ResumeSelectorProps> = ({
    resume,
    resumeId,
    setResumeId,
    loadingResume,
    fileUploading,
    loader,
    onFileChange,
}) => {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            await onFileChange(file);

            // Reset the file input so "Choose file" shows again
            e.target.value = "";

            // Optionally, select the newly uploaded resume automatically
            // const newResumeId = file.id || `resume-${Date.now()}`;
            // setResumeId(newResumeId);
        }
    };

    const isLoading = loadingResume || fileUploading;

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Select Resume</label>

            {isLoading ? (
                <div className="flex items-center gap-2 text-gray-500">
                    <span>{loader || "Loading..."}</span>
                </div>
            ) : resume.length > 0 ? (
                <select
                    value={resumeId}
                    onChange={(e) => setResumeId(e.target.value)}
                    className={cn(
                        "w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition"
                    )}
                >
                    <option value="">Select Resume</option>
                    {resume.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.fileName}
                        </option>
                    ))}
                </select>
            ) : (
                <p className="text-sm text-gray-500">No resumes found. Upload one below:</p>
            )}

            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="mt-2"
            />
        </div>
    );
};

export default ResumeSelector;
