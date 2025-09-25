
export interface ApplicationAnswer {
    questionId: bigint;
    answer: string | string[] | number;
}


export interface JobApplicationSummary {
    job: {
        title: string;
        employer: {
            companyName: string;
        };
        slug: string; // or URL if you prefer
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
