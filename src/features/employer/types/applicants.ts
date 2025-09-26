// ---------------------- JOB APPLICANTS TYPES ----------------------

export type ApplicationStatus = "APPLIED" | "SHORTLISTED" | "REJECTED" | "HIRED";

export interface Resume {
  url: string;
  fileName: string;
}

export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  skills: string[];
  resumes: Resume[];
  appliedAt: string; // ISO date
  status: ApplicationStatus;
}

// For getApplicationDetails response
export interface ApplicationDetails {
  id: string;
  fullName: string;
  email: string;
  skills: string[];
  resumes: Resume[];
  appliedAt: string;
  status: ApplicationStatus;
  notes?: string[]; // depends on backend shape
}

// For getApplicationHistory response
export interface ApplicationHistory {
  id: string;
  applicationId: string;
  status: ApplicationStatus;
  changedAt: string; // ISO date
  changedBy: string; // employerId or user info
}
