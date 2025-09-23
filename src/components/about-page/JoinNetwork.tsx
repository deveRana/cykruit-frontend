"use client";

import Link from "next/link";
import React from "react";

export default function JoinNetwork() {
    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Heading and Description */}
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                    Ready to Grow <span className="text-[#0062FF]">Your Team?</span>
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
                    Whether you’re hiring top cybersecurity talent or managing your team – Cykruit helps employers scale securely and efficiently.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link
                        href="/login?role=employer"
                        className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-800 font-semibold rounded-md shadow-sm hover:border-[#0062FF] hover:text-[#0062FF] transition-colors text-center"
                    >
                        Sign Up as Employer
                    </Link>
                </div>
            </div>
        </section>
    );
}
