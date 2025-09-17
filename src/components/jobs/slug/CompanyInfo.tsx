import React from "react";
import { FiGlobe, FiUsers } from "react-icons/fi";

interface Company {
    name: string;
    industry?: string;
    employees?: number;
    website?: string;
}

interface CompanyInfoProps {
    company: Company | null;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ company }) => {
    if (!company) return null;

    return (
        <div className="bg-[#F1F5F9] p-6 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#0F123F] flex items-center justify-center text-white text-xl font-bold">
                    {company.name[0]}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#0F123F]">{company.name}</h3>
                    <p className="text-gray-600 text-sm">
                        {company.industry || "Tech Company"} • {company.employees || "200"} Employees
                    </p>
                </div>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0 md:ml-auto text-gray-700">
                <div className="flex items-center gap-2">
                    <FiGlobe className="text-[#0F123F]" /> {company.website || "www.companywebsite.com"}
                </div>
                <div className="flex items-center gap-2">
                    <FiUsers className="text-[#0F123F]" /> {company.employees || "200"} Employees
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
