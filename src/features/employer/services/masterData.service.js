import client from "@/lib/api/client";

// ---------------------- MASTER DATA APIs ----------------------
export const getAllSkills = async () => {
    const res = await client.get("/meta/skills");
    return res.data.data;
};

export const getAllCertifications = async () => {
    const res = await client.get("/meta/certifications");
    return res.data.data;
};

export const getAllRoles = async () => {
    const res = await client.get("/meta/roles");
    return res.data.data;
};

// ✅ NEW: Get all locations
export const getAllLocations = async () => {
    const res = await client.get("/meta/locations");
    return res.data.data;
};
