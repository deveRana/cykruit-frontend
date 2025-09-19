"use client";

import React from "react";

interface Props {
    progress: number;
}

export default function CompanyProfileCompletion({ progress }: Props) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Company Profile</h3>
            <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-5 bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-gray-500 mt-2">{progress}% completed</p>
        </div>
    );
}
