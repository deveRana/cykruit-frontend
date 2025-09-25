export interface ApplicationAnswer {
    questionId: bigint;
    answer: string | string[] | number;
}

export interface JobApplication {
    id: string; // comes as string from API
    appliedAt: string; // ISO date string
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED' | 'WITHDRAWN';
    job: {
        id: string;
        title: string;
        slug: string;
        employer: {
            id: string;
            companyName: string;
        };
    };
    resumeId?: string;
    coverLetter?: string;
    source?: 'DIRECT' | 'EXTERNAL' | 'PRE_SCREENING';
    answers?: ApplicationAnswer[];
}

export interface JobApplicationSummary {
    job: {
        title: string;
        employer: {
            companyName: string;
        };
        slug: string;
    };
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED' | 'WITHDRAWN';
    appliedAt: string;
}

export interface ApplyJobPayload {
    jobId: bigint | number | string;
    resumeId?: bigint | number | string;
    coverLetter?: string;
    source?: 'DIRECT' | 'EXTERNAL' | 'PRE_SCREENING';
    answers?: ApplicationAnswer[];
}

export interface WithdrawApplicationPayload {
    applicationId: bigint | number | string;
}
