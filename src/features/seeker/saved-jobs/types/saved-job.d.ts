// Saved job type
export interface SavedJob {
    id: string;            // ID of the saved job record
    jobId: string;         // ID of the job
    createdAt: string;     // Timestamp when it was saved
    job: JobDetails;       // Job details included from backend
}

// Minimal Job details (adjust according to backend response)
export interface JobDetails {
    id: string;
    title: string;
    companyName: string;
    location?: string;
    employmentType?: string;
    postedAt?: string;
    // add more fields as per your Job model
}
