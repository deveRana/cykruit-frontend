'use client';

import { FileText, ArrowLeft, Plus } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const JobsHeader = () => {
    const router = useRouter();

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
                {/* Left side: Back button + Title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Job Management
                            </h1>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Manage your job listings, track applications, and optimize your hiring process
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side: New Job Button */}
                <button
                    className="text-white px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                    onClick={() => router.push('/claude/employer/post-job')}
                >
                    <Plus className="w-5 h-5" />
                    <span>New Job</span>
                </button>
            </div>
        </div>
    );
};

export default JobsHeader;