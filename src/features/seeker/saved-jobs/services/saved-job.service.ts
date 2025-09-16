import client from "@/lib/api/client";
import { SavedJob } from "../types/saved-job";

// ==========================
// List all saved jobs
// ==========================
export const listSavedJobs = async (): Promise<SavedJob[]> => {
    const res = await client.get("/job-seeker/saved-jobs");
    return res.data.data;
};

// ==========================
// Save a job
// ==========================
export const saveJob = async (jobId: string): Promise<SavedJob> => {
    const res = await client.post("/job-seeker/saved-jobs", { jobId });
    return res.data.data;
};

// ==========================
// Remove a saved job
// ==========================
export const removeSavedJob = async (jobId: string): Promise<{ success: boolean }> => {
    const res = await client.delete("/job-seeker/saved-jobs", { data: { jobId } });
    return res.data.data;
};
