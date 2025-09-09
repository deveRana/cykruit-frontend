import client from "@/lib/api/client";

// ---------------------- INPUT TYPES ----------------------
export interface SetupEmployerInput {
    companyName: string;
    contactEmail: string;
    companyWebsite: string;
    companySize: "SMALL" | "MEDIUM" | "LARGE";
    contactName: string;
}

export interface SubmitKycInput {
    panCardUrl?: string;
    incorporationCertUrl?: string;
    gstCertUrl?: string;
    otherDocs?: string[];
}

export interface RejectKycInput {
    kycId: string;
    reason: string;
}

// ---------------------- API CALLS ----------------------

// Employer setup
export const setupEmployer = async (data: SetupEmployerInput) => {
    const res = await client.post("/employer/setup", data);
    return res.data;
};

// Submit KYC
export const submitKyc = async (data: SubmitKycInput) => {
    const res = await client.post("/employer/kyc", data);
    return res.data;
};

// Get current employer KYC status
export const getEmployerStatus = async () => {
    const res = await client.get("/employer/status");
    return res.data;
};

// Get onboarding redirect URL
export const getOnboardingRedirect = async () => {
    const res = await client.get("/employer/onboarding-redirect");
    return res.data;
};

// Optional admin actions
export const approveKyc = async (kycId: string) => {
    const res = await client.post("/employer/admin/kyc/approve", { kycId });
    return res.data;
};

export const rejectKyc = async (data: RejectKycInput) => {
    const res = await client.post("/employer/admin/kyc/reject", data);
    return res.data;
};
