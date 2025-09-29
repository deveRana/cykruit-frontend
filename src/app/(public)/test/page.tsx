"use client";

import KYCForm from "@/components/kyc/kyc-basic-details/kyc-form";
import KYCInfoBox from "@/components/kyc/kyc-basic-details/kyc-info-box";
import KYCNavbar from "@/components/kyc/layout/kyc-navbar";
import KYCProgressSteps from "@/components/kyc/layout/kyc-progress-steps";
import React from "react";
const KYCBasicDetails = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <KYCNavbar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <KYCProgressSteps step={1} />
                <KYCForm />
                <KYCInfoBox />
            </main>
        </div>
    );
};

export default KYCBasicDetails;