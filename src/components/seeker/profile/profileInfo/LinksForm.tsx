"use client";
import React from "react";

interface Links {
    github?: string;
    linkedin?: string;
    personalWebsite?: string;
}

interface Props {
    links: Links;
    setLinks: React.Dispatch<React.SetStateAction<Links>>;
    onSave: () => void;
}

const LinksForm: React.FC<Props> = ({ links, setLinks, onSave }) => {
    return (
        <div className="space-y-4">
            {/* GitHub */}
            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">GitHub</label>
                <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={links.github}
                    onChange={(e) => setLinks({ ...links, github: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F123F]"
                />
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">LinkedIn</label>
                <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={links.linkedin}
                    onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F123F]"
                />
            </div>

            {/* Website */}
            <div className="flex flex-col">
                <label className="text-gray-600 font-medium">Website</label>
                <input
                    type="url"
                    placeholder="https://example.com"
                    value={links.personalWebsite}
                    onChange={(e) => setLinks({ ...links, personalWebsite: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F123F]"
                />
            </div>

            <button
                onClick={onSave}
                className="w-full py-3 bg-[#0F123F] text-white font-semibold rounded-xl hover:bg-[#1a1a3f] transition"
            >
                Save Links
            </button>
        </div>
    );
};

export default LinksForm;
