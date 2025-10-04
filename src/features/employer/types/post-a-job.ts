// ---------------------- Enums (MUST match backend exactly) ----------------------
export enum ApplyTypeEnum {
    DIRECT = "DIRECT",
    EXTERNAL = "EXTERNAL",
    PRE_SCREENING = "PRE_SCREENING",
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

export enum WorkModeEnum {
    ONSITE = "ONSITE",
    REMOTE = "REMOTE",
    HYBRID = "HYBRID",
}

export enum QuestionTypeEnum {
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    SHORT_ANSWER = "SHORT_ANSWER",
}

// ---------------------- Type Aliases ----------------------
export type WorkMode = WorkModeEnum;
export type EmploymentType = EmploymentTypeEnum;
export type ExperienceLevel = ExperienceLevelEnum;
export type ApplyType = ApplyTypeEnum;
export type JobStatus = JobStatusEnum;
export type QuestionType = QuestionTypeEnum;

// ---------------------- Interfaces ----------------------
export interface LocationInput {
    city?: string;
    state?: string;
    country?: string;
    fullAddress?: string;
    latitude?: number;
    longitude?: number;
}

export interface ScreeningQuestionInput {
    question: string;
    type: QuestionTypeEnum;
    options?: string[];
    required: boolean;
}

export interface CreateJobInput {
    title: string;
    roleId: number;
    workMode: WorkModeEnum;
    location?: LocationInput | null;
    employmentType: EmploymentTypeEnum;
    contractDurationInMonths?: number | null;
    description: string;
    certifications?: number[];
    skills?: number[];
    experience: ExperienceLevelEnum;
    applyType: ApplyTypeEnum;
    applyUrl?: string | null;
    screeningQuestions?: ScreeningQuestionInput[];
    status?: JobStatusEnum;
}

export interface UpdateJobInput extends Partial<CreateJobInput> {}