"use client";

import React from "react";
import { useApplications } from "@/features/seeker/applications/hooks/useApplications";
import Loader from "@/components/common/Loader";
import { FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";

const ApplicationsPage = () => {
    const { applications, isLoading, loader } = useApplications();
    const router = useRouter();

    const formatDate = (date?: string | Date | number): string => {
        if (!date) return "-";
        const d = new Date(date);
        return isNaN(d.getTime()) ? "-" : d.toISOString().split("T")[0];
    };

    const handleViewJob = (slug: string) => {
        router.push(`/jobs/${slug}`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <Loader />}
            </div>
        );
    }

    if (!applications || applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
                <p className="text-gray-500 mb-4 text-lg">No job applications yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Job Title</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Company</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Applied At</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                        <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">View</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {applications.map((app) => (
                        <tr key={app.job.slug} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 font-semibold text-gray-800">{app.job.title}</td>
                            <td className="px-6 py-4 text-gray-600">{app.job.employer.companyName}</td>
                            <td className="px-6 py-4 text-gray-500">{formatDate(app.appliedAt)}</td>
                            <td
                                className={`px-6 py-4 font-semibold ${app.status === "APPLIED"
                                        ? "text-blue-600"
                                        : app.status === "SHORTLISTED"
                                            ? "text-green-600"
                                            : app.status === "REJECTED"
                                                ? "text-red-600"
                                                : app.status === "HIRED"
                                                    ? "text-purple-600"
                                                    : app.status === "WITHDRAWN"
                                                        ? "text-gray-400"
                                                        : "text-gray-600"
                                    }`}
                            >
                                {app.status}
                            </td>
                            <td className="px-6 py-4 flex justify-center">
                                <FiEye
                                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                    size={18}
                                    onClick={() => handleViewJob(app.job.slug)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationsPage;
