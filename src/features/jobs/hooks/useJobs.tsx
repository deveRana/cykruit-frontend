"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listJobs, getJobDetail } from "../services/jobs.service";
import { Job, JobDetail, JobFilters, JobResponse, Pagination } from "../types/jobs";
import Loader from "@/components/common/Loader";
import { FiBriefcase, FiFileText } from "react-icons/fi";

/** ==========================
 * Simple Empty State Component
 * ========================== */
const EmptyState = ({
    message,
    icon: Icon,
}: {
    message: string;
    icon: React.ElementType;
}) => (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <Icon className="w-10 h-10 mb-3" />
        <p className="text-base font-medium">{message}</p>
    </div>
);

/** ==========================
 * Hook: useJobs
 * ========================== */
export const useJobs = (initialFilters: JobFilters = {}) => {
    const queryClient = useQueryClient();

    const defaultFilters: JobFilters = {
        page: 1,
        limit: 10,
        ...initialFilters,
    };

    const [filters, setFilters] = React.useState<JobFilters>(defaultFilters);

    const { data: response, isLoading, error } = useQuery<JobResponse<Job>, Error>({
        queryKey: ["jobs", filters],
        queryFn: async () => {
            const res = await listJobs(filters);
            // ✅ res is already { data: Job[], pagination: Pagination }
            return res;
        },
        placeholderData: (prev) => prev,
        retry: 1,
    });

    if (error) console.error("❌ Failed to fetch jobs:", error);

    const jobs = response?.data ?? [];
    const pagination = response?.pagination;
    const isEmpty = !isLoading && !error && jobs.length === 0;

    const updateFilters = (newFilters: Partial<JobFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    };

    const refetchJobs = (overrideFilters?: JobFilters) => {
        const finalFilters = overrideFilters || filters;
        queryClient.invalidateQueries({ queryKey: ["jobs", finalFilters] });
        setFilters(finalFilters);
    };

    return {
        jobs,
        pagination,
        isLoading,
        loader: isLoading ? <Loader /> : null,
        emptyState: isEmpty ? <EmptyState message="No jobs found." icon={FiBriefcase} /> : null,
        filters,
        updateFilters,
        refetchJobs,
    };
};

/** ==========================
 * Hook: useJobDetail
 * ========================== */
export const useJobDetail = (slug: string) => {
    const {
        data: jobDetail,
        isLoading: isJobDetailLoading,
        error,
        refetch: refetchJobDetail,
    } = useQuery<JobDetail, Error>({
        queryKey: ["jobDetail", slug],
        queryFn: () => getJobDetail(slug),
        enabled: !!slug,
        retry: 1,
    });

    if (error) console.error(`❌ Failed to fetch job detail (${slug}):`, error);

    const isEmpty = !isJobDetailLoading && !error && !jobDetail;

    return {
        jobDetail,
        isLoading: isJobDetailLoading,
        loader: isJobDetailLoading ? <Loader /> : null,
        emptyState: isEmpty ? <EmptyState message="Job not found." icon={FiFileText} /> : null,
        refetchJobDetail,
    };
};
