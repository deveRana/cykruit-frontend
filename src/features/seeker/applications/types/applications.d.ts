// src/features/seeker/applications/types/applications.d.ts

export interface ApplicationAnswer {
    questionId: bigint;
    answer: string | string[] | number;
}

export interface JobApplication {
    id: string;
    uniqueKey: string;
    jobId: string;
    jobSeekerId: string;
    resumeId?: string | null;
    appliedAt: string;
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED' | 'WITHDRAWN';
    source: 'DIRECT' | 'EXTERNAL' | 'PRE_SCREENING';
    priority: 'REGULAR' | 'FEATURED' | 'URGENT';
    coverLetter?: string | null;
    withdrawnAt?: string | null;
    notes?: string | null;
    shortlistedAt?: string | null;
    hiredAt?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    stageHistory?: { status: string; date: string }[];
    job: {
        title: string;
        employer: {
            companyName: string;
        };
    };
    answers?: ApplicationAnswer[];
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
