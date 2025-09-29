"use client";

import React from "react";
import { Check } from "lucide-react";

interface KYCProgressStepsProps {
    step: number; // current active step (1, 2, 3)
}

const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "Documents" },
    { id: 3, label: "Verification" },
];

const KYCProgressSteps: React.FC<KYCProgressStepsProps> = ({ step }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between">
                {steps.map((s, index) => {
                    const isCompleted = s.id < step;
                    const isActive = s.id === step;

                    return (
                        <React.Fragment key={s.id}>
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${isCompleted ? "bg-green-500 text-white" : ""}
                    ${isActive ? "bg-blue-600 text-white" : ""}
                    ${!isCompleted && !isActive ? "bg-gray-200 text-gray-500" : ""}
                  `}
                                >
                                    {isCompleted ? <Check className="w-6 h-6" /> : s.id}
                                </div>
                                <span
                                    className={`text-sm font-medium mt-2
                    ${isCompleted ? "text-green-600" : ""}
                    ${isActive ? "text-blue-600" : ""}
                    ${!isCompleted && !isActive ? "text-gray-500" : ""}
                  `}
                                >
                                    {s.label}
                                </span>
                            </div>

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-1 mx-2 
                    ${s.id < step ? "bg-green-500" : "bg-gray-200"}
                  `}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default KYCProgressSteps;