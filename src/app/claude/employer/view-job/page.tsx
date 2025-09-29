"use client"

import React, { useState } from 'react';
import {
    Search, Plus, Eye, Edit, Trash2, Users, MapPin, DollarSign, Clock,
    Calendar, Building2, MoreHorizontal, AlertCircle, CheckCircle,
    XCircle, FileText, Filter, Bell, Settings, User, MessageSquare,
    Briefcase, TrendingUp, BarChart3, Home, Shield, Menu, X,
    Star, Globe, Phone, Mail, ChevronDown, ChevronUp, Save, Send,
    Share2, Copy, ExternalLink, Activity, Target, Award, Zap
} from 'lucide-react';
import ViewJobHeader from './ViewJobHeader';

const ViewJobPage = () => {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    // Mock job data with complete details
    const jobData = {
        id: 1,
        title: 'Senior Cybersecurity Analyst',
        role: 'Cybersecurity Analyst',
        company: 'SecureTech Corporation',
        location: 'New York, NY',
        workMode: 'Hybrid',
        jobType: 'Full-time',
        salaryRange: { min: 95000, max: 120000 },
        postedDate: '2024-01-20',
        deadline: '2024-02-15',
        status: 'active',
        applicants: 45,
        views: 234,
        description: `🚀 Join our elite cybersecurity team and help protect critical infrastructure!

We are seeking an experienced Senior Cybersecurity Analyst to join our Security Operations Center. You'll be at the forefront of defending against cyber threats, working with cutting-edge security tools and collaborating with a world-class team.

🔍 What You'll Do:
• Monitor and analyze security events using advanced SIEM platforms
• Lead incident response efforts and coordinate with cross-functional teams  
• Conduct comprehensive threat analysis and vulnerability assessments
• Develop and maintain security policies, procedures, and documentation
• Mentor junior analysts and contribute to team knowledge sharing
• Stay current with emerging threats and security technologies

💼 What We Offer:
• Competitive salary with performance bonuses
• Comprehensive health, dental, and vision insurance
• 401(k) with company matching up to 6%
• Flexible work arrangements (hybrid model)
• Professional development budget of $5,000/year
• Latest security tools and technologies
• Collaborative and innovative work environment`,
        requirements: [
            'Bachelor\'s degree in Computer Science, Information Security, or related field',
            'Minimum 5+ years of hands-on cybersecurity experience',
            'Strong experience with SIEM tools (Splunk, QRadar, or ArcSight)',
            'Expertise in incident response and digital forensics',
            'Knowledge of network security protocols and technologies',
            'Experience with vulnerability assessment tools (Nessus, Nmap)',
            'Understanding of compliance frameworks (SOX, PCI-DSS, HIPAA)',
            'Excellent analytical and problem-solving skills',
            'Strong communication and documentation abilities'
        ],
        preferredQualifications: [
            'Master\'s degree in Cybersecurity or related field',
            'Cloud security experience (AWS, Azure, GCP)',
            'Programming skills in Python, PowerShell, or Bash',
            'Experience with threat hunting and threat intelligence',
            'Knowledge of DevSecOps practices and tools'
        ],
        certifications: [
            'CISSP (Certified Information Systems Security Professional)',
            'CISM (Certified Information Security Manager)',
            'CompTIA Security+',
            'GCIH (GIAC Certified Incident Handler)',
            'CEH (Certified Ethical Hacker)'
        ],
        skills: [
            'Network Security', 'Incident Response', 'SIEM', 'Vulnerability Assessment',
            'Digital Forensics', 'Threat Analysis', 'Risk Assessment', 'Compliance',
            'Python', 'PowerShell', 'Splunk', 'QRadar', 'Nessus', 'Wireshark',
            'AWS Security', 'Azure Security', 'Firewall Management', 'IDS/IPS'
        ],
        benefits: [
            'Health, Dental & Vision Insurance',
            '401(k) with Company Matching',
            'Flexible Work Arrangements',
            'Professional Development Budget',
            'Paid Time Off & Holidays',
            'Stock Options',
            'Gym Membership',
            'Learning & Certification Reimbursement'
        ],
        workSchedule: 'Monday - Friday, 9:00 AM - 6:00 PM EST',
        reportingTo: 'Chief Information Security Officer (CISO)',
        teamSize: '8 Security Professionals',
        travelRequirement: 'Minimal (< 5%)',
        remotePolicy: 'Hybrid: 3 days in office, 2 days remote'
    };

    const handleCopyJobUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'closed': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4" />;
            case 'draft': return <FileText className="w-4 h-4" />;
            case 'paused': return <AlertCircle className="w-4 h-4" />;
            case 'closed': return <XCircle className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <>
            <ViewJobHeader />
            <main className="p-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{jobData.title}</h1>
                                <p className="text-base text-gray-600">{jobData.company}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(jobData.status)}`}>
                                    {getStatusIcon(jobData.status)}
                                    <span className="capitalize">{jobData.status}</span>
                                </span>

                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{jobData.location}</span>
                                </div>

                                <div className="flex items-center text-gray-600">
                                    <Building2 className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{jobData.workMode}</span>
                                </div>

                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span className="text-sm">{jobData.jobType}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Share Button */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </button>

                                {showShareMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                        <button
                                            onClick={handleCopyJobUrl}
                                            className="w-full flex items-center px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg"
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            {copied ? 'Copied!' : 'Copy Job URL'}
                                        </button>
                                        <button className="w-full flex items-center px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors last:rounded-b-lg">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            View Public Page
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Job
                            </button>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Description */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                    {jobData.description}
                                </div>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <Target className="w-5 h-5 text-red-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Requirements</h2>
                            </div>

                            <ul className="space-y-3">
                                {jobData.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Preferred Qualifications */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <Zap className="w-5 h-5 text-green-600 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Preferred Qualifications</h2>
                            </div>

                            <ul className="space-y-3">
                                {jobData.preferredQualifications.map((qual, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span className="text-gray-700 text-sm leading-relaxed">{qual}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Job Details</h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <DollarSign className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Salary Range</span>
                                    </div>
                                    <p className="text-base font-bold text-gray-900 ml-6">
                                        ${jobData.salaryRange.min.toLocaleString()} - ${jobData.salaryRange.max.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Posted Date</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">
                                        {new Date(jobData.postedDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Application Deadline</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">
                                        {new Date(jobData.deadline).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Work Schedule</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">{jobData.workSchedule}</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <User className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Reporting To</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">{jobData.reportingTo}</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Users className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Team Size</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">{jobData.teamSize}</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Globe className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Travel Required</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">{jobData.travelRequirement}</p>
                                </div>

                                <div>
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <Building2 className="w-4 h-4 mr-2" />
                                        <span className="font-semibold text-sm">Remote Policy</span>
                                    </div>
                                    <p className="text-sm text-gray-700 ml-6">{jobData.remotePolicy}</p>
                                </div>
                            </div>
                        </div>

                        {/* Required Certifications */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <Shield className="w-5 h-5 text-blue-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
                            </div>

                            <div className="space-y-2">
                                {jobData.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                                        <Shield className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Required Skills */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <Star className="w-5 h-5 text-green-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">Skills</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {jobData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center mb-4">
                                <Award className="w-5 h-5 text-orange-600 mr-2" />
                                <h3 className="text-lg font-bold text-gray-900">Benefits</h3>
                            </div>

                            <div className="space-y-2">
                                {jobData.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center">
                                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ViewJobPage;