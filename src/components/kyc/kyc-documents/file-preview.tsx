"use client";

import React from "react";
import { FileText, Trash2, CheckCircle, Upload } from "lucide-react";

interface FilePreviewProps {
    file: File;
    preview: string | null;
    onRemove: () => void;
    onReplace: (file: File) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, preview, onRemove, onReplace }) => {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) onReplace(newFile);
    };

    return (
        <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{file.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{formatFileSize(file.size)}</p>
                            <div className="flex items-center mt-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                                <span className="text-xs text-green-600 font-medium">Uploaded successfully</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onRemove} className="text-red-600 hover:text-red-700 transition-colors ml-4">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Image Preview */}
                {preview && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                        <img
                            src={preview}
                            alt="Document preview"
                            className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                        />
                    </div>
                )}
            </div>

            {/* Replace Document */}
            <label className="block">
                <input type="file" onChange={handleReplace} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                <span className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Replace Document
                </span>
            </label>
        </div>
    );
};

export default FilePreview;