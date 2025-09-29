'use client';

import React from 'react';
import {
    Briefcase,
    Users,
    Calendar,
    Award,
    Plus,
    DollarSign,
    MoreHorizontal,
    Filter,
    Star,
} from 'lucide-react';
import StatCard from './StatCard';
import { useRouter } from 'next/navigation';

interface DashboardContentProps {
    stats: {
        activeJobs: number;
        totalApplicants: number;
        newApplicants: number;
        interviews: number;
        hired: number;
    };
    recentJobs: {
        id: number;
        title: string;
        priority: string;
        applicants: number;
        salary: string;
        status: string;
        postedDate: string;
    }[];
    upcomingInterviews: {
        id: number;
        candidate: string;
        position: string;
        type: string;
        date: string;
        time: string;
    }[];
    recentApplicants: {
        id: number;
        avatar: string;
        name: string;
        position: string;
        experience: string;
        rating: number;
        matchScore: number;
        status: string;
    }[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
    stats,
    recentJobs,
    upcomingInterviews,
    recentApplicants,
}) => {


    const router = useRouter();


    return (
        <div className="space-y-8">
            {/* ✅ Stats Grid using StatCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Active Jobs"
                    value={stats.activeJobs}
                    change={12}
                    icon={Briefcase}
                    color="blue"
                    subtitle="6 closing this week"
                />
                <StatCard
                    title="Total Applicants"
                    value={stats.totalApplicants}
                    change={8}
                    icon={Users}
                    color="green"
                    subtitle={`${stats.newApplicants} new this week`}
                />
                <StatCard
                    title="Interviews Scheduled"
                    value={stats.interviews}
                    change={25}
                    icon={Calendar}
                    color="purple"
                    subtitle="4 today"
                />
                <StatCard
                    title="Successful Hires"
                    value={stats.hired}
                    change={15}
                    icon={Award}
                    color="orange"
                    subtitle="This month"
                />
            </div>

            {/* ✅ Recent Jobs + Upcoming Interviews */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Jobs */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Recent Job Postings</h2>
                            <p className="text-gray-500 mt-1">Manage your active job listings</p>
                        </div>
                        <button
                            onClick={() => router.push('/claude/employer/post-job')}
                            className="flex items-center space-x-3 text-white px-6 py-3 rounded-2xl transition-all duration-200 shadow-lg"
                            style={{
                                background: 'linear-gradient(to right, #0062FF, #0052CC)',
                                boxShadow: '0 10px 25px rgba(0, 98, 255, 0.2)',
                            }}
                        >
                            <Plus className="w-5 h-5" />
                            <span className="font-semibold">Post Job</span>
                        </button>
                    </div>
                    <div className="space-y-6">
                        {recentJobs.map((job) => (
                            <div
                                key={job.id}
                                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <div
                                                className={`w-2 h-2 rounded-full ${job.priority === 'high'
                                                    ? 'bg-red-500'
                                                    : job.priority === 'medium'
                                                        ? 'bg-yellow-500'
                                                        : 'bg-green-500'
                                                    }`}
                                            ></div>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                                            <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl">
                                                <Users className="w-4 h-4 mr-2" />
                                                {job.applicants} applicants
                                            </span>
                                            <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl">
                                                <DollarSign className="w-4 h-4 mr-2" />
                                                {job.salary}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span
                                            className={`px-4 py-2 rounded-xl text-sm font-bold ${job.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {job.status}
                                        </span>
                                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Posted {job.postedDate}</span>
                                    <div className="flex space-x-4">
                                        <button className="font-semibold transition-colors" style={{ color: '#0062FF' }}>
                                            View Details
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Interviews */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Upcoming Interviews</h2>
                        <p className="text-gray-500 mt-1">Today's schedule</p>
                    </div>
                    <div className="space-y-6">
                        {upcomingInterviews.map((interview) => (
                            <div
                                key={interview.id}
                                className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                                        style={{ background: 'linear-gradient(to bottom right, #0062FF, #0052CC)' }}
                                    >
                                        <span className="text-white text-sm font-bold">
                                            {interview.candidate
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">{interview.candidate}</h3>
                                        <p className="text-sm text-gray-600">{interview.position}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-xl text-xs font-bold ${interview.type === 'Technical'
                                            ? 'bg-blue-100 text-blue-700'
                                            : interview.type === 'HR Round'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-green-100 text-green-700'
                                            }`}
                                    >
                                        {interview.type}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-xl">
                                    <span className="text-gray-600 font-medium">{interview.date}</span>
                                    <span className="font-bold" style={{ color: '#0062FF' }}>
                                        {interview.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="w-full mt-6 text-center font-bold py-3 rounded-2xl transition-all duration-200"
                        style={{
                            color: '#0062FF',
                            backgroundColor: 'rgba(0, 98, 255, 0.05)',
                        }}
                    >
                        View All Interviews
                    </button>
                </div>
            </div>

            {/* ✅ Recent Applicants */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Top Candidates</h2>
                        <p className="text-gray-500 mt-1">Highest matching candidates for your jobs</p>
                    </div>
                    <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-200">
                            <Filter className="w-5 h-5" />
                            <span className="font-semibold">Filter</span>
                        </button>
                        <button className="font-bold" style={{ color: '#0062FF' }}>
                            View All
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recentApplicants.map((applicant) => (
                        <div
                            key={applicant.id}
                            className="border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                    style={{ background: 'linear-gradient(to bottom right, #0062FF, #0052CC)' }}
                                >
                                    <span className="text-white font-bold text-lg">{applicant.avatar}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {applicant.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">{applicant.position}</p>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                            {applicant.experience}
                                        </span>
                                        <div className="flex items-center">
                                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                            <span className="text-xs text-gray-600 ml-1 font-semibold">
                                                {applicant.rating}
                                            </span>
                                        </div>
                                        <span
                                            className="text-xs font-bold px-2 py-1 rounded-lg"
                                            style={{
                                                color: '#0062FF',
                                                backgroundColor: 'rgba(0, 98, 255, 0.1)',
                                            }}
                                        >
                                            {applicant.matchScore}% match
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span
                                    className={`px-4 py-2 rounded-xl text-sm font-bold ${applicant.status === 'Interview Scheduled'
                                        ? 'bg-blue-100 text-blue-700'
                                        : applicant.status === 'Shortlisted'
                                            ? 'bg-green-100 text-green-700'
                                            : applicant.status === 'Under Review'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {applicant.status}
                                </span>
                                <button className="font-bold transition-colors" style={{ color: '#0062FF' }}>
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;