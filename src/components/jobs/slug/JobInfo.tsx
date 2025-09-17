import React from "react";
import { FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";

// Define a JobDetail type (or import it if already exists in your project)
interface JobDetail {
    location?: string;
    employmentType?: string;
    postedAt?: string | Date;
    currency?: string;
    salaryMin?: number;
    salaryMax?: number;
    workMode?: string;
}

interface JobInfoProps {
    jobDetail: JobDetail;
}

const JobInfo: React.FC<JobInfoProps> = ({ jobDetail }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
            <div className="flex items-center gap-2">
                <FiMapPin className="text-[#0F123F]" />
                {jobDetail.location || "Remote"}
            </div>
            <div className="flex items-center gap-2">
                <FiBriefcase className="text-[#0F123F]" />
                {jobDetail.employmentType || "Full-time"}
            </div>
            <div className="flex items-center gap-2">
                <FiClock className="text-[#0F123F]" />
                {jobDetail.postedAt ? "Recently" : "1 week ago"}
            </div>
            <div className="flex items-center gap-2 font-medium">
                {jobDetail.currency}{" "}
                {jobDetail.salaryMin?.toLocaleString() || "50,000"} -{" "}
                {jobDetail.currency}{" "}
                {jobDetail.salaryMax?.toLocaleString() || "80,000"}
            </div>
            <div className="uppercase text-gray-500 text-sm md:text-base">
                {jobDetail.workMode || "Hybrid"}
            </div>
        </div>
    );
};

export default JobInfo;
