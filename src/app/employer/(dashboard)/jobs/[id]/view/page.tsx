'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useJobById } from '@/features/employer/hooks/useJobById';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import {
    Briefcase,
    Edit2,
    ArrowLeft,
    Share2
} from 'lucide-react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import JobDetailsCard from '@/components/employer-view-jobs/JobDetailsCard';


export default function JobViewPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const {
        job,
        isLoading: isJobLoading,
        isError,
    } = useJobById(id as string);

    if (isJobLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (isError || !job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                <Card className="max-w-md w-full shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-12 text-center">
                        <div className="p-4 bg-red-100 rounded-full inline-block mb-6">
                            <Briefcase className="w-12 h-12 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Job Not Found
                        </h3>
                        <p className="text-gray-600 mb-8">
                            The job you are looking for does not exist or has been deleted.
                        </p>
                        <Button
                            onClick={() => router.push('/employer/jobs')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium"
                        >
                            Back to Jobs
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleEditJob = () => {
        router.push(`/employer/jobs/${id}/edit`);
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleShare = () => {
        // Add share functionality
        navigator.clipboard.writeText(window.location.href);
        // You can add a toast notification here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl mx-auto p-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleGoBack}
                            className="rounded-xl border-2 hover:bg-gray-50 transition-colors p-3"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                                Job Details
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Manage and view your job posting details
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleShare}
                            className="rounded-xl border-2 hover:bg-gray-50 transition-colors px-6 py-3 font-medium flex items-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            Share
                        </Button>
                        <Button
                            size="lg"
                            onClick={handleEditJob}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <Edit2 className="w-5 h-5" />
                            Edit Job
                        </Button>
                    </div>
                </div>

                {/* Job Details Card */}
                <JobDetailsCard job={job} />
            </div>
        </div>
    );
}