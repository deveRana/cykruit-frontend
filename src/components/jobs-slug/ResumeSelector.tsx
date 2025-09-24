"use client";

import React, { useRef, useState } from "react";

interface Resume {
    id: string;
    name: string;
}

interface ResumeSelectorProps {
    resumes: Resume[];
    selectedResume: string | null;
    onSelect: (resumeName: string) => void;
    onUpload?: (file: File) => void;
}

export default function ResumeSelector({ resumes, selectedResume, onSelect, onUpload }: ResumeSelectorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedResume, setUploadedResume] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUploadedResume(file);
            onUpload?.(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "upload") {
            fileInputRef.current?.click();
        } else {
            setUploadedResume(null); // Clear previous uploaded resume
            onSelect(e.target.value);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block font-semibold text-gray-700">Select Resume</label>
            <div className="relative">
                <select
                    value={uploadedResume ? "upload" : selectedResume || ""}
                    onChange={handleChange}
                    className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-800 font-medium shadow-sm hover:border-[#0062FF] focus:outline-none focus:ring-2 focus:ring-[#0062FF] transition"
                >
                    <option value="" disabled>Select a resume</option>
                    {resumes.map((res) => (
                        <option key={res.id} value={res.name}>
                            {res.name}
                        </option>
                    ))}
                    <option value="upload">Upload New Resume</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Preview uploaded resume */}
            {uploadedResume && (
                <div className="mt-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium flex justify-between items-center">
                    <span>{uploadedResume.name}</span>
                    <button
                        onClick={() => setUploadedResume(null)}
                        className="text-red-500 hover:text-red-700 font-bold"
                    >
                        Remove
                    </button>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx"
            />
        </div>
    );
}
