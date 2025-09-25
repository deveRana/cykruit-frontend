import client from "@/lib/api/client";
import {
    SavedJob,
    RawSavedJobsResponse,
} from "@/features/jobs/types/jobSlug";

// ==========================
// List all saved jobs
// ==========================
export const listSavedJobs = async (): Promise<SavedJob[]> => {
    const res = await client.get<RawSavedJobsResponse>("/job-seeker/saved-jobs");
    return res.data.data;
};

// ==========================
// Save a job
// ==========================
export const saveJob = async (jobId: string): Promise<SavedJob> => {
    const res = await client.post<{ data: SavedJob }>("/job-seeker/saved-jobs", { jobId });
    return res.data.data;
};

// ==========================
// Remove a saved job
// ==========================
export const removeSavedJob = async (
    jobId: string
): Promise<{ success: boolean }> => {
    const res = await client.delete<{ data: { success: boolean } }>(
        "/job-seeker/saved-jobs",
        { data: { jobId } }
    );
    return res.data.data;
};
