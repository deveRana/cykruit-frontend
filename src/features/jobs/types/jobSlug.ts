// app/jobs/jobs-slug.d.ts

export enum ApplyType {
    DIRECT = "DIRECT",
    EXTERNAL = "EXTERNAL",
    PRE_SCREENING = "PRE_SCREENING",
}

// ✅ Base shared fields
interface BaseJob {
    id: number;
    slug: string;
    title: string;
    role: string;
    company: string;
    companyLogo?: string;
    website?: string;
    industry?: string;
    size?: string;
    location: string;
    time: string;
    type: string; // e.g., "Full-time", "Part-time"
    mode: "REMOTE" | "HYBRID" | "ONSITE";
    deadline?: string;
    salary?: string;
    skills: string[];
    certifications?: string[];
    description: string;
    experienceLevel?: "ENTRY" | "MID" | "SENIOR";
    postedAt?: string | Date;
}

// ✅ DIRECT jobs: no applyUrl, no questions
export interface DirectJob extends BaseJob {
    applyType: ApplyType.DIRECT;
}

// ✅ EXTERNAL jobs: must have applyUrl
export interface ExternalJob extends BaseJob {
    applyType: ApplyType.EXTERNAL;
    applyUrl: string;
}

// ✅ PRE_SCREENING jobs: must have questions
export interface PreScreeningJob extends BaseJob {
    applyType: ApplyType.PRE_SCREENING;
    questions: string[];
}

// ✅ Union of all jobs
export type Job = DirectJob | ExternalJob | PreScreeningJob;

// Response for a single job detail
export interface JobDetailResponse {
    data: {
        data: Job; // ✅ matches the nested structure
    };
}