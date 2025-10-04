// src/features/common/services/location.service.ts

import axios from "axios";
import {
    MapboxResponse,
    LocationSearchPayload,
    LocationSuggestion,
    MapboxFeature,
} from "../types/location";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAPBOX_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

// ==========================
// Helper: Parse Mapbox Feature to LocationSuggestion
// ==========================
const parseMapboxFeature = (feature: MapboxFeature): LocationSuggestion => {
    let city = "";
    let state = "";
    let country = "";

    // Extract city
    if (feature.place_type.includes("place")) {
        city = feature.text;
    }

    // Extract state and country from context
    if (feature.context) {
        for (const ctx of feature.context) {
            if (ctx.id.startsWith("region")) {
                state = ctx.text;
            }
            if (ctx.id.startsWith("country")) {
                country = ctx.text;
            }
        }
    }

    // If no city found in place_type, try to extract from place_name
    if (!city && feature.place_type.includes("locality")) {
        city = feature.text;
    }

    return {
        id: feature.id,
        city: city || feature.text,
        state: state || "",
        country: country || "",
        fullAddress: feature.place_name,
        latitude: feature.center[1], // Mapbox returns [lng, lat]
        longitude: feature.center[0],
    };
};

// ==========================
// Search Locations (Autocomplete)
// ==========================
export const searchLocations = async (
    payload: LocationSearchPayload
): Promise<LocationSuggestion[]> => {

    if (!MAPBOX_ACCESS_TOKEN) {
        throw new Error("Mapbox access token is not configured");
    }

    if (!payload.query || payload.query.trim().length === 0) {
        return [];
    }

    try {
        const params = new URLSearchParams({
            access_token: MAPBOX_ACCESS_TOKEN,
            limit: String(payload.limit || 5),
            types: (payload.types || ["place", "locality"]).join(","),
        });

        const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(payload.query)}.json?${params}`;


        const response = await axios.get<MapboxResponse>(url);


        if (!response.data || !response.data.features) {
            throw new Error("Invalid response from Mapbox API");
        }

        const suggestions = response.data.features.map(parseMapboxFeature);


        return suggestions;
    } catch (err) {
        console.error("[ERROR] searchLocations failed:", err);
        if (axios.isAxiosError(err)) {
            console.error("[ERROR] Axios error details:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
        }
        throw err;
    }
};

// ==========================
// Get Location Details by Coordinates
// ==========================
export const getLocationByCoordinates = async (
    longitude: number,
    latitude: number
): Promise<LocationSuggestion | null> => {

    if (!MAPBOX_ACCESS_TOKEN) {
        console.error("[ERROR] Mapbox access token is missing");
        throw new Error("Mapbox access token is not configured");
    }

    try {
        const params = new URLSearchParams({
            access_token: MAPBOX_ACCESS_TOKEN,
            types: "place,locality",
        });

        const url = `${MAPBOX_BASE_URL}/${longitude},${latitude}.json?${params}`;

        const response = await axios.get<MapboxResponse>(url);


        if (!response.data || !response.data.features || response.data.features.length === 0) {
            return null;
        }

        return parseMapboxFeature(response.data.features[0]);
    } catch (err) {
        throw err;
    }
};