"use client";

import React, { useState } from "react";
import { useSeekerResume } from "@/features/seeker/hooks/useSeekerResume";
import { FiPlus, FiTrash2, FiFileText, FiEye } from "react-icons/fi";
import ResumeUploadModal from "./modals/ResumeUploadModal";

const ResumeTab = () => {
    const { resume, loader, uploadResume, deleteResume, isLoading } = useSeekerResume();
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [resumeName, setResumeName] = useState("");

    const handleUpload = () => {
        if (file) {
            const renamedFile = new File([file], resumeName || file.name, {
                type: file.type,
            });
            uploadResume(renamedFile);
            setShowModal(false);
            setFile(null);
            setResumeName("");
        }
    };

    const handleDelete = (resumeId: number) => deleteResume(resumeId);
    const handleView = (url: string) => window.open(url, "_blank");

    if (isLoading)
        return (
            <div className="flex items-center justify-center py-20 text-gray-500">
                {loader || <div>Loading...</div>}
            </div>
        );

    return (
        <div className="space-y-6">
            {/* No Resume */}
            {resume.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl">
                    <p className="text-gray-500 mb-4 text-lg">No resumes uploaded yet.</p>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-[#0F123F] text-white rounded-lg hover:bg-[#1a1a3f] transition"
                        onClick={() => setShowModal(true)}
                    >
                        <FiPlus /> Upload Resume
                    </button>
                </div>
            )}

            {/* Resume List */}
            {resume.map((r) => (
                <div
                    key={r.id}
                    className="border-l-4 border-[#0F123F] bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition flex flex-col gap-2"
                >
                    {/* Resume Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FiFileText size={20} className="text-[#0F123F]" />
                            <span className="text-xl font-bold text-[#0F123F] truncate">
                                {r.fileName}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleView(r.url)}
                                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                            >
                                <FiEye size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(r.id)}
                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Floating Upload Button */}
            <button
                className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-[#0F123F] text-white rounded-full shadow-lg hover:bg-[#1a1a3f] transition text-2xl z-50"
                onClick={() => setShowModal(true)}
            >
                <FiPlus />
            </button>

            {/* Upload Modal */}
            {showModal && (
                <ResumeUploadModal
                    file={file}
                    setFile={setFile}
                    resumeName={resumeName}
                    setResumeName={setResumeName}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleUpload}
                />
            )}
        </div>
    );
};

export default ResumeTab;
