"use client";

import { useQuery } from "@tanstack/react-query";
import {
    getAllSkills,
    getAllCertifications,
    getAllRoles,
    getAllLocations,
} from "@/features/employer/services/masterData.service";

export function useMasterData() {
    const { data: skills, isLoading: isSkillsLoading } = useQuery({
        queryKey: ["meta-skills"],
        queryFn: getAllSkills,
        staleTime: 1000 * 60 * 10,
    });

    const { data: certifications, isLoading: isCertificationsLoading } = useQuery({
        queryKey: ["meta-certifications"],
        queryFn: getAllCertifications,
        staleTime: 1000 * 60 * 10,
    });

    const { data: roles, isLoading: isRolesLoading } = useQuery({
        queryKey: ["meta-roles"],
        queryFn: getAllRoles,
        staleTime: 1000 * 60 * 10,
    });

    const { data: locations, isLoading: isLocationsLoading } = useQuery({
        queryKey: ["meta-locations"],
        queryFn: getAllLocations,
        staleTime: 1000 * 60 * 10,
    });

    return {
        skills,
        isSkillsLoading,
        certifications,
        isCertificationsLoading,
        roles,
        isRolesLoading,
        locations,
        isLocationsLoading,
    };
}
