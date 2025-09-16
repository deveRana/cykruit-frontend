// ==========================
// Saved job type definitions
// ==========================

export interface SavedJob {
    id: string;            // ID of the saved job record
    jobSeekerId: string;   // Seeker who saved it
    jobId: string;         // ID of the job
    createdAt: string;     // Timestamp when it was saved
    job: JobDetails;       // Embedded job details
}

// Job details (aligned with backend response)
export interface JobDetails {
    id: string;
    slug: string;
    title: string;
    companyName?: string;
    industry?: string;
    workMode?: "REMOTE" | "ONSITE" | "HYBRID";
    employmentType?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | string;
    experience?: string; // e.g., "SENIOR"
    salaryMin?: number;
    salaryMax?: number;
    salaryType?: "ANNUAL" | "MONTHLY" | "HOURLY" | string;
    currency?: string;
    postedAt?: string;

    // Optional additional fields
    description?: string;
    requirements?: string[];
    responsibilities?: string[];
    benefits?: string[];
    educationLevel?: string;
    tags?: string[];
    technologies?: string[];
    location?: string;

    // Meta info
    isFeatured?: boolean;
    isUrgent?: boolean;
    status?: string;
}
