"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useJobDetail } from "@/features/jobs/hooks/useJobs";
import { useSavedJobs } from "@/features/seeker/saved-jobs/hooks/useSavedJobs";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    FiMapPin,
    FiBriefcase,
    FiClock,
    FiStar,
    FiCheckCircle,
    FiGlobe,
    FiUsers,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/common/Toast"; // 👈 import toast hook

const JobDetailPage = () => {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const { jobDetail, isLoading, loader, emptyState } = useJobDetail(slug!);
    const {
        savedJobs,
        saveJob,
        removeSavedJob,
        isLoading: savedJobsLoading,
        loader: savedJobsLoader,
    } = useSavedJobs();
    const { user } = useAuth(); // ✅ current user

    const { error, success, info } = useToast(); // 👈 toast methods

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (jobDetail && savedJobs) {
            setIsSaved(savedJobs.some((job) => job.jobId === jobDetail.id.toString()));
        }
    }, [jobDetail, savedJobs]);

    // Show loader when fetching saved jobs OR job detail
    if (isLoading || savedJobsLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || savedJobsLoader}
            </div>
        );
    }

    if (!jobDetail) return emptyState;

    const handleSaveClick = () => {
        if (!user) {
            error("Please login to save jobs!"); // 👈 show toast instead of alert
            return;
        }

        if (isSaved) {
            removeSavedJob(jobDetail.id.toString());
            setIsSaved(false);
            info("Job removed from saved jobs");
        } else {
            saveJob(jobDetail.id.toString());
            setIsSaved(true);
            success("Job saved successfully");
        }
    };

    // Dummy sections
    const responsibilities = [
        "Design, develop, and maintain web applications.",
        "Collaborate with cross-functional teams to define requirements.",
        "Ensure code quality and maintainability.",
    ];
    const requirements = [
        "3+ years of experience in frontend development.",
        "Proficiency with React, TypeScript, and Tailwind CSS.",
        "Strong problem-solving and communication skills.",
    ];
    const benefits = [
        "Flexible working hours",
        "Health insurance",
        "Professional development opportunities",
    ];

    return (
        <div className="min-h-screen bg-[#F1F5F9] py-12 px-4 md:px-12 flex justify-center">
            <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-5xl flex flex-col gap-10 transition-all hover:shadow-3xl">

                {/* Save Icon */}
                <button
                    onClick={handleSaveClick}
                    className={`absolute top-6 right-6 text-2xl transition-transform duration-300 
                        ${isSaved ? "text-yellow-500 scale-110" : "text-gray-400"} 
                        hover:text-yellow-500 hover:scale-125`}
                >
                    <FiStar
                        className={`${isSaved ? "text-yellow-500" : "text-gray-400"
                            } transition-colors duration-300`}
                    />
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0F123F]">
                            {jobDetail.title}
                        </h1>
                        <p className="text-gray-500 mt-1 text-lg">{jobDetail.companyName}</p>
                    </div>
                    {jobDetail.isFeatured && (
                        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full font-semibold text-sm shadow-md">
                            <FiStar /> Featured
                        </span>
                    )}
                </div>

                {/* Job Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                        <FiMapPin className="text-[#0F123F] w-5 h-5" />{" "}
                        {jobDetail.location || "Remote"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FiBriefcase className="text-[#0F123F] w-5 h-5" />{" "}
                        {jobDetail.employmentType || "Full-time"}
                    </div>
                    <div className="flex items-center gap-2">
                        <FiClock className="text-[#0F123F] w-5 h-5" />{" "}
                        {jobDetail.postedAt ? "Recently" : "1 week ago"}
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        {jobDetail.currency} {jobDetail.salaryMin?.toLocaleString() || "50,000"} -{" "}
                        {jobDetail.currency} {jobDetail.salaryMax?.toLocaleString() || "80,000"}
                    </div>
                    <div className="uppercase text-gray-500 text-sm md:text-base">
                        {jobDetail.workMode || "Hybrid"}
                    </div>
                </div>

                {/* Job Description */}
                <div className="mt-6 text-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-[#0F123F]">
                        Job Description
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed">
                        {jobDetail.description ||
                            "We are looking for a talented developer to join our team. You will be responsible for building amazing applications and collaborating with a dynamic team."}
                    </p>
                </div>

                {/* Responsibilities */}
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-[#0F123F]">Responsibilities</h2>
                    <ul className="flex flex-col gap-2">
                        {responsibilities.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <FiCheckCircle className="text-[#0F123F] mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Requirements */}
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-[#0F123F]">Requirements</h2>
                    <ul className="flex flex-col gap-2">
                        {requirements.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <FiCheckCircle className="text-[#0F123F] mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Benefits */}
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-[#0F123F]">Benefits</h2>
                    <ul className="flex flex-col gap-2">
                        {benefits.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                <FiCheckCircle className="text-[#0F123F] mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company Info */}
                <div className="bg-[#F1F5F9] p-6 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#0F123F] flex items-center justify-center text-white text-xl font-bold">
                            {jobDetail.companyName[0]}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#0F123F]">
                                {jobDetail.companyName}
                            </h3>
                            <p className="text-gray-600 text-sm">Tech Company • 200 Employees</p>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0 md:ml-auto text-gray-700">
                        <div className="flex items-center gap-2">
                            <FiGlobe className="text-[#0F123F]" /> www.companywebsite.com
                        </div>
                        <div className="flex items-center gap-2">
                            <FiUsers className="text-[#0F123F]" /> 200 Employees
                        </div>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="mt-6">
                    <Button className="w-full rounded-xl bg-[#0F123F] text-white shadow-lg py-3 text-lg font-semibold transition-all">
                        Apply Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;
