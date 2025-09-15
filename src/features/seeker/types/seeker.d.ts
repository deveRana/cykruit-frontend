// ==========================
// Job Seeker Main Interface
// ==========================
export interface JobSeeker {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    bio?: string;
    profileImage?: string; // Optional profile picture
    skills: Skill[];
    education: Education[];
    experience: Experience[];
    resumes: Resume[];
    certifications: Certification[];
}

// ==========================
// Education
// ==========================
export interface Education {
    id: number;
    degree: string;
    institution: string;
    fieldOfStudy?: string; // Optional field of study
    grade?: string;        // Optional grade
    startDate?: string;    // ISO string
    endDate?: string;      // ISO string
    description?: string;
}

// ==========================
// Experience
// ==========================
export interface Experience {
    id: number;
    title: string;
    company: string;
    startDate?: string; // ISO string
    endDate?: string;   // ISO string
    description?: string;
}

// ==========================
// Skills
// ==========================
export interface Skill {
    id: number;
    name: string;
    proficiencyLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

// ==========================
// Resume
// ==========================
export interface Resume {
    id: number;
    fileName: string;
    url: string;
    uploadedAt: string; // ISO string
}

// ==========================
// Certification
// ==========================
export interface Certification {
    id: number;
    name: string;
    organization?: string;
    issueDate: string;   // ISO string
    expiryDate?: string; // Optional ISO string
    credentialId?: string;
    credentialUrl?: string;
}
