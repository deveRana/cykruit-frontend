'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useJobById } from '@/features/employer/hooks/useJobById';
import Loader from '@/components/common/Loader';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Briefcase,
    MapPin,
    Calendar,
    Clock,
    Edit2,
    Building2,
    TrendingUp,
    Users,
    ArrowLeft,
    Eye,
    Share2
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

// Enhanced job details card with better visual design
const JobDetailsCard = ({ job }) => (
    <div className="space-y-6">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-2xl relative">
            <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                    <h1 className="text-3xl lg:text-4xl font-bold">{job.title}</h1>
                    <div className="flex items-center gap-2 text-blue-100">
                        <MapPin className="w-4 h-4" />
                        {job.location ? `${job.location.city || ''}, ${job.location.state || ''}, ${job.location.country || ''}` : 'Location not specified'}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{job.role?.name}</span>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{job.role?.category?.title}</span>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{job.contractDurationInMonths ? `${job.contractDurationInMonths} months` : 'Contract N/A'}</span>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{job.applyType.replace('_', ' ')}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${job.status === 'ACTIVE' ? 'bg-emerald-500 border-emerald-400' : 'bg-gray-500 border-gray-400'}`}>
                        {job.status.replace('_', ' ')}
                    </span>
                </div>
            </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Experience</p>
                <p className="font-bold text-gray-900 capitalize">{job.experience.toLowerCase()}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Employment Type</p>
                <p className="font-bold text-gray-900 capitalize">{job.employmentType.replace('_', ' ').toLowerCase()}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Work Mode</p>
                <p className="font-bold text-gray-900 capitalize">{job.workMode.toLowerCase()}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Posted</p>
                <p className="font-bold text-gray-900">{job.postedAt ? format(new Date(job.postedAt), 'MMM d, yyyy') : '-'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="font-bold text-gray-900">{job.applicationsCount || 0}</p>
            </div>
        </div>

        {/* Description */}
        <div>
            <h2 className="text-2xl font-bold mb-2">Job Description</h2>
            <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: job.description }}
            />
        </div>

        {/* Skills & Certifications */}
        <div>
            <h2 className="text-2xl font-bold mb-2">Skills & Certifications</h2>
            <div className="flex flex-wrap gap-2">
                {job.JobSkill?.map((s) => (
                    <span key={s.id} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">{s.skill.name}</span>
                ))}
                {job.jobCertifications?.map((c) => (
                    <span key={c.id} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm">{c.certification.name}</span>
                ))}
            </div>
        </div>

        {/* Counts */}
        <div>
            <h2 className="text-2xl font-bold mb-2">Job Stats</h2>
            <div className="flex flex-wrap gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center flex-1">
                    <p className="font-bold text-gray-900">{job.applicationsCount || 0}</p>
                    <p className="text-gray-600 text-sm">Applications</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg text-center flex-1">
                    <p className="font-bold text-gray-900">{job.shortlistedCount || 0}</p>
                    <p className="text-gray-600 text-sm">Shortlisted</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center flex-1">
                    <p className="font-bold text-gray-900">{job.hiredCount || 0}</p>
                    <p className="text-gray-600 text-sm">Hired</p>
                </div>
            </div>
        </div>
    </div>
);



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