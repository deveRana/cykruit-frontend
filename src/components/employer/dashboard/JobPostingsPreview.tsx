"use client";

import React from "react";

export default function JobPostingsPreview() {
    const jobs = [
        { title: "Frontend Developer", applicants: 12 },
        { title: "Backend Developer", applicants: 8 },
        { title: "UI/UX Designer", applicants: 5 },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Postings</h3>
            <ul className="space-y-3">
                {jobs.map((job) => (
                    <li
                        key={job.title}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors duration-300"
                    >
                        <p className="font-medium text-gray-800">{job.title}</p>
                        <span className="text-gray-400 text-sm">{job.applicants} Applicants</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
