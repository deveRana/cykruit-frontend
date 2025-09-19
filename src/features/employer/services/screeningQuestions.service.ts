// src/features/employer/services/screeningQuestions.service.ts
import client from "@/lib/api/client";
import { ScreeningQuestionInput } from "../types/post-a-job";

// ---------------------- TYPES ----------------------

export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "RADIO";


export interface UpdateScreeningQuestionInput {
    question?: string;
    type?: QuestionType;
    options?: string[];
    required?: boolean;
}



// ---------------------- API CALLS ----------------------

// Create a screening question for a job
export const createScreeningQuestion = async (
    jobId: string | number,
    data: ScreeningQuestionInput
) => {
    const res = await client.post(`/jobs/screening-questions/${jobId}`, data);
    return res.data;
};

// Get all screening questions for a job
export const getScreeningQuestionsByJob = async (jobId: string | number) => {
    const res = await client.get(`/jobs/screening-questions/${jobId}`);
    return res.data;
};

// Get a single screening question by ID
export const getScreeningQuestion = async (id: string | number) => {
    const res = await client.get(`/jobs/screening-questions/question/${id}`);
    return res.data;
};

// Update a screening question
export const updateScreeningQuestion = async (
    id: string | number,
    data: UpdateScreeningQuestionInput
) => {
    const res = await client.patch(`/jobs/screening-questions/${id}`, data);
    return res.data;
};

// Delete a screening question
export const deleteScreeningQuestion = async (id: string | number) => {
    const res = await client.delete(`/jobs/screening-questions/${id}`);
    return res.data;
};
