// ---------------------- Enums ----------------------

export enum ApplyTypeEnum {
    DIRECT = "direct",
    EXTERNAL = "external",
    PRE_SCREENING = "pre-screening",
}

export enum EmploymentTypeEnum {
    FULL_TIME = "full-time",
    PART_TIME = "part-time",
    CONTRACT = "contract",
    INTERNSHIP = "internship",
}

export enum ExperienceLevelEnum {
    ENTRY = "entry",
    MID = "mid",
    SENIOR = "senior",
}

export enum JobStatusEnum {
    DRAFT = "draft",
    ACTIVE = "active",
}

export enum WorkModeEnum {
    ONSITE = "onsite",
    REMOTE = "remote",
    HYBRID = "hybrid",
}

// ---------------------- TYPES ----------------------

export type WorkMode = WorkModeEnum;
export type EmploymentType = EmploymentTypeEnum;
export type ExperienceLevel = ExperienceLevelEnum;
export type ApplyType = ApplyTypeEnum;
export type JobStatus = JobStatusEnum;

// ---------------------- Interfaces ----------------------

export interface LocationInput {
    id?: number;
    city?: string;
    state?: string;
    country?: string;
    fullAddress?: string;
}

export interface CreateJobInput {
    title: string;
    roleId: string | number;
    workMode: string;
    location?: LocationInput | null;
    employmentType: string;
    duration?: string;
    durationUnit?: string;
    description: string;
    certifications?: string[] | number[];
    skills?: string[] | number[];
    experience: string;
    applyType: string;
    applyUrl?: string;
    screeningQuestions?: string[];
    status?: JobStatus;
}

export interface UpdateJobInput extends Partial<CreateJobInput> {}