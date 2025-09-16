"use client";
import React, { useState, useMemo } from "react";
import { useSeekerCertifications } from "@/features/seeker/hooks/useSeekerCertifications";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Loader from "@/components/common/Loader";

const CertificationsTab = () => {
    const { certifications, allCerts, addCertification, removeCertification, isLoading, loader } = useSeekerCertifications();
    const [inputCert, setInputCert] = useState("");

    // Suggestions: filter out already added certs
    const suggestions = useMemo(() => {
        return allCerts
            .filter(
                (c) =>
                    c.name.toLowerCase().includes(inputCert.toLowerCase()) &&
                    !certifications.some((cert) => cert.certId === c.id)
            )
            .slice(0, 10);
    }, [inputCert, allCerts, certifications]);

    const handleAddCert = (certId: string) => {
        addCertification(certId);
        setInputCert("");
    };

    const handleDeleteCert = (userCertId: string) => {
        removeCertification(userCertId);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <Loader />}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Current certifications */}
            <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                    <div
                        key={cert.userCertId}
                        className="flex items-center gap-2 bg-gray-50 border border-[#0F123F] text-[#0F123F] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition"
                    >
                        <span>{cert.name}</span>
                        <FiTrash2
                            className="cursor-pointer text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteCert(cert.userCertId)}
                        />
                    </div>
                ))}
            </div>

            {/* Input */}
            <input
                type="text"
                placeholder="Filter certifications..."
                value={inputCert}
                onChange={(e) => setInputCert(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F123F]"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {suggestions.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => handleAddCert(String(c.id))}
                            className="flex items-center gap-1 bg-[#0F123F] text-white px-3 py-1 rounded-full hover:bg-[#1a1a3f] transition"
                        >
                            {c.name} <FiPlus />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CertificationsTab;
