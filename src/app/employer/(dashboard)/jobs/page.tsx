"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useEmployerJobs } from "@/features/employer/hooks/useEmployerJobs";
import { JobStatusEnum } from "@/features/employer/types/post-a-job";
import {
    Search,
    Plus,
    Edit3,
    Eye,
    Briefcase,
    CheckCircle2,
    XCircle,
    Pause,
    PencilIcon,
    EyeIcon,
    Archive, // New icon for ARCHIVED status
    Clock,
    Users, // New icon for PENDING status
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/common/loader";
import { format } from "date-fns";

export interface Job {
    id: string;
    title: string;
    employerId: string;
    workMode: string | null;
    employmentType: string | null;
    description: string;
    postedAt: string | null;
    status: JobStatusEnum;
    company?: string; // optional (not in backend response but used in UI)
    slug?: string; // optional (if backend sends slug)
}


// ✅ Define prop type correctly
interface StatusBadgeProps {
    status: JobStatusEnum;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusConfig: Record<
        JobStatusEnum,
        {
            bg: string;
            text: string;
            icon: React.ComponentType<{ className?: string }>;
            label: string;
        }
    > = {
        [JobStatusEnum.ACTIVE]: {
            bg: "bg-emerald-100",
            text: "text-emerald-800",
            icon: CheckCircle2,
            label: "Active",
        },
        [JobStatusEnum.PENDING]: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            icon: Clock,
            label: "Pending",
        },
        [JobStatusEnum.DRAFT]: {
            bg: "bg-gray-100",
            text: "text-gray-800",
            icon: Edit3,
            label: "Draft",
        },
        [JobStatusEnum.EXPIRED]: {
            bg: "bg-red-100",
            text: "text-red-800",
            icon: XCircle,
            label: "Expired",
        },
        [JobStatusEnum.ARCHIVED]: {
            bg: "bg-purple-100",
            text: "text-purple-800",
            icon: Archive,
            label: "Archived",
        },
    };

    const config = statusConfig[status] ?? statusConfig[JobStatusEnum.DRAFT];
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
        >
            <Icon className="w-3.5 h-3.5" />
            {config.label}
        </span>
    );
};

export default function JobsPage() {
    const { jobs = [], isLoading: isJobsLoading } = useEmployerJobs();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredJobs = useMemo(() => {
        return jobs.filter((job: Job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [jobs, searchTerm, statusFilter]);

    const handleCreateJob = () => {
        router.push("/employer/post-job");
    };

    // ✅ Navigate to edit page
    const handleEditJob = (jobId: string) => {
        router.push(`/employer/jobs/${jobId}/edit`);
    };

    // ✅ Navigate to view page
    const handleViewJob = (jobId: string) => {
        router.push(`/employer/jobs/${jobId}/view`);
    };

    // ✅ Navigate to view page
    const handleApplicants = (jobId: string) => {
        router.push(`/employer/jobs/${jobId}/applicants`);
    };

    if (isJobsLoading) {
        return <Loader />;
    }

    return (
        <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">My Jobs</h1>
                    <p className="text-gray-600">Manage and track your job postings</p>
                </div>
                <Button
                    size="lg"
                    onClick={handleCreateJob}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" />
                    Post New Job
                </Button>
            </div>

            {/* Empty state */}
            {!isJobsLoading && jobs.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">
                        You haven't posted any jobs yet. Create your first job to start attracting candidates.
                    </p>
                    <Button
                        onClick={handleCreateJob}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Post Your First Job
                    </Button>
                </div>
            )}

            {/* Jobs Table */}
            {!isJobsLoading && jobs.length > 0 && (
                <>
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                            <option value="all">All Status</option>
                            {Object.values(JobStatusEnum).map((status) => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs match your filters</h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="text-left p-6 text-sm font-semibold text-gray-900">Job Title</th>
                                            {/* <th className="text-left p-6 text-sm font-semibold text-gray-900">Description</th> */}
                                            <th className="text-left p-6 text-sm font-semibold text-gray-900">Work Mode</th>
                                            <th className="text-left p-6 text-sm font-semibold text-gray-900">Type</th>
                                            <th className="text-left p-6 text-sm font-semibold text-gray-900">Status</th>
                                            <th className="text-left p-6 text-sm font-semibold text-gray-900">Posted At</th>
                                            <th className="text-left p-6 text-sm font-semibold text-gray-900">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredJobs.map((job: Job) => (
                                            <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-6">
                                                    <div className="font-semibold text-gray-900 mb-1">{job.title}</div>
                                                    {job.company && (
                                                        <div className="text-sm text-gray-600">{job.company}</div>
                                                    )}
                                                </td>
                                                {/* <td className="p-6">
                                                    <div className="text-sm text-gray-700 max-w-[300px] overflow-hidden text-ellipsis">
                                                        <span>{job.description}</span>
                                                    </div>
                                                </td> */}
                                                <td className="p-6">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs font-normal border-gray-300 text-gray-600 bg-white"
                                                    >
                                                        {job.workMode?.replace("_", " ") || "Not specified"}
                                                    </Badge>
                                                </td>
                                                <td className="p-6">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs font-normal border-gray-300 text-gray-600 bg-white"
                                                    >
                                                        {job.employmentType?.replace("_", " ") || "Not specified"}
                                                    </Badge>
                                                </td>
                                                <td className="p-6">
                                                    <StatusBadge status={job.status} />
                                                </td>
                                                <td className="p-6">
                                                    <div className="text-sm text-gray-700">
                                                        {job.postedAt ? format(new Date(job.postedAt), "MMM d, yyyy") : "N/A"}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleViewJob(job.id)}
                                                            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                                        >
                                                            <EyeIcon className="w-4 h-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleApplicants(job.id)}
                                                            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                                                        >
                                                            <Users className="w-4 h-4" />
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditJob(job.id)}
                                                            className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                                                        >
                                                            <PencilIcon className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
