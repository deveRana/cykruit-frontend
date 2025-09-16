"use client";

import React from "react";
import { useApplications } from "@/features/seeker/applications/hooks/useApplications";
import { FiTrash2, FiCalendar, FiClipboard, FiRotateCcw } from "react-icons/fi";
import Loader from "@/components/common/Loader";

const ApplicationsPage = () => {
    const { applications, isLoading, loader, withdrawApplication, applyToJob } = useApplications();

    const handleWithdraw = (applicationId: string | number) => {
        withdrawApplication({ applicationId });
    };

    const handleReapply = (jobId: string | number) => {
        applyToJob({ jobId });
    };

    const formatDate = (date?: string | Date | number): string => {
        if (!date) return "-";
        const d = new Date(date);
        return isNaN(d.getTime()) ? "-" : d.toISOString().split("T")[0];
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <Loader />}
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl">
                <p className="text-gray-500 mb-4 text-lg">No job applications yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2">Job Title</th>
                        <th className="text-left px-4 py-2">Company</th>
                        <th className="text-left px-4 py-2">Applied At</th>
                        <th className="text-left px-4 py-2">Cover Letter</th>
                        <th className="text-left px-4 py-2">Status</th>
                        <th className="text-center px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-2 font-semibold">{app.job?.title || "-"}</td>
                            <td className="px-4 py-2">{app.job?.employer?.companyName || "-"}</td>
                            <td className="px-4 py-2">{formatDate(app.appliedAt)}</td>
                            <td className="px-4 py-2">
                                {app.coverLetter ? (
                                    <span>
                                        <FiClipboard className="inline mr-1" /> {app.coverLetter}
                                    </span>
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className={`px-4 py-2 font-semibold ${app.status === "APPLIED" ? "text-blue-600" :
                                    app.status === "SHORTLISTED" ? "text-green-600" :
                                        app.status === "REJECTED" ? "text-red-600" :
                                            app.status === "HIRED" ? "text-purple-600" :
                                                app.status === "WITHDRAWN" ? "text-gray-400" :
                                                    "text-gray-600"
                                }`}>
                                {app.status}
                            </td>
                            <td className="px-4 py-2 flex justify-center gap-3">
                                {app.status === "APPLIED" && (
                                    <FiTrash2
                                        className="text-red-500 hover:text-red-600 cursor-pointer"
                                        onClick={() => handleWithdraw(app.id)}
                                    />
                                )}
                                {(app.status === "REJECTED" || app.status === "WITHDRAWN") && (
                                    <button
                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                                        onClick={() => handleReapply(app.jobId)}
                                    >
                                        <FiRotateCcw /> Reapply
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationsPage;
