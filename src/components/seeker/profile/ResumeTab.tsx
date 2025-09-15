"use client";
import React from "react";
import { useSeekerResume } from "@/features/seeker/hooks/useSeekerResume";

const ResumeTab = () => {
    const { resume, uploadResume, deleteResume, isLoading } = useSeekerResume();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadResume(file);
    };

    const handleDelete = (resumeId: number) => {
        deleteResume(resumeId);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
            {/* Upload Box */}
            <div className="border-2 border-dashed border-gray-400 p-6 rounded text-center">
                <p className="text-gray-600 mb-2">Drag & Drop or Upload Resume</p>
                <input type="file" onChange={handleFileUpload} />
            </div>

            {/* Uploaded Resumes */}
            {resume.length > 0 && (
                <div className="space-y-2">
                    {resume.map((r) => (
                        <div
                            key={r.id}
                            className="flex justify-between items-center p-3 border rounded"
                        >
                            <span className="text-[#0F123F]">{r.fileName}</span>
                            <button
                                className="px-2 py-1 bg-red-500 text-white rounded"
                                onClick={() => handleDelete(r.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumeTab;
