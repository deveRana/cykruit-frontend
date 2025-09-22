"use client";

import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
    {
        id: "01",
        title: "Industry-Specific Profiles",
        desc: "Candidates list certifications like CISSP, OSCP, CEH – matched directly with employers seeking verified skills.",
        highlight: true,
    },
    {
        id: "02",
        title: "Compliance Ready",
        desc: "Audit logs, secure file uploads, and GDPR-ready processes to meet enterprise & government standards.",
        highlight: false,
    },
    {
        id: "03",
        title: "Built-in Screening Tools",
        desc: "Customize your hiring funnel with MCQs, video interviews, and security knowledge assessments.",
        highlight: false,
    },
];

export default function WhyChooseCyberJobs() {
    return (
        <section className="w-full py-16 sm:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center lg:text-start">
                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Why Choose <span className="text-[#0062FF]">Cykruit?</span>
                </h2>
                <p className="text-gray-600 mb-12 sm:mb-14 max-w-3xl text-base sm:text-lg md:text-xl mx-auto lg:mx-0">
                    A purpose-built platform for cybersecurity recruitment, helping organizations scale securely with the right talent.
                </p>

                {/* Features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((f) => (
                        <Card
                            key={f.id}
                            className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer ${f.highlight
                                ? "bg-[#0062FF] text-white shadow-lg"
                                : "bg-gray-50 hover:bg-gray-100"
                                }`}
                        >
                            {/* Feature number */}
                            <span
                                className={`text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 block text-right ${f.highlight ? "text-white/70" : "text-gray-300"
                                    }`}
                            >
                                {f.id}
                            </span>

                            {/* Content */}
                            <div>
                                <h3 className="font-semibold text-xl sm:text-2xl mb-2 sm:mb-3">{f.title}</h3>
                                <p
                                    className={`text-sm sm:text-base md:text-lg leading-relaxed ${f.highlight ? "text-white/90" : "text-gray-700"
                                        }`}
                                >
                                    {f.desc}
                                </p>
                            </div>

                            {/* Arrow button */}
                            <div
                                className={`mt-4 sm:mt-6 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition ${f.highlight
                                    ? "bg-white hover:bg-gray-200"
                                    : "bg-[#0062FF] hover:bg-[#0130a5]"
                                    }`}
                            >
                                <ArrowUpRight
                                    className={`w-5 h-5 sm:w-6 sm:h-6 ${f.highlight ? "text-[#0062FF]" : "text-white"
                                        }`}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
