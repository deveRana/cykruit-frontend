import client from "@/lib/api/client";
import { Job, JobDetail, JobFilters, JobResponse } from "../types/jobs";

/** ==========================
 * List Jobs with filters
 * ========================== */
export const listJobs = async (
    filters: JobFilters
): Promise<JobResponse<Job>> => {
    const res = await client.get("/jobs", { params: filters });
    // ✅ unwrap backend response
    return {
        data: res.data.data.data,        // first 'data' = backend field, second 'data' = jobs array
        pagination: res.data.data.pagination
    };
};

/** ==========================
 * Get Job Detail by slug
 * ========================== */
export const getJobDetail = async (slug: string): Promise<JobDetail> => {
    const res = await client.get(`/jobs/${slug}`);
    // ✅ unwrap backend response
    return res.data.data;
};
