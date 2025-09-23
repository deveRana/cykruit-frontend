export interface Job {
  id: number;
  title: string;
  slug: string;
  company: string;
  location: string;
  mode: "REMOTE" | "HYBRID" | "ONSITE";
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
  experienceLevel: "ENTRY" | "MID" | "SENIOR";
  postedAt?: string | Date;
  description?: string;
}

export interface JobFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: Job["type"];
  location?: string;
  experience?: Job["experienceLevel"];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface BackendFilters {
  types: Partial<Record<Job["type"], number>>;
  modes: Partial<Record<Job["mode"], number>>;
  locations: Record<string, number>;
  experienceLevels: Partial<Record<Job["experienceLevel"], number>>;
}

export interface JobResponse<T> {
  data: T[];
  pagination: Pagination;
  filters: BackendFilters;
}
