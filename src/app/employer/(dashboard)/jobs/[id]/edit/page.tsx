'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useJobById } from '@/features/employer/hooks/useJobById';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase } from 'lucide-react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import PostJobForm from '../../../post-job/PostJobForm';

export default function EditJobPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const {
        job,
        isLoading: isJobLoading,
        isError,
    } = useJobById(id as string);

    // Show loading state
    if (isJobLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader />
                    <p className="text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (isError || !job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-8">
                <Card className="max-w-md w-full shadow-2xl rounded-2xl overflow-hidden">
                    <CardContent className="p-12 text-center">
                        <div className="p-4 bg-red-100 rounded-full inline-block mb-6">
                            <Briefcase className="w-12 h-12 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Job Not Found
                        </h3>
                        <p className="text-gray-600 mb-8">
                            The job you are trying to edit does not exist or has been deleted.
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

    const handleGoBack = () => {
        router.back();
    };

    const handleSuccess = () => {
        // Redirect to jobs list or job view page after successful update
        router.push('/employer/jobs');
    };

    // Transform job data to match form structure
    const formDefaultValues = {
        id: job.id,
        title: job.title || '',
        // use role object instead of roleId
        role: job.role
            ? { id: String(job.role.id), name: job.role.name }
            : null,
        workMode: job.workMode,
        locationId: job.location?.id ? String(job.location.id) : '',
        employmentType: job.employmentType,
        contractDurationInMonths: job.contractDurationInMonths,
        experience: job.experience,
        status: job.status,
        description: job.description || '',
        applyType: job.applyType,
        applyUrl: job.applyUrl || '',
        skills: job.JobSkill?.map(js => String(js.skillId)) || [],
        certifications: job.jobCertifications?.map(jc => String(jc.certificationId)) || [],
        screeningQuestions: job.screeningQuestions || [],
    };


    return (
        <div className="space-y-10 max-w-6xl mx-auto p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold text-gray-900">
                                Edit Job Posting
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Update your job posting details to attract the right candidates
                        </p>

                        {/* Job Info Badge */}
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                            <span className="text-sm text-gray-600">Editing:</span>
                            <span className="font-semibold text-gray-900">{job.title}</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span className="text-sm text-gray-600">ID: {job.id}</span>
                        </div>
                    </div>
                </div>

                {/* Form Section - Reuse the enhanced PostJobForm */}
                <PostJobForm
                    defaultValues={formDefaultValues}
                    onSuccess={handleSuccess}
                    isEdit={true}
                />
            </div>
        </div>
    );
}