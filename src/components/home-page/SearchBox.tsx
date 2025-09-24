"use client";

import React, { useState } from "react";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

export default function SearchBox() {
    const { roles, skills, locations } = useMasterData();

    // Prepare options
    const roleOptions = roles?.map((r: any) => r.name) ?? [];
    const skillOptions = skills?.map((s: any) => s.name) ?? [];
    const locationOptions =
        locations?.map((loc: any) => `${loc.city}, ${loc.state}, ${loc.country}`) ?? [];

    // Merge all suggestions
    const allOptions = [...roleOptions, ...skillOptions, ...locationOptions];

    const [inputValue, setInputValue] = useState("");
    const [filtered, setFiltered] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        if (val.trim() === "") {
            setFiltered([]);
            return;
        }

        const matches = allOptions.filter((s) =>
            s.toLowerCase().includes(val.toLowerCase())
        );
        setFiltered(matches);
    };

    const handleSelect = (val: string) => {
        setInputValue(val);
        setFiltered([]);
    };

    return (
        <div className="mt-10 w-full max-w-4xl p-1 bg-white rounded shadow-xl relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-4 sm:gap-4">
                <div className="relative col-span-3">
                    <input
                        type="text"
                        placeholder="e.g. Security Analyst, Penetration Tester, Pune"
                        value={inputValue}
                        onChange={handleChange}
                        className="w-full text-sm rounded-xl px-4 py-3 outline-none transition-all"
                    />

                    {filtered.length > 0 && (
                        <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto z-20">
                            {filtered.map((item) => (
                                <li
                                    key={item}
                                    onClick={() => handleSelect(item)}
                                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer transition-colors"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Search Button */}
                <button className="w-full col-span-1 bg-blue-600 text-white hover:bg-blue-700 rounded font-semibold px-4 py-3 sm:py-2 transition-all shadow-md">
                    Search
                </button>
            </div>
        </div>
    );
}
