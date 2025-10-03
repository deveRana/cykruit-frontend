// src/features/common/hooks/useLocationSearch.ts

import { useQuery, useMutation } from "@tanstack/react-query";
import { searchLocations, getLocationByCoordinates } from "../services/location.service";
import { LocationSearchPayload, LocationSuggestion } from "../types/location";
import { useState } from "react";

export const useLocationSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Search locations (autocomplete)
    const { data: suggestions, isLoading: isSearchLoading } = useQuery<LocationSuggestion[]>({
        queryKey: ["location-search", searchQuery],
        queryFn: () => searchLocations({ query: searchQuery, limit: 5 }),
        enabled: searchQuery.trim().length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Get location by coordinates (reverse geocoding)
    const reverseGeocodeMutation = useMutation({
        mutationFn: ({ longitude, latitude }: { longitude: number; latitude: number }) =>
            getLocationByCoordinates(longitude, latitude),
    });

    const searchMutation = useMutation({
        mutationFn: (payload: LocationSearchPayload) => searchLocations(payload),
    });

    return {
        // Search state
        searchQuery,
        setSearchQuery,
        suggestions: suggestions || [],
        isSearchLoading,

        // Manual search (if needed)
        searchLocations: (payload: LocationSearchPayload) => searchMutation.mutateAsync(payload),
        isManualSearchLoading: searchMutation.isPending,

        // Reverse geocoding
        getLocationByCoordinates: (longitude: number, latitude: number) =>
            reverseGeocodeMutation.mutateAsync({ longitude, latitude }),
        isReverseGeocoding: reverseGeocodeMutation.isPending,

        // Overall loading state
        isLoading: isSearchLoading || searchMutation.isPending || reverseGeocodeMutation.isPending,
    };
};