"use client";

import React, { useState } from 'react';
import {
    Search, Filter, Download, Mail, Phone, MapPin, Calendar, Star,
    Eye, MessageCircle, CheckCircle, XCircle, Clock, User, FileText,
    Briefcase, GraduationCap, Award, ExternalLink, MoreHorizontal
} from 'lucide-react';
import ApplicantsHeader from './ApplicantsHeader';

const ApplicantsManagement = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [showApplicantDetails, setShowApplicantDetails] = useState(null);

    // Current job data (would come from props or URL params in real app)
    const currentJob = {
        id: 1,
        title: 'Senior Cybersecurity Analyst',
        location: 'New York, NY',
        postedDate: '2024-01-20',
        totalApplicants: 6
    };

    // Mock applicants data
    const applicants = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            location: 'New York, NY',
            jobId: 1,
            jobTitle: 'Senior Cybersecurity Analyst',
            appliedDate: '2024-01-22',
            status: 'under_review',
            experience: '6+ years',
            currentRole: 'Security Analyst at TechCorp',
            rating: 4.8,
            resume: 'sarah_johnson_resume.pdf',
            coverLetter: 'I am excited to apply for the Senior Cybersecurity Analyst position...',
            skills: ['CISSP', 'SIEM', 'Incident Response', 'Python', 'Network Security'],
            education: 'Master\'s in Cybersecurity, NYU',
            certifications: ['CISSP', 'CISM', 'CompTIA Security+'],
            linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
            portfolioUrl: 'https://sarahjohnson.dev',
            salary_expectation: '$110,000 - $130,000',
            availability: 'Available immediately',
            notes: []
        },
        {
            id: 2,
            name: 'Michael Chen',
            email: 'michael.chen@email.com',
            phone: '+1 (555) 234-5678',
            location: 'San Francisco, CA',
            jobId: 2,
            jobTitle: 'SOC Engineer L2',
            appliedDate: '2024-01-20',
            status: 'shortlisted',
            experience: '4+ years',
            currentRole: 'SOC Analyst L1 at CyberDefense Inc',
            rating: 4.5,
            resume: 'michael_chen_resume.pdf',
            coverLetter: 'With 4 years of SOC experience, I am well-prepared...',
            skills: ['Splunk', 'QRadar', 'Threat Hunting', 'Malware Analysis', 'SOAR'],
            education: 'Bachelor\'s in Computer Science, UC Berkeley',
            certifications: ['CompTIA Security+', 'GCIH', 'CompTIA CySA+'],
            linkedinUrl: 'https://linkedin.com/in/michaelchen',
            portfolioUrl: null,
            salary_expectation: '$85,000 - $95,000',
            availability: '2 weeks notice required',
            notes: ['Strong technical background', 'Good communication skills']
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@email.com',
            phone: '+1 (555) 345-6789',
            location: 'Austin, TX',
            jobId: 3,
            jobTitle: 'Penetration Tester',
            appliedDate: '2024-01-19',
            status: 'interview_scheduled',
            experience: '5+ years',
            currentRole: 'Senior Penetration Tester at SecureIT',
            rating: 4.9,
            resume: 'emily_rodriguez_resume.pdf',
            coverLetter: 'As a certified ethical hacker with extensive experience...',
            skills: ['OSCP', 'Burp Suite', 'Metasploit', 'Web App Security', 'Network Pentesting'],
            education: 'Bachelor\'s in Information Security, UT Austin',
            certifications: ['OSCP', 'CEH', 'GPEN', 'GWAPT'],
            linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
            portfolioUrl: 'https://emilyrodriguez-security.com',
            salary_expectation: '$105,000 - $125,000',
            availability: 'Available in 3 weeks',
            notes: ['Excellent pentesting skills', 'Strong portfolio']
        },
        {
            id: 4,
            name: 'David Wilson',
            email: 'david.wilson@email.com',
            phone: '+1 (555) 456-7890',
            location: 'Remote (Chicago, IL)',
            jobId: 4,
            jobTitle: 'Cloud Security Architect',
            appliedDate: '2024-01-18',
            status: 'new',
            experience: '8+ years',
            currentRole: 'Cloud Security Engineer at CloudTech Solutions',
            rating: 4.7,
            resume: 'david_wilson_resume.pdf',
            coverLetter: 'I bring 8 years of cloud security expertise...',
            skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'DevSecOps'],
            education: 'Master\'s in Computer Engineering, Northwestern',
            certifications: ['AWS Solutions Architect', 'Azure Security Engineer', 'CCSP'],
            linkedinUrl: 'https://linkedin.com/in/davidwilson',
            portfolioUrl: 'https://davidwilson-cloud.tech',
            salary_expectation: '$150,000 - $170,000',
            availability: '1 month notice required',
            notes: []
        },
        {
            id: 5,
            name: 'Jessica Liu',
            email: 'jessica.liu@email.com',
            phone: '+1 (555) 567-8901',
            location: 'Washington, DC',
            jobId: 5,
            jobTitle: 'Information Security Specialist',
            appliedDate: '2024-01-25',
            status: 'rejected',
            experience: '3+ years',
            currentRole: 'Junior Security Analyst at GovTech',
            rating: 3.8,
            resume: 'jessica_liu_resume.pdf',
            coverLetter: 'I am interested in advancing my career in federal cybersecurity...',
            skills: ['NIST Framework', 'Risk Assessment', 'Compliance', 'FISMA', 'Security Controls'],
            education: 'Bachelor\'s in Information Systems, George Washington University',
            certifications: ['CompTIA Security+', 'CISSP Associate'],
            linkedinUrl: 'https://linkedin.com/in/jessicaliu',
            portfolioUrl: null,
            salary_expectation: '$75,000 - $85,000',
            availability: 'Available immediately',
            notes: ['Needs more experience for this role']
        },
        {
            id: 6,
            name: 'Alex Kumar',
            email: 'alex.kumar@email.com',
            phone: '+1 (555) 678-9012',
            location: 'Seattle, WA',
            jobId: 1,
            jobTitle: 'Senior Cybersecurity Analyst',
            appliedDate: '2024-01-23',
            status: 'hired',
            experience: '7+ years',
            currentRole: 'Senior Security Consultant at InfoSec Partners',
            rating: 4.9,
            resume: 'alex_kumar_resume.pdf',
            coverLetter: 'With extensive experience in enterprise security...',
            skills: ['CISSP', 'Threat Intelligence', 'SIEM', 'IR', 'Security Architecture'],
            education: 'Master\'s in Cybersecurity, University of Washington',
            certifications: ['CISSP', 'GCTI', 'GCIH', 'CISCP'],
            linkedinUrl: 'https://linkedin.com/in/alexkumar',
            portfolioUrl: 'https://alexkumar-security.com',
            salary_expectation: '$125,000 - $145,000',
            availability: 'Started on Feb 1, 2024',
            notes: ['Excellent candidate', 'Strong cultural fit', 'Hired!']
        }
    ];

    const statusOptions = ['all', 'new', 'under_review', 'shortlisted', 'interview_scheduled', 'rejected', 'hired'];

    const filteredApplicants = applicants.filter(applicant => {
        // Only show applicants for the current job
        const matchesJob = applicant.jobId === currentJob.id;
        const matchesSearch =
            applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || applicant.status === selectedStatus;
        return matchesJob && matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'new':
                return 'bg-blue-100 text-blue-800';
            case 'under_review':
                return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted':
                return 'bg-purple-100 text-purple-800';
            case 'interview_scheduled':
                return 'bg-indigo-100 text-indigo-800';
            case 'hired':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'new':
                return <FileText className="w-4 h-4" />;
            case 'under_review':
                return <Clock className="w-4 h-4" />;
            case 'shortlisted':
                return <Star className="w-4 h-4" />;
            case 'interview_scheduled':
                return <Calendar className="w-4 h-4" />;
            case 'hired':
                return <CheckCircle className="w-4 h-4" />;
            case 'rejected':
                return <XCircle className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const handleStatusChange = (applicantId, newStatus) => {
        console.log(`Changing status for applicant ${applicantId} to ${newStatus}`);
        // Handle status update logic here
    };


    return (
        <>
            <ApplicantsHeader />
            <main className="p-8">
                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search applicants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>
                                        {status === 'all' ? 'All Status' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                {filteredApplicants.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Overview</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                            {statusOptions.slice(1).map(status => (
                                <div key={status} className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="text-xl font-bold text-gray-800">
                                        {filteredApplicants.filter(a => a.status === status).length}
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium capitalize">
                                        {status.replace('_', ' ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Applicants List */}
                <div className="space-y-4 mb-8">
                    {filteredApplicants.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No applicants found</h3>
                            <p className="text-gray-600">Try adjusting your search filters</p>
                        </div>
                    ) : (
                        filteredApplicants.map(applicant => (
                            <div key={applicant.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">
                                                {applicant.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>

                                        {/* Applicant Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-bold text-gray-900">{applicant.name}</h3>
                                                <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                                                    {getStatusIcon(applicant.status)}
                                                    <span>{applicant.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                                </span>
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm text-gray-600 ml-1">{applicant.rating}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                                                <div className="flex items-center text-gray-600">
                                                    <Briefcase className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">{applicant.jobTitle}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">{applicant.location}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <GraduationCap className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">{applicant.experience}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>{applicant.currentRole}</span>
                                                <span>•</span>
                                                <span>Salary: {applicant.salary_expectation}</span>
                                                <span>•</span>
                                                <span>{applicant.availability}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2 ml-6">
                                        <button
                                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            title="View details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>

                                        <button
                                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                            title="Send message"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </button>

                                        <button
                                            className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                                            title="Schedule interview"
                                        >
                                            <Calendar className="w-4 h-4" />
                                        </button>

                                        <button
                                            className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                            title="Download resume"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>

                                        <div className="relative">
                                            <button
                                                className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                                title="More actions"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Preview */}
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-sm font-medium text-gray-700">Key Skills:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {applicant.skills.slice(0, 5).map((skill, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                        {applicant.skills.length > 5 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                                                +{applicant.skills.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredApplicants.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-semibold">1-{Math.min(10, filteredApplicants.length)}</span> of <span className="font-semibold">{filteredApplicants.length}</span> applicants
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
                                    <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        2
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

export default ApplicantsManagement;