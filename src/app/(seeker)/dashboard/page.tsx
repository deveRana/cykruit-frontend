// src\app\(seeker)\dashboard\page.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    // Placeholder data
    const stats = [
        { title: "Jobs Applied", value: 12 },
        { title: "Saved Jobs", value: 5 },
        { title: "Profile Views", value: 34 },
    ];

    const recentApplications = [
        { jobTitle: "Frontend Developer", company: "Acme Corp", status: "Pending" },
        { jobTitle: "Backend Developer", company: "Globex Inc.", status: "Reviewed" },
        { jobTitle: "UI/UX Designer", company: "Initech", status: "Interview" },
    ];

    return (
        <div className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="p-4">
                        <h3 className="text-sm text-gray-500">{stat.title}</h3>
                        <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* Recent applications table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Recent Applications</h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Job Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recentApplications.map((app, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{app.jobTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{app.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 flex justify-end">
                    <Button>View All Applications</Button>
                </div>
            </div>
        </div>
    );
}
