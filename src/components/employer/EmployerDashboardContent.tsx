// src/app/employer/dashboard/EmployerDashboardContent.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmployerDashboardContent() {
    const stats = [
        { title: "Posted Jobs", value: 8 },
        { title: "Active Applicants", value: 42 },
        { title: "Interviews Scheduled", value: 5 },
    ];

    const recentApplicants = [
        { name: "Alice Johnson", job: "Frontend Developer", status: "Applied" },
        { name: "Bob Smith", job: "Backend Developer", status: "Interview Scheduled" },
        { name: "Carol Lee", job: "UI/UX Designer", status: "Reviewed" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="p-5 shadow-sm hover:shadow-md transition">
                        <h3 className="text-sm text-gray-500">{stat.title}</h3>
                        <p className="mt-2 text-2xl font-bold text-gray-800">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-700">Recent Applicants</h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Job Applied
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recentApplicants.map((app, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">{app.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{app.job}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 flex justify-end">
                    <Button variant="default">View All Applicants</Button>
                </div>
            </div>
        </div>
    );
}
