import client from "@/lib/api/client";
import {
    JobSeeker,
    Education,
    Experience,
    Skill,
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

export const updateLinks = async (data: any) => {
    const res = await client.patch("/job-seeker/links", data);
    return res.data.data;
};

// ==========================
// Skills CRUD
// ==========================
export const addSkill = async (payload: { skills: number[] }) => {
    const res = await client.post("/job-seeker/skills", payload);
    return res.data.data;
};

export const removeSkill = async (skillId: number) => {
    const res = await client.delete("/job-seeker/skills", { data: { skills: [skillId] } });
    return res.data.data;
};

export const getSkills = async (): Promise<Skill[]> => {
    const res = await client.get("/job-seeker/skills");
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

export const removeEducation = async (educationId: number) => {
    const res = await client.delete("/job-seeker/education", { data: { educationId } });
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

export const removeExperience = async (experienceId: number) => {
    const res = await client.delete("/job-seeker/experience", { data: { experienceId } });
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
export const addCertification = async (cert: { certificationId?: string; name?: string; organization?: string }) => {
    // backend expects object with string ID
    const res = await client.post("/job-seeker/certification", cert);
    return res.data.data;
};

export const removeCertification = async (certificationId: string) => {
    const res = await client.delete("/job-seeker/certification", { data: { certificationId } });
    return res.data.data;
};

export const getCertifications = async (): Promise<Certification[]> => {
    const res = await client.get("/job-seeker/certifications");
    return res.data.data;
};

// ==========================
// Master Skills & Certifications (For Selection)
// ==========================
export const getAllSkills = async (): Promise<Skill[]> => {
    const res = await client.get("/job-seeker/all-skills");
    return res.data.data;
};

export const getAllCertifications = async (): Promise<Certification[]> => {
    const res = await client.get("/job-seeker/all-certifications");
    return res.data.data;
};
