"use client";
import React, { useState } from "react";
import { useSeekerCertifications } from "@/features/seeker/hooks/useSeekerCertifications";

const CertificationsTab = () => {
    const { certifications, addCertification, removeCertification, isLoading } = useSeekerCertifications();
    const [newCertName, setNewCertName] = useState("");

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
            <div className="space-y-2">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="flex justify-between items-center p-3 border rounded"
                    >
                        <span className="text-[#0F123F]">{cert.name}</span>
                        <button
                            className="px-2 py-1 bg-red-500 text-white rounded"
                            onClick={() => removeCertification(cert.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Add certification and press enter"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && newCertName.trim()) {
                        addCertification({ name: newCertName.trim() });
                        setNewCertName("");
                    }
                }}
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default CertificationsTab;
