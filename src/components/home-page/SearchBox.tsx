"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import AutocompleteField from "@/components/forms/AutocompleteField";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

export default function SearchBox() {
    const { skills, roles, locations } = useMasterData();

    const skillOptions = skills?.map((s: any) => s.name) ?? [];
    const roleOptions = roles?.map((r: any) => r.name) ?? [];
    const locationOptions =
        locations?.map((loc: any) => `${loc.city}, ${loc.state}, ${loc.country}`) ?? [];

    return (
        <Card className="mt-10 w-full max-w-5xl p-4 sm:p-6 shadow-xl rounded-2xl bg-white relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Skills */}
                <AutocompleteField
                    label="Skills"
                    placeholder="e.g. Penetration Testing"
                    suggestions={skillOptions}
                />

                {/* Job Roles */}
                <AutocompleteField
                    label="Job Roles"
                    placeholder="e.g. Security Analyst"
                    suggestions={roleOptions}
                />

                {/* Location */}
                <AutocompleteField
                    label="Location"
                    placeholder="Pune, India"
                    suggestions={locationOptions}
                />

                {/* Search Button */}
                <button className="w-full sm:col-span-2 lg:col-span-1 bg-[#0062FF] text-white hover:bg-[#0052cc] rounded-lg h-full sm:h-auto px-4 py-3 sm:py-2">
                    Search
                </button>
            </div>
        </Card>
    );
}
