import client from "@/lib/api/client";
import {
    CreateJobInput,
    JobStatus,
    UpdateJobInput,
} from "../types/post-a-job";

// ---------------------- JOB APIs ----------------------

// Create a new job
export const createJob = async (data: CreateJobInput) => {
    const res = await client.post("/employer/jobs", data);
    return res.data;
};

// Update an existing job
export const updateJob = async (jobId: string | number, data: UpdateJobInput) => {
    const res = await client.patch(`/employer/jobs?jobId=${jobId}`, data);
    return res.data;
};

// Change job status
export const changeJobStatus = async (jobId: string | number, status: JobStatus) => {
    const res = await client.patch(`/employer/jobs/status?jobId=${jobId}`, { status });
    return res.data;
};

// Get all jobs by the current employer
export const getJobsByEmployer = async () => {
    const res = await client.get("/employer/jobs/employer"); // ✅ matches your NestJS route
    return res.data;
};

// Get a single job by ID
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

// ✅ New: Get all roles
export const getAllRoles = async () => {
    const res = await client.get("/meta/roles");
    return res.data.data;
};
