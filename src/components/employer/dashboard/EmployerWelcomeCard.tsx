"use client";

import React from "react";

export default function EmployerWelcomeCard() {
    return (
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div>
                <h2 className="text-3xl font-bold tracking-wide">Welcome Back!</h2>
                <p className="mt-2 text-indigo-100">Here’s an overview of your company’s activity today.</p>
            </div>
        </div>
    );
}
