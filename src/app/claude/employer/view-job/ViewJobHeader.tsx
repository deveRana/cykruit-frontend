'use client';

import { Briefcase, Edit, ArrowLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const ViewJobHeader = () => {
    const router = useRouter();

    return (
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 py-6 transition-all duration-300">
            <div className="flex items-center justify-between">
                {/* Left side: Back button + Title */}
                <div className="flex items-center space-x-4">
                    {/* Back button with tooltip */}
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-800" />
                    </button>

                    {/* Title + description */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center space-x-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                                style={{
                                    background: 'linear-gradient(to bottom right, #0062FF, #0052CC)',
                                }}
                            >
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <span>View Job</span>
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Stay on top of job details and application activity
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ViewJobHeader;
