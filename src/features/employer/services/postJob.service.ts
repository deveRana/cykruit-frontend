import client from "@/lib/api/client";
import {
    CreateJobInput,
    JobStatus,
    UpdateJobInput,
} from "../types/post-a-job";

// ---------------------- JOB APIs ----------------------
export const createJob = async (data: CreateJobInput) => {
    const res = await client.post("/employer/jobs", data);
    return res.data;
};

export const updateJob = async (jobId: string | number, data: UpdateJobInput) => {
    const res = await client.patch(`/employer/jobs?jobId=${jobId}`, data);
    return res.data;
};

export const changeJobStatus = async (jobId: string | number, status: JobStatus) => {
    const res = await client.patch(`/employer/jobs/status?jobId=${jobId}`, { status });
    return res.data;
};

export const getJobsByEmployer = async () => {
    const res = await client.get("/employer/jobs/employer");
    return res.data;
};

export const getJob = async (jobId: string | number) => {
    const res = await client.get(`/employer/jobs?jobId=${jobId}`);
    return res.data;
};

// ---------------------- MASTER DATA APIs ----------------------
export const getAllSkills = async () => {
    const res = await client.get("/meta/skills");
    return res.data.data;
};

export const getAllCertifications = async () => {
    const res = await client.get("/meta/certifications");
    return res.data.data;
};

export const getAllRoles = async () => {
    const res = await client.get("/meta/roles");
    return res.data.data;
};

// ✅ NEW: Get all locations
export const getAllLocations = async () => {
    const res = await client.get("/meta/locations");
    return res.data.data;
};
