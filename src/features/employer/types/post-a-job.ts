// ---------------------- TYPES ----------------------

export type WorkMode = WorkModeEnum;
export type EmploymentType = EmploymentTypeEnum;
export type ExperienceLevel = ExperienceLevelEnum;
export type SalaryType = SalaryTypeEnum;
export type Currency = CurrencyEnum;
export type ApplyType = ApplyTypeEnum;
export type JobStatus = JobStatusEnum;

// ---------------------- Enums ----------------------

export enum ApplyTypeEnum {
    DIRECT = "DIRECT",
    EXTERNAL = "EXTERNAL",
    PRE_SCREENING = "PRE_SCREENING",
}

export enum CurrencyEnum {
    INR = "INR",
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
}

export enum EmploymentTypeEnum {
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
    CONTRACT = "CONTRACT",
    INTERNSHIP = "INTERNSHIP",
}

export enum ExperienceLevelEnum {
    ENTRY = "ENTRY",
    MID = "MID",
    SENIOR = "SENIOR",
}

export enum JobStatusEnum {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    EXPIRED = "EXPIRED",
    ARCHIVED = "ARCHIVED",
}

export enum SalaryTypeEnum {
    ANNUAL = "ANNUAL",
    MONTHLY = "MONTHLY",
    HOURLY = "HOURLY",
}

export enum WorkModeEnum {
    ONSITE = "ONSITE",
    REMOTE = "REMOTE",
    HYBRID = "HYBRID",
}

// ---------------------- Interfaces ----------------------

export interface ScreeningQuestionInput {
    question: string;
    type: "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "RADIO";
    options?: string[];
    required?: boolean;
}

export interface CreateJobInput {
    title: string;
    workMode: WorkMode;
    employmentType: EmploymentType;
    experience?: ExperienceLevel; // optional like backend
    validTill: string; // ISO string
    description: string;
    applyType: ApplyType;
    applyUrl?: string; // required if applyType = EXTERNAL
    jobCategoryId?: number;
    locationId?: number; // required if ONSITE/HYBRID
    status?: JobStatus;
    roleId: number;
    certifications?: number[];
    skills?: number[];
    contractDurationInMonths?: number; // for CONTRACT/FREELANCE
    screeningQuestions?: ScreeningQuestionInput[];
}

export interface UpdateJobInput extends Partial<CreateJobInput> {
    screeningQuestions?: ScreeningQuestionInput[];
}
