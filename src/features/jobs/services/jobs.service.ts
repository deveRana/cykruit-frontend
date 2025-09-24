import client from "@/lib/api/client";
import { JobFilters, JobResponse } from "../types/jobs";
import { JobDetailResponse, Job } from "../types/jobSlug";

/** ==========================
 * List Jobs with filters
 * ========================== */
export const listJobs = async (
  filters: JobFilters
): Promise<JobResponse<Job>> => {
  const res = await client.get("/jobs", { params: filters });

  return {
    data: res.data.data.data, // jobs array
    pagination: res.data.data.pagination,
    filters: res.data.data.filters, // ✅ include backend filters
  };
};

/** ==========================
 * Get Job Detail by slug
 * ========================== */
export const getJobDetail = async (slug: string): Promise<Job> => {
  const res = await client.get<JobDetailResponse>(`/jobs/${slug}`);
  return res.data.data.data; // ✅ unwrap both levels
};
