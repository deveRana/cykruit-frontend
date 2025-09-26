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

// Types based on your backend response
interface Applicant {
    id: string;
    fullName: string;
    email: string;
    skills: any[];
    resumes: Array<{
        url: string;
        fileName: string;
    }>;
    appliedAt: string;
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
}



export default function JobApplicantsPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    // For now, we'll use mock data since you haven't shared the hook for fetching applicants
    // You'll need to create a hook like useJobApplicants(id) that fetches from your API

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
        return applicants.filter((applicant) => {
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
        // Export functionality - could be CSV, PDF etc.
        console.log('Exporting applicants...');
    };

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
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
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

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                        <CardContent className="p-4 text-center">
                            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-900">{statusCounts.total}</p>
                            <p className="text-sm text-blue-700">Total</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
                        <CardContent className="p-4 text-center">
                            <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.applied}</p>
                            <p className="text-sm text-gray-700">Applied</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
                        <CardContent className="p-4 text-center">
                            <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-yellow-900">{statusCounts.shortlisted}</p>
                            <p className="text-sm text-yellow-700">Shortlisted</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
                        <CardContent className="p-4 text-center">
                            <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-red-900">{statusCounts.rejected}</p>
                            <p className="text-sm text-red-700">Rejected</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                        <CardContent className="p-4 text-center">
                            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-900">{statusCounts.hired}</p>
                            <p className="text-sm text-green-700">Hired</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search applicants by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm min-w-[150px]"
                    >
                        <option value="all">All Status</option>
                        <option value="APPLIED">Applied</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="HIRED">Hired</option>
                    </select>
                </div>

                {/* Applicants List */}
                {filteredApplicants.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {applicants.length === 0 ? 'No applications yet' : 'No applicants match your filters'}
                        </h3>
                        <p className="text-gray-600">
                            {applicants.length === 0
                                ? 'When candidates apply for this job, you\'ll see them here.'
                                : 'Try adjusting your search or filters to find what you\'re looking for.'
                            }
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
                            {filteredApplicants.map((applicant) => (
                                <ApplicantCard key={applicant.id} applicant={applicant} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}