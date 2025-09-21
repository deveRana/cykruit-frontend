"use client";

import React, { useState } from "react";
import { useUploadAndParseResume } from "@/features/seeker/profile/hooks/useUploadAndParseResume";

const ResumeParseAndUpload: React.FC = () => {
    const { uploadResume, isUploading, loader, data, error } = useUploadAndParseResume();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (!selectedFile) return;
        uploadResume(selectedFile);
    };

    // Show parsed data once available
    React.useEffect(() => {
        if (data) {
            setParsedData(data.parsedData);
        }
    }, [data]);

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
            <h3 className="text-lg font-semibold">Upload & Parse Resume</h3>

            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="border border-gray-300 rounded p-1 w-full"
            />

            <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`px-4 py-2 rounded text-white ${isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
            >
                {isUploading ? "Uploading..." : "Upload & Parse"}
            </button>

            {loader}

            {error && <p className="text-red-500">Error uploading resume</p>}

            {parsedData && (
                <div className="bg-white p-2 rounded border border-gray-200 mt-2">
                    <h4 className="font-medium">Parsed Resume Data:</h4>
                    <pre className="text-sm">{JSON.stringify(parsedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ResumeParseAndUpload;
