"use client";

import React, { useState } from "react";
import { useMessageModal } from "../common/MessageModal";

export default function CtaBanner() {
    const { showMessage } = useMessageModal();
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        // Simple email regex for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            showMessage("error", "Please enter a valid email address.");
            return;
        }

        // You can add backend API call here

        showMessage("success", "Thank you for subscribing! You will now receive weekly insights.");
        setEmail(""); // Clear input after success
    };

    return (
        <section className="relative w-full py-24 bg-[#0062FF] text-white overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute inset-0 z-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,106.7C840,96,960,128,1080,144C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        fill="#FFFFFF"
                    ></path>
                </svg>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* Heading and Description */}
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                    Stay Ahead of Cyber Trends
                </h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto">
                    Subscribe to weekly insights, job alerts, and threat intel.
                </p>

                {/* Subscription Form */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:w-auto flex-grow px-4 py-3 text-gray-800 rounded-md bg-white"
                    />
                    <button
                        onClick={handleSubscribe}
                        className="w-full sm:w-auto px-8 py-3 bg-white text-[#0062FF] font-semibold rounded-md shadow-md hover:bg-[#0062FF] hover:text-white transition-colors"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
}
