"use client";

import React from "react";

interface ScreeningQuestion {
    id: string;
    question: string;
    required?: boolean;
}

interface ScreeningQuestionsProps {
    questions: ScreeningQuestion[];
    answers: Record<string, string>;
    onChange: (qid: string, value: string) => void;
}

const ScreeningQuestions: React.FC<ScreeningQuestionsProps> = ({ questions, answers, onChange }) => {
    return (
        <div className="flex flex-col gap-4 mt-2">
            <h3 className="text-md font-semibold">Screening Questions</h3>
            {questions.map((q) => (
                <div key={q.id} className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        {q.question} {q.required && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                        value={answers[q.id] || ""}
                        onChange={(e) => onChange(q.id, e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition resize-none"
                        rows={3}
                    />
                </div>
            ))}
        </div>
    );
};

export default ScreeningQuestions;
