"use client";

import { useState } from "react";
import { useMessageModal } from "../common/MessageModal";

export default function SubscribeSection() {
    const { showMessage } = useMessageModal();
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            // Show error if email is empty or invalid
            showMessage("error", "Please enter a valid email address.");
            return;
        }

        // You can add backend API call here

        // Show success message
        showMessage("success", "Thank you for subscribing! You will now receive weekly updates.");
        setEmail(""); // Clear input after success
    };

    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Heading and Description */}
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                    Stay Ahead of <span className="text-[#0062FF]">the Cyber Curve</span>
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg sm:text-xl">
                    Get weekly updates on new job listings, hiring trends, and security career tips.
                </p>

                {/* Subscription Form */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:flex-1 pl-4 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0062FF] transition"
                    />
                    <button
                        onClick={handleSubscribe}
                        className="w-full sm:w-auto px-8 py-3 bg-[#0062FF] text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
}
