"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

interface FileUploadAreaProps {
    onFileSelect: (file: File) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileSelect }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) onFileSelect(file);
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                }`}
        >
            <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? "text-blue-600" : "text-gray-400"}`} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isDragging ? "Drop your file here" : "Upload Document"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
                Drag and drop your file here, or click to browse
            </p>
            <label className="inline-block">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                />
                <span className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block">
                    Browse Files
                </span>
            </label>
            <p className="text-xs text-gray-500 mt-4">
                Supported formats: PDF, JPG, PNG (Max 10MB)
            </p>
        </div>
    );
};

export default FileUploadArea;