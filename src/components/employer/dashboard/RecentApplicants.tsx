"use client";

import React from "react";

export default function RecentApplicants() {
    const applicants = [
        { name: "Alice Johnson", position: "Frontend Developer", date: "2 days ago" },
        { name: "Bob Smith", position: "Backend Developer", date: "3 days ago" },
        { name: "Charlie Lee", position: "UI/UX Designer", date: "5 days ago" },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Applicants</h3>
            <ul className="space-y-3">
                {applicants.map((applicant) => (
                    <li
                        key={applicant.name}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors duration-300"
                    >
                        <div>
                            <p className="font-medium text-gray-800">{applicant.name}</p>
                            <p className="text-gray-500 text-sm">{applicant.position}</p>
                        </div>
                        <span className="text-gray-400 text-sm">{applicant.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
