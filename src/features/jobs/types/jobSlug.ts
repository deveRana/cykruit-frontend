// ==========================
// jobs-slug.d.ts
// Centralized Job Types, Filters, and Responses
// ==========================

// ✅ Shared enums / literal types
export type JobMode = "Remote" | "Hybrid" | "Onsite";
export type JobType = "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";
export type ExperienceLevel = "Entry" | "Mid" | "Senior";

export enum ApplyType {
    DIRECT = "DIRECT",
    EXTERNAL = "EXTERNAL",
    PRE_SCREENING = "PRE_SCREENING",
}

// ==========================
// Backend-aligned Job (List View)
// ==========================
export interface BackendJob {
    id: number | string;
    title: string;
    slug: string;
    company: string;
    location: string;
    mode: JobMode;
    type: JobType;
    experienceLevel: ExperienceLevel;
    postedAt?: string | Date;
    description?: string;
}

// ==========================
// Frontend Job Detail (with Apply Types)
// ==========================
export interface BaseJob {
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
    type: JobType;
    mode: JobMode;
    deadline?: string;
    salary?: string;
    skills: string[];
    certifications?: string[];
    description: string;
    experienceLevel?: ExperienceLevel;
    postedAt?: string | Date;
}

export interface DirectJob extends BaseJob {
    applyType: ApplyType.DIRECT;
}

export interface ExternalJob extends BaseJob {
    applyType: ApplyType.EXTERNAL;
    applyUrl: string;
}

export interface PreScreeningJob extends BaseJob {
    applyType: ApplyType.PRE_SCREENING;
    questions: {
        id: number;
        question: string;
        required?: boolean;
    }[];
}

export type DetailedJob = DirectJob | ExternalJob | PreScreeningJob;

// ==========================
// Saved Jobs
// ==========================
// A saved job record stored for a job seeker. `job` may be embedded (full detail or list shape)
// or omitted (if backend returns only ids).
export interface SavedJob {
    id: number | string;          // saved record id
    jobSeekerId: string;          // who saved it
    jobId: number | string;       // referenced job id
    createdAt: string | Date;     // when it was saved
    job?: BackendJob; // optional embedded job (list view or detailed)
}

export interface RawSavedJobsResponse {
    success: boolean;
    statusCode: number;
    data: SavedJob[];
    timestamp?: string;
}

// ==========================
// Filters
// ==========================
export interface JobFilters {
    page?: number;
    limit?: number;
    search?: string;
    type?: JobType;
    location?: string;
    experience?: ExperienceLevel;
}

export interface BackendFilters {
    types: Partial<Record<JobType, number>>;
    modes: Partial<Record<JobMode, number>>;
    locations: Record<string, number>;
    experienceLevels: Partial<Record<ExperienceLevel, number>>;
}

// ==========================
// Pagination
// ==========================
export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
}

// ==========================
// Responses
// ==========================
export interface JobListResponse {
    data: BackendJob[];
    pagination: Pagination;
    filters: BackendFilters;
}

export interface RawJobListResponse {
    success: boolean;
    statusCode: number;
    data: JobListResponse;
    timestamp: string;
}

export interface JobDetailResponse {
    data: {
        data: DetailedJob;
    };
}
