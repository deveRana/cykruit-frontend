"use client";

import React, { useState } from "react";
import { X, Link as LinkIcon, Twitter, Linkedin } from "lucide-react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    jobSlug: string; // pass slug instead of full URL
}

export default function ShareModal({ isOpen, onClose, jobTitle, jobSlug }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    // Build the portal link
    const jobUrl = `${window.location.origin}/jobs/${jobSlug}`;

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(jobUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition"
                >
                    <X size={20} />
                </button>

                <h3 className="text-xl font-bold mb-4 text-gray-900">Share this job</h3>

                <div className="flex flex-col gap-3">
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            `Check out this job at CyberJobs: ${jobTitle} - ${jobUrl}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition transform hover:-translate-y-0.5 shadow-md"
                    >
                        <Twitter size={18} /> Share on Twitter
                    </a>

                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition transform hover:-translate-y-0.5 shadow-md"
                    >
                        <Linkedin size={18} /> Share on LinkedIn
                    </a>

                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition transform hover:-translate-y-0.5 shadow-sm relative"
                    >
                        <LinkIcon size={18} /> Copy Link
                        {copied && (
                            <span className="absolute -top-6 right-0 bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
                                Copied!
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
