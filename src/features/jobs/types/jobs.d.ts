// src/features/jobs/types/jobs.d.ts

export interface Job {
    id: string;
    title: string;
    slug: string;
    companyName: string;
    companyLogo?: string | null;
    location: string;
    workMode: "REMOTE" | "HYBRID" | "ONSITE";
    employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
    salaryMin: number;
    salaryMax: number;
    currency: string;
    postedAt?: string | Date;   // fixed type
    isFeatured?: boolean;
    isUrgent?: boolean;
}

export interface JobDetail extends Job {
    experience: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits?: string[];
    validTill?: string | Date;  // fixed type
    applyType: "DIRECT" | "EXTERNAL";
    applyUrl?: string | null;
    applicationEmail?: string | null;
    tags?: string[];
    technologies?: string[];
    screeningQuestions?: {       // added
        questionId: string | number | bigint;
        question: string;
    }[];
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
