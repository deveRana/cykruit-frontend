'use client';

import { FileText, Plus } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const JobsHeader = () => {

    const router = useRouter();

    return (
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 transition-all duration-300">
            <div className="flex justify-between items-center">
                {/* Page Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center space-x-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                            style={{
                                background: 'linear-gradient(to bottom right, #0062FF, #0052CC)',
                            }}
                        >
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span>Job Management</span>
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Manage your job listings, track applications, and optimize your hiring process
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-6">
                    {/* New Job Button */}
                    <button
                        className="text-white px-6 py-3.5 rounded-2xl transition-all duration-200 flex items-center space-x-2 shadow-lg"
                        style={{
                            background: 'linear-gradient(to right, #0062FF, #0052CC)',
                            boxShadow: '0 10px 25px rgba(0, 98, 255, 0.2)',
                        }}
                        onClick={() => router.push('/claude/employer/post-job')}

                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">New Job</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobsHeader;
