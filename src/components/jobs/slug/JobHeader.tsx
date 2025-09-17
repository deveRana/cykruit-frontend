import React from "react";
import { FiStar } from "react-icons/fi";

interface JobDetail {
    id: string | number;
    title: string;
    companyName: string;
    isFeatured?: boolean;
}

interface JobHeaderProps {
    jobDetail: JobDetail;
}

const JobHeader: React.FC<JobHeaderProps> = ({ jobDetail }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#0F123F]">{jobDetail.title}</h1>
                <p className="text-gray-500 mt-1 text-lg">{jobDetail.companyName}</p>
            </div>
            {jobDetail.isFeatured && (
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full font-semibold text-sm shadow-md">
                    <FiStar /> Featured
                </span>
            )}
        </div>
    );
};

export default JobHeader;
