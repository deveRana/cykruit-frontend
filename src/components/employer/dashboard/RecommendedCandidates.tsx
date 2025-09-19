"use client";

import React from "react";

export default function RecommendedCandidates() {
    const candidates = [
        { name: "Diana Prince", skills: "React, TypeScript" },
        { name: "Clark Kent", skills: "Node.js, Express" },
        { name: "Bruce Wayne", skills: "UI/UX, Figma" },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Candidates</h3>
            <ul className="space-y-3">
                {candidates.map((candidate) => (
                    <li
                        key={candidate.name}
                        className="flex flex-col p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-colors duration-300"
                    >
                        <p className="font-medium text-gray-800">{candidate.name}</p>
                        <span className="text-gray-400 text-sm">{candidate.skills}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
