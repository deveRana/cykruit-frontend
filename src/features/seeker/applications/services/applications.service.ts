// src/features/seeker/applications/services/applications.service.ts
import client from "@/lib/api/client";
import {
    JobApplication,
    ApplyJobPayload,
    WithdrawApplicationPayload,
} from "../types/applications";

// ==========================
// Apply to a Job
// ==========================
export const applyJob = async (payload: ApplyJobPayload): Promise<JobApplication> => {
    const res = await client.post("/applications/apply", payload);
    return res.data.data;
};

// ==========================
// Withdraw Application
// ==========================
export const withdrawApplication = async (
    payload: WithdrawApplicationPayload
): Promise<JobApplication> => {
    const res = await client.patch("/applications/withdraw", payload);
    return res.data.data;
};

// ==========================
// List Applications
// ==========================
export const listApplications = async (): Promise<JobApplication[]> => {
    const res = await client.get("/applications");
    return res.data.data;
};

// ==========================
// Get Single Application
// ==========================
export const getApplication = async (applicationId: bigint | number | string): Promise<JobApplication> => {
    const res = await client.get(`/applications/${applicationId}`);
    return res.data.data;
};
