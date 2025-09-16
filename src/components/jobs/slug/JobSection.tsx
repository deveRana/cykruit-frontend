import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const JobSection = ({ title, content }: { title: string; content: string | string[] }) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-3 text-[#0F123F]">{title}</h2>
            {typeof content === "string" ? (
                <p className="whitespace-pre-line leading-relaxed text-gray-700">{content}</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {content.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                            <FiCheckCircle className="text-[#0F123F] mt-1" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobSection;
