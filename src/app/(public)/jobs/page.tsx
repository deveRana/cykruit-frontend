"use client";

import React, { useState, useEffect } from "react";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { Job } from "@/features/jobs/types/jobs";
import { FiSearch, FiMapPin, FiBriefcase, FiClock, FiStar } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const JobsPage = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { jobs, pagination, isLoading, loader, emptyState, refetchJobs } = useJobs({
        search,
        page,
        limit: 9,
    });

    useEffect(() => {
        refetchJobs({ search, page, limit: 9 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page]);

    const handleSearch = () => setPage(1);
    const handleNext = () => pagination && page < pagination.totalPages && setPage(page + 1);
    const handlePrev = () => pagination && page > 1 && setPage(page - 1);

    return (
        <div className="min-h-screen bg-[#F1F5F9] py-12 px-4 md:px-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold mb-4 text-[#0F123F] drop-shadow-lg">
                    🌟 Explore Jobs
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Find the perfect job that matches your skills and career goals.
                </p>
            </div>

            {/* Search */}
            <div className="flex justify-center mb-12">
                <div className="flex w-full max-w-2xl items-center gap-2 rounded-full px-5 py-3 shadow-md bg-white transition-transform hover:scale-105">
                    <FiSearch className="text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search jobs by title, skills, or company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
                    />
                    <Button
                        size="sm"
                        className="bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>

            {loader}
            {emptyState}

            {/* Jobs Grid */}
            {!isLoading && jobs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.map((job: Job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Company + Title */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg">
                                    {job.companyName[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-black">{job.title}</h3>
                                    <p className="text-sm text-gray-500">{job.companyName}</p>
                                </div>
                            </div>

                            {/* Job Info with Icons */}
                            <div className="grid grid-cols-2 gap-4 mb-5">
                                <div className="flex items-center gap-2">
                                    <FiMapPin className="text-black w-5 h-5" />
                                    <span className="text-black text-sm">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiBriefcase className="text-black w-5 h-5" />
                                    <span className="text-black text-sm">{job.employmentType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiClock className="text-black w-5 h-5" />
                                    <span className="text-black text-sm">{job.postedAt ? "Recently" : ""}</span>
                                </div>
                                <div className="flex items-center gap-2 col-span-2">
                                    <span className="uppercase text-xs text-gray-400">{job.workMode}</span>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-2 mb-5">
                                {job.isFeatured && (
                                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-semibold rounded-full">
                                        <FiStar /> Featured
                                    </span>
                                )}
                                {job.isUrgent && (
                                    <span className="bg-red-100 text-red-800 px-3 py-1 text-xs font-semibold rounded-full">
                                        Urgent
                                    </span>
                                )}
                            </div>

                            {/* View Details Button */}
                            <Button
                                className="w-full rounded-xl bg-black text-white hover:bg-gray-800 transition-all py-2"
                                onClick={() => window.open(`/jobs/${job.slug}`, "_blank")}
                            >
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!isLoading && pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-4 items-center">
                    <Button
                        variant="outline"
                        disabled={page <= 1}
                        onClick={handlePrev}
                        className="rounded-lg px-4 py-2 border-gray-300 text-black hover:bg-black hover:text-white transition-colors"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                        Page {page} of {pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page >= pagination.totalPages}
                        onClick={handleNext}
                        className="rounded-lg px-4 py-2 border-gray-300 text-black hover:bg-black hover:text-white transition-colors"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default JobsPage;
