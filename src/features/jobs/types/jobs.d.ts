// src/features/jobs/types/jobs.d.ts

export interface Job {
    id: string; // backend returns string
    title: string;
    slug: string;
    companyName: string;
    companyLogo?: string | null;
    location: string; // single string like "London"
    workMode: "REMOTE" | "HYBRID" | "ONSITE";
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
    salaryMin: number;
    salaryMax: number;
    currency: string; // e.g., "GBP"
    postedAt: Record<string, unknown>; // currently {}
    isFeatured?: boolean; // only in list response
    isUrgent?: boolean; // only in list response
}

export interface JobDetail extends Job {
    experience: string; // e.g., "SENIOR"
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits?: string[];
    validTill: Record<string, unknown>; // currently {}
    applyType: "DIRECT" | "EXTERNAL";
    applyUrl?: string | null;
    applicationEmail?: string | null;
    tags?: string[];
    technologies?: string[];
}

export interface JobFilters {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    location?: string;
    employmentType?: string;
    workMode?: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
}

export interface JobResponse<T> {
    data: T[];
    pagination: Pagination;
}
