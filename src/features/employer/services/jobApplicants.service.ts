import client from "@/lib/api/client";
import { Applicant, ApplicationDetails, ApplicationHistory, ApplicationStatus } from "../types/applicants";

// ---------------------- JOB APPLICANTS APIs ----------------------

// ✅ Get all applicants for a job (with optional filters)
export const getApplicantsByJob = async (
    jobId: string | number,
    params?: { status?: string; skill?: string; dateFrom?: string; dateTo?: string }
) => {
    const res = await client.get(`/employer/applicants/${jobId}`, { params });
    return res.data.data.applicants as Applicant[];
};

// ✅ Get single application details
export const getApplicationDetails = async (applicationId: string | number) => {
    const res = await client.get(`/employer/applicants/application/${applicationId}`);
    return res.data as ApplicationDetails;
};

// ✅ Get stage history
export const getApplicationHistory = async (applicationId: string | number) => {
    const res = await client.get(`/employer/applicants/application/${applicationId}/history`);
    return res.data as ApplicationHistory[];
};

// ✅ Add note to application
export const addApplicationNote = async (applicationId: string | number, note: string) => {
    const res = await client.post(`/employer/applicants/application/${applicationId}/notes`, { note });
    return res.data;
};

// ✅ Delete all notes for application
export const deleteApplicationNotes = async (applicationId: string | number) => {
    const res = await client.delete(`/employer/applicants/application/${applicationId}/notes`);
    return res.data;
};

// ✅ Update application status (SHORTLISTED / REJECTED / HIRED)
export const updateApplicationStatus = async (
    applicationId: string | number,
    status: ApplicationStatus
) => {
    const res = await client.patch(`/employer/applicants/application/${applicationId}/status`, { status });
    return res.data;
};
