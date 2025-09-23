"use client";

import React, { useState, useEffect } from "react";
import SidebarFilters from "./SidebarFilters";
import TopFilters from "./TopFilters";
import JobCard from "./JobCard";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { Job } from "@/features/jobs/types/jobs";

// Friendly labels
const typeLabels: Record<Job["type"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

const modeLabels: Record<Job["mode"], string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "Onsite",
};

const experienceLabels: Record<Job["experienceLevel"], string> = {
  ENTRY: "Entry Level",
  MID: "Mid Level",
  SENIOR: "Senior Level",
};

export default function JobsListing() {
  const { jobs, pagination, filters, isLoading, loader, emptyState } = useJobs();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<Job["type"] | "">("");
  const [activeMode, setActiveMode] = useState<Job["mode"] | "">("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState<Job["experienceLevel"] | "">("");
  const [sortBy, setSortBy] = useState("latest");

  // Pagination
  const [page, setPage] = useState(1);
  const jobsPerPage = 9;

  // Clear all filters
  const clearAllFilters = () => {
    setActiveTab("");
    setActiveMode("");
    setSelectedLocation("");
    setSelectedExperience("");
    setSearchTerm("");
    setPage(1);
  };

  // Reset page when filters change
  useEffect(() => setPage(1), [searchTerm, activeTab, activeMode, selectedLocation, selectedExperience]);

  // Client-side filtering
  const filteredJobs = jobs.filter((job) => {
    const matchesSearchTerm = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !activeTab || job.type === activeTab;
    const matchesMode = !activeMode || job.mode === activeMode;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesExperience = !selectedExperience || job.experienceLevel === selectedExperience;
    return matchesSearchTerm && matchesType && matchesMode && matchesLocation && matchesExperience;
  });

  // Sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "oldest") return new Date(a.postedAt!).getTime() - new Date(b.postedAt!).getTime();
    if (sortBy === "latest") return new Date(b.postedAt!).getTime() - new Date(a.postedAt!).getTime();
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (page - 1) * jobsPerPage;
  const paginatedJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <SidebarFilters
          jobTypes={Object.entries(filters?.types ?? {}).map(([name, count]) => ({
            name: name as Job["type"],
            count,
          }))}
          jobModes={Object.entries(filters?.modes ?? {}).map(([name, count]) => ({
            name: name as Job["mode"],
            count,
          }))}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          locations={Object.keys(filters?.locations ?? {})}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          experienceLevels={Object.keys(filters?.experienceLevels ?? {}) as Job["experienceLevel"][]}
          selectedExperience={selectedExperience}
          setSelectedExperience={setSelectedExperience}
          clearAll={clearAllFilters}
        />

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8">
          <TopFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {isLoading && loader}
          {!isLoading && emptyState}

          {paginatedJobs.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-4 items-center">
                  <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
