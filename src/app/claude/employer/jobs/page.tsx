"use client";

import React, { useState } from 'react';
import {
    Search, Plus, Eye, Edit, Trash2, Users, MapPin, DollarSign, Clock,
    Calendar, Building2, MoreHorizontal, AlertCircle, CheckCircle,
    XCircle, FileText, Filter
} from 'lucide-react';
import JobsHeader from './JobsHeader';
import { useRouter } from 'next/navigation';

const EmployerJobManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const router = useRouter();

    // Mock job data for employer
    const employerJobs = [
        {
            id: 1,
            title: 'Senior Cybersecurity Analyst',
            location: 'New York, NY',
            jobType: 'Full-time',
            workMode: 'Hybrid',
            salary: { min: 95000, max: 120000 },
            postedDate: '2024-01-20',
            deadline: '2024-02-15',
            status: 'active',
            applicants: 45,
            views: 234,
            description: 'We are seeking an experienced cybersecurity analyst to join our security operations team. You will be responsible for monitoring, detecting, and responding to security threats across our enterprise infrastructure. This role involves working with cutting-edge security tools and collaborating with cross-functional teams to strengthen our security posture.',
            requirements: [
                'Bachelor\'s degree in Computer Science, Information Security, or related field',
                'Minimum 5 years of experience in cybersecurity or related field',
                'CISSP, CISM, or equivalent certification preferred',
                'Experience with SIEM tools (Splunk, QRadar, ArcSight)',
                'Strong knowledge of network security protocols and technologies',
                'Experience with incident response and forensic analysis'
            ],
            responsibilities: [
                'Monitor security events and alerts using SIEM platforms',
                'Conduct threat analysis and vulnerability assessments',
                'Respond to security incidents and coordinate remediation efforts',
                'Develop and maintain security policies and procedures',
                'Collaborate with IT teams on security architecture decisions',
                'Prepare security reports and metrics for management'
            ]
        },
        {
            id: 2,
            title: 'SOC Engineer L2',
            location: 'Austin, TX',
            jobType: 'Full-time',
            workMode: 'On-site',
            salary: { min: 75000, max: 95000 },
            postedDate: '2024-01-15',
            deadline: '2024-02-20',
            status: 'active',
            applicants: 32,
            views: 187,
            description: 'Join our 24/7 Security Operations Center as an L2 SOC Engineer. Monitor security events, investigate incidents, and coordinate response efforts with our experienced security team.',
            requirements: [
                '3+ years of SOC or security operations experience',
                'CompTIA Security+ certification required',
                'Experience with log analysis and correlation',
                'Knowledge of network protocols and security technologies',
                'Strong analytical and problem-solving skills'
            ],
            responsibilities: [
                'Monitor and analyze security alerts from multiple sources',
                'Perform initial triage and investigation of security events',
                'Escalate critical incidents to senior analysts',
                'Document findings and maintain case records',
                'Assist with security tool tuning and optimization'
            ]
        },
        {
            id: 3,
            title: 'Penetration Tester',
            location: 'Remote',
            jobType: 'Contract',
            workMode: 'Remote',
            salary: { min: 85000, max: 110000 },
            postedDate: '2024-01-18',
            deadline: '2024-02-18',
            status: 'draft',
            applicants: 0,
            views: 0,
            description: 'Looking for an ethical hacker to conduct penetration testing and vulnerability assessments for our clients across various industries.',
            requirements: [
                'CEH, OSCP, or equivalent certification',
                '4+ years of penetration testing experience',
                'Web application security testing expertise',
                'Network penetration testing skills',
                'Strong report writing abilities'
            ],
            responsibilities: [
                'Conduct network and web application penetration tests',
                'Identify and exploit security vulnerabilities',
                'Prepare detailed technical reports',
                'Present findings to client stakeholders',
                'Provide remediation recommendations'
            ]
        },
        {
            id: 4,
            title: 'Cloud Security Architect',
            location: 'San Francisco, CA',
            jobType: 'Full-time',
            workMode: 'Hybrid',
            salary: { min: 140000, max: 180000 },
            postedDate: '2024-01-12',
            deadline: '2024-02-25',
            status: 'paused',
            applicants: 28,
            views: 156,
            description: 'Design and implement security architecture for cloud-native applications and infrastructure. Lead security initiatives across AWS, Azure, and GCP platforms.',
            requirements: [
                '7+ years of cloud security experience',
                'AWS Solutions Architect or equivalent certification',
                'DevSecOps and CI/CD pipeline experience',
                'Container security (Kubernetes, Docker)',
                'Infrastructure as Code (Terraform, CloudFormation)'
            ],
            responsibilities: [
                'Design secure cloud architectures',
                'Implement security controls in cloud environments',
                'Review and approve cloud deployments',
                'Develop security automation tools',
                'Mentor junior security engineers'
            ]
        },
        {
            id: 5,
            title: 'Information Security Specialist',
            location: 'Washington, DC',
            jobType: 'Full-time',
            workMode: 'On-site',
            salary: { min: 90000, max: 115000 },
            postedDate: '2024-01-25',
            deadline: '2024-03-01',
            status: 'closed',
            applicants: 67,
            views: 289,
            description: 'Support federal government cybersecurity initiatives. Conduct security assessments, maintain compliance, and develop security policies.',
            requirements: [
                'Active security clearance required',
                '5+ years of federal cybersecurity experience',
                'NIST Cybersecurity Framework knowledge',
                'Risk management and compliance experience',
                'Strong documentation and communication skills'
            ],
            responsibilities: [
                'Conduct security risk assessments',
                'Ensure compliance with federal regulations',
                'Develop and update security policies',
                'Support security audit activities',
                'Provide security training and awareness'
            ]
        }

    ];

    const statusOptions = ['all', 'active', 'draft', 'paused', 'closed'];

    const filteredJobs = employerJobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
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

    const getStatusIcon = (status) => {
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

    const handleDelete = (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            // Handle delete logic here
            console.log('Deleting job:', jobId);
        }
    };


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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                    style={{
                                        '&:focus': {
                                            ringColor: '#0062FF'
                                        }
                                    }}
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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>
                                            {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Stats - Moved Above Job Listings */}
                {filteredJobs.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center p-4 bg-blue-50 rounded-xl">
                                <div className="text-2xl font-bold text-blue-600" style={{ color: '#0062FF' }}>
                                    {filteredJobs.length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total Jobs</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-xl">
                                <div className="text-2xl font-bold text-green-600">
                                    {filteredJobs.filter(job => job.status === 'active').length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Active Jobs</div>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded-xl">
                                <div className="text-2xl font-bold text-orange-600">
                                    {filteredJobs.reduce((sum, job) => sum + job.applicants, 0)}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Total Applicants</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded-xl">
                                <div className="text-2xl font-bold text-purple-600">
                                    {filteredJobs.reduce((sum, job) => sum + job.views, 0)}
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
                            <p className="text-gray-600">Try adjusting your search or create your first job posting</p>
                        </div>
                    ) : (
                        filteredJobs.map(job => (
                            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-4 mb-3">
                                            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                            <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                                                {getStatusIcon(job.status)}
                                                <span>{job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{job.location}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <DollarSign className="w-4 h-4 mr-2" />
                                                <span className="text-sm font-semibold">
                                                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span className="text-sm">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users className="w-4 h-4 mr-2" />
                                                <span className="text-sm">{job.applicants} applicants</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>Views: {job.views}</span>
                                            <span>•</span>
                                            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>{job.jobType} • {job.workMode}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2 ml-6">
                                        {/* View Full Job - Tooltip Trigger */}
                                        <div className="relative">
                                            <button
                                                onClick={() => router.push('/claude/employer/view-job')}
                                                className="p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                title="View full job details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>

                                        </div>

                                        {/* View Applicants */}
                                        <button
                                            onClick={() => router.push('/claude/employer/applicants')}
                                            className="p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                            title="View applicants"
                                        >
                                            <Users className="w-5 h-5" />
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() => router.push('/claude/employer/edit-job')}
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
                                    disabled={true} // For demo - would be dynamic
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="flex items-center space-x-1">
                                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg font-medium" style={{ backgroundColor: '#0062FF' }}>
                                        1
                                    </button>
                                    <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        2
                                    </button>
                                    <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        3
                                    </button>
                                    <span className="px-2 text-gray-400">...</span>
                                    <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        10
                                    </button>
                                </div>

                                <button
                                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
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