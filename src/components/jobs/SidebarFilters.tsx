"use client";

import React from "react";
import { Job } from "@/features/jobs/types/jobs";

type JobTypeFilter = Job["type"] | "";
type JobModeFilter = Job["mode"] | "";

interface SidebarFiltersProps {
    jobTypes: { name: Job["type"]; count: number }[];
    jobModes?: { name: Job["mode"]; count: number }[];
    activeTab: JobTypeFilter;
    setActiveTab: React.Dispatch<React.SetStateAction<JobTypeFilter>>;
    activeMode?: JobModeFilter;
    setActiveMode?: React.Dispatch<React.SetStateAction<JobModeFilter>>;
    locations: string[];
    selectedLocation: string;
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
    experienceLevels: Job["experienceLevel"][];
    selectedExperience: Job["experienceLevel"] | "";
    setSelectedExperience: React.Dispatch<React.SetStateAction<Job["experienceLevel"] | "">>;
    clearAll?: () => void;
}

export default function SidebarFilters({
    jobTypes,
    jobModes,
    activeTab,
    setActiveTab,
    activeMode,
    setActiveMode,
    locations,
    selectedLocation,
    setSelectedLocation,
    experienceLevels,
    selectedExperience,
    setSelectedExperience,
    clearAll,
}: SidebarFiltersProps) {
    return (
        <aside className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 h-fit space-y-8">
            {clearAll && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={clearAll}
                        className="px-3 py-1 text-sm text-blue-600 font-semibold hover:underline"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Job Type */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Type</h3>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setActiveTab("")}
                        className={`px-4 py-2 rounded-lg text-left font-medium transition-all ${activeTab === "" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                            }`}
                    >
                        All Types
                    </button>
                    {jobTypes.map((type) => (
                        <button
                            key={type.name}
                            onClick={() => setActiveTab(type.name)}
                            className={`px-4 py-2 rounded-lg text-left font-medium transition-all ${activeTab === type.name ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                                }`}
                        >
                            {type.name} <span className="text-gray-400">({type.count})</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Job Mode */}
            {jobModes && setActiveMode && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Mode</h3>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setActiveMode("")}
                            className={`px-4 py-2 rounded-lg text-left font-medium transition-all ${activeMode === "" ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                                }`}
                        >
                            All Modes
                        </button>
                        {jobModes.map((mode) => (
                            <button
                                key={mode.name}
                                onClick={() => setActiveMode(mode.name)}
                                className={`px-4 py-2 rounded-lg text-left font-medium transition-all ${activeMode === mode.name ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                                    }`}
                            >
                                {mode.name} <span className="text-gray-400">({mode.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Location */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* Experience Level */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Level</h3>
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-gray-700">
                        <input
                            type="radio"
                            name="experience"
                            value=""
                            checked={selectedExperience === ""}
                            onChange={() => setSelectedExperience("")}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        All Levels
                    </label>
                    {experienceLevels.map((exp) => (
                        <label key={exp} className="flex items-center gap-2 text-gray-700">
                            <input
                                type="radio"
                                name="experience"
                                value={exp}
                                checked={selectedExperience === exp}
                                onChange={() => setSelectedExperience(exp)}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            {exp}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
