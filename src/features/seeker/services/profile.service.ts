import client from "@/lib/api/client";
import {
    JobSeeker,
    Education,
    Experience,
    Skill,
    Resume,
    Certification,
} from "../types/seeker";

// ==========================
// Main Profile
// ==========================
export const getProfile = async (): Promise<JobSeeker> => {
    const res = await client.get("/job-seeker/me");
    return res.data.data;
};

export const updateBasicInfo = async (data: Partial<JobSeeker>) => {
    const res = await client.patch("/job-seeker", data);
    return res.data.data;
};

// Update Links
export const updateLinks = async (data: any) => {
    const res = await client.patch("/job-seeker/links", data);
    return res.data.data;
};

// ==========================
// Skills CRUD
// ==========================
export const addSkill = async (skill: Partial<Skill>) => {
    const res = await client.post("/job-seeker/skills", skill);
    return res.data.data;
};

export const removeSkill = async (skillIds: number[]) => {
    const res = await client.delete("/job-seeker/skills", { data: { skillIds } });
    return res.data.data;
};

// ==========================
// Education CRUD
// ==========================
export const addEducation = async (edu: Partial<Education>) => {
    const res = await client.post("/job-seeker/education", edu);
    return res.data.data;
};

export const updateEducation = async (educationId: number, edu: Partial<Education>) => {
    const res = await client.patch(`/job-seeker/education/${educationId}`, edu);
    return res.data.data;
};

export const removeEducation = async (education: { educationId: number }) => {
    const res = await client.delete("/job-seeker/education", { data: education });
    return res.data.data;
};
// ==========================
// Experience CRUD
// ==========================
export const addExperience = async (exp: Partial<Experience>) => {
    const res = await client.post("/job-seeker/experience", exp);
    return res.data.data;
};

export const updateExperience = async (experienceId: number, exp: Partial<Experience>) => {
    const res = await client.patch(`/job-seeker/experience/${experienceId}`, exp);
    return res.data.data;
};

export const removeExperience = async (experienceIds: number[]) => {
    const res = await client.delete("/job-seeker/experience", { data: { experienceIds } });
    return res.data.data;
};

// ==========================
// Resume Upload / Delete
// ==========================
export const uploadResume = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await client.post("/job-seeker/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
};

export const deleteResume = async (resumeId: number) => {
    const res = await client.delete(`/job-seeker/resume?resumeId=${resumeId}`);
    return res.data.data;
};

// ==========================
// Certifications CRUD
// ==========================
export const addCertification = async (cert: Partial<Certification>) => {
    const res = await client.post("/job-seeker/certification", cert);
    return res.data.data;
};

export const removeCertification = async (certificationIds: number[]) => {
    const res = await client.delete("/job-seeker/certification", {
        data: { certificationIds },
    });
    return res.data.data;
};
