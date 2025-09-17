import client from "@/lib/api/client";
import {
    JobApplication,
    ApplyJobPayload,
    WithdrawApplicationPayload,
} from "../types/applications";

// Helper to convert BigInt fields to string recursively
const convertBigIntToString = (obj: any): any => {
    if (typeof obj === "bigint") return obj.toString();
    if (Array.isArray(obj)) return obj.map(convertBigIntToString);
    if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k, convertBigIntToString(v)])
        );
    }
    return obj;
};

// ==========================
// Apply to a Job
// ==========================
export const applyJob = async (payload: ApplyJobPayload): Promise<JobApplication> => {
    console.log("[DEBUG] Original applyJob payload:", payload);

    // Convert all BigInt fields to strings
    const transformedPayload = convertBigIntToString(payload);

    console.log("[DEBUG] Transformed payload (BigInt -> string):", transformedPayload);

    try {
        const res = await client.post("/applications/apply", transformedPayload);
        console.log("[DEBUG] applyJob response:", res);
        if (!res || !res.data) {
            throw new Error("No response from server or response.data is undefined");
        }
        return res.data.data;
    } catch (err) {
        console.error("[ERROR] applyJob failed:", err);
        throw err;
    }
};

// ==========================
// Withdraw Application
// ==========================
export const withdrawApplication = async (
    payload: WithdrawApplicationPayload
): Promise<JobApplication> => {
    // Also convert BigInt if needed
    const transformedPayload = convertBigIntToString(payload);
    const res = await client.patch("/applications/withdraw", transformedPayload);
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
    const id = typeof applicationId === "bigint" ? applicationId.toString() : applicationId;
    const res = await client.get(`/applications/${id}`);
    return res.data.data;
};
