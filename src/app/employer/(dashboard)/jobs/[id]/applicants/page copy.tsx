'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useJobById } from '@/features/employer/hooks/useJobById';
import { useJobApplicants } from '@/features/employer/hooks/useJobApplicants';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import {
    Briefcase,
    ArrowLeft,
    Search,
    Download,
    Users,
    Eye,
    CheckCircle2,
    XCircle,
    Clock,
    Star,
} from 'lucide-react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import ApplicantCard from '@/components/applicants/ApplicantCard';
import { Applicant } from '@/features/employer/types/applicants';

export default function JobApplicantsPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    // ✅ Use your applicants hook instead of mock state
    const {
        applicants = [],
        isApplicantsLoading,
    } = useJobApplicants(id as string);

    const {
        job,
        isLoading: isJobLoading,
        isError,
    } = useJobById(id as string);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredApplicants = useMemo(() => {
        return applicants.filter((applicant: Applicant) => {
            const matchesSearch =
                applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [applicants, searchTerm, statusFilter]);

    const handleGoBack = () => {
        router.push('/employer/jobs');
    };

    const handleViewJob = () => {
        router.push(`/employer/jobs/${id}/view`);
    };

    const exportApplicants = () => {
        console.log('Exporting applicants...');
    };

    if (isJobLoading || isApplicantsLoading) {
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

    const statusCounts = {
        total: applicants.length,
        applied: applicants.filter(a => a.status === 'APPLIED').length,
        shortlisted: applicants.filter(a => a.status === 'SHORTLISTED').length,
        rejected: applicants.filter(a => a.status === 'REJECTED').length,
        hired: applicants.filter(a => a.status === 'HIRED').length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl mx-auto p-8 space-y-8">
                {/* ✅ UI stays unchanged */}
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
                                Job Applicants
                            </h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Briefcase className="w-5 h-5" />
                                <span className="font-medium">{job.title}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleViewJob}
                            className="rounded-xl border-2 hover:bg-gray-50 transition-colors px-6 py-3 font-medium flex items-center gap-2"
                        >
                            <Eye className="w-5 h-5" />
                            View Job
                        </Button>
                        <Button
                            size="lg"
                            onClick={exportApplicants}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <Download className="w-5 h-5" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Stats, Filters, Applicants List — no change */}
                {/* ... */}
                {filteredApplicants.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {applicants.length === 0 ? 'No applications yet' : 'No applicants match your filters'}
                        </h3>
                        <p className="text-gray-600">
                            {applicants.length === 0
                                ? 'When candidates apply for this job, you\'ll see them here.'
                                : 'Try adjusting your search or filters to find what you\'re looking for.'}
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">
                                Showing {filteredApplicants.length} of {applicants.length} applicants
                            </p>
                        </div>

                        <div className="space-y-4">
                            {filteredApplicants.map((applicant: Applicant) => (
                                <ApplicantCard key={applicant.id} applicant={applicant} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
