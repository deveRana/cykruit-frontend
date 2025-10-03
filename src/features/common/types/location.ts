// src/features/common/types/location.ts

export interface MapboxFeature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
        mapbox_id?: string;
        wikidata?: string;
    };
    text: string;
    place_name: string;
    center: [number, number]; // [longitude, latitude]
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    context?: Array<{
        id: string;
        text: string;
        short_code?: string;
    }>;
}

export interface MapboxResponse {
    type: string;
    query: string[];
    features: MapboxFeature[];
    attribution: string;
}

export interface LocationData {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    fullAddress: string;
}

export interface LocationSearchPayload {
    query: string;
    types?: string[]; // e.g., ['place', 'locality', 'neighborhood']
    limit?: number;
}

export interface LocationSuggestion {
    id: string;
    city: string;
    state: string;
    country: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
}