"use client";

import React, { useState } from 'react';
import {
    Search, Eye, Edit, Trash2, Users, MapPin, Clock,
    Calendar, AlertCircle, CheckCircle, XCircle, FileText,
    Filter, Briefcase
} from 'lucide-react';
import JobsHeader from './JobsHeader';
import { useRouter } from 'next/navigation';
import { useEmployerJobs } from '@/features/employer/hooks/useEmployerJobs';

// Define the Job type based on API response
interface Job {
    id: string;
    title: string;
    location: string;
    jobType: string;
    workMode: string;
    postedDate: string;
    deadline: string;
    status: string;
    applicants: number;
    views: number;
    slug: string;
}

const EmployerJobManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const router = useRouter();

    // Fetch jobs using the hook
    const { jobs, isLoading } = useEmployerJobs();

    const statusOptions: string[] = ['all', 'active', 'draft', 'paused', 'closed'];

    // Filter jobs based on search and status
    const filteredJobs = (jobs as Job[]).filter((job: Job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    // Format employment type for display
    const formatJobType = (type: string): string => {
        const typeMap: Record<string, string> = {
            'FULL_TIME': 'Full-time',
            'PART_TIME': 'Part-time',
            'CONTRACT': 'Contract',
            'INTERNSHIP': 'Internship'
        };
        return typeMap[type] || type;
    };

    // Format work mode for display
    const formatWorkMode = (mode: string): string => {
        const modeMap: Record<string, string> = {
            'ONSITE': 'On-site',
            'REMOTE': 'Remote',
            'HYBRID': 'Hybrid'
        };
        return modeMap[mode] || mode;
    };

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            case 'paused':
                return 'bg-yellow-100 text-yellow-800';
            case 'closed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string): React.ReactElement => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-4 h-4" />;
            case 'draft':
                return <FileText className="w-4 h-4" />;
            case 'paused':
                return <AlertCircle className="w-4 h-4" />;
            case 'closed':
                return <XCircle className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const handleDelete = (jobId: string): void => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            console.log('Deleting job:', jobId);
            // TODO: Implement delete mutation
        }
    };

    if (isLoading) {
        return (
            <>
                <JobsHeader />
                <main className="p-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading jobs...</p>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <JobsHeader />
            <main className="p-8">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by job title..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="sm:w-48">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    {statusOptions.map((status: string) => (
                                        <option key={status} value={status}>
                                            {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                {filteredJobs.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <div className="text-2xl font-bold text-blue-600">
                                    {filteredJobs.length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total Jobs</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-xl">
                                <div className="text-2xl font-bold text-green-600">
                                    {filteredJobs.filter((job: Job) => job.status === 'active').length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Active Jobs</div>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-xl">
                                <div className="text-2xl font-bold text-orange-600">
                                    {filteredJobs.reduce((sum: number, job: Job) => sum + job.applicants, 0)}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total Applicants</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-xl">
                                <div className="text-2xl font-bold text-purple-600">
                                    {filteredJobs.reduce((sum: number, job: Job) => sum + job.views, 0)}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total Views</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Job Listings */}
                <div className="space-y-4 mb-8">
                    {filteredJobs.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-600">
                                {jobs.length === 0
                                    ? "You haven't created any jobs yet"
                                    : "Try adjusting your search or filter"}
                            </p>
                        </div>
                    ) : (
                        filteredJobs.map((job: Job) => (
                            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-3">
                                            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                            <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                                                {getStatusIcon(job.status)}
                                                <span>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                                <span className="text-sm">{job.location}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                                                <span className="text-sm">{formatJobType(job.jobType)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                                                <span className="text-sm">{formatWorkMode(job.workMode)}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                                            </div>
                                            <span>•</span>
                                            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <div className="flex items-center">
                                                <Users className="w-4 h-4 mr-1" />
                                                <span>{job.applicants} applicants</span>
                                            </div>
                                            <span>•</span>
                                            <span>{job.views} views</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-6">
                                        {/* View Full Job */}
                                        <button
                                            onClick={() => router.push(`/claude/employer/jobs/${job.id}/view`)}
                                            className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="View full job details"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>

                                        {/* View Applicants */}
                                        <button
                                            onClick={() => router.push(`/claude/employer/jobs/${job.id}/applicants`)}
                                            className="p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                            title="View applicants"
                                        >
                                            <Users className="w-5 h-5" />
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() => router.push(`/claude/employer/jobs/${job.id}/edit`)}
                                            className="p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                            title="Edit job"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(job.id)}
                                            className="p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Delete job"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-semibold">1-{Math.min(10, filteredJobs.length)}</span> of <span className="font-semibold">{filteredJobs.length}</span> jobs
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={true}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="flex items-center space-x-1">
                                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium">
                                        1
                                    </button>
                                </div>

                                <button
                                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={true}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default EmployerJobManagement;