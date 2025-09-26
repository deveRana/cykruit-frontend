interface EmployerViewJob {
    id: string;
    title: string;
    location?: {
        city?: string;
        state?: string;
        country?: string;
    };
    role?: {
        name?: string;
        category?: {
            title?: string;
        };
    };
    contractDurationInMonths?: number;
    applyType: string;
    status: string;
    experience: string;
    employmentType: string;
    workMode: string;
    postedAt?: string;
    applicationsCount?: number;
    shortlistedCount?: number;
    hiredCount?: number;
    description: string;
    JobSkill?: { id: string; skill: { name: string } }[];
    jobCertifications?: { id: string; certification: { name: string } }[];
}
