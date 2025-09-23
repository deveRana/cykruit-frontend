"use client";

import React from "react";
import { Search, ArrowDown, ArrowUp, Filter } from "lucide-react";

interface TopFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
}




export default function TopFilters({ searchTerm, setSearchTerm, sortBy, setSortBy }: TopFiltersProps) {

    const toggleSort = () => {
        setSortBy(sortBy === "latest" ? "oldest" : "latest");
    };
    return (
        <div className="rounded-2xl   flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search for a job..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={toggleSort}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition 
                    ${sortBy === "latest"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"}`
                }
            >
                {sortBy === "latest" ? (
                    <>
                        Latest <ArrowDown size={16} />
                    </>
                ) : (
                    <>
                        Oldest <ArrowUp size={16} />
                    </>
                )}
            </button>

            {/* Mobile Filters */}
            <button className="md:hidden flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-800 bg-white shadow-sm">
                <Filter size={16} />
                <span>More Filters</span>
            </button>
        </div>
    );
}
