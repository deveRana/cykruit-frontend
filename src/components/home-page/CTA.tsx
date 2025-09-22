"use client";

export default function CTA() {
    return (
        <>
            {/* Call to Action (CTA) Section */}
            <section className="w-full bg-[#0062FF] py-20 relative overflow-hidden clip-top-left-bottom-right">
                <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Join a Platform Trusted by <br className="hidden md:block" /> Cybersecurity Experts
                    </h2>
                    <p className="text-white text-base sm:text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                        Whether you're building a blue team or hunting for a red team role, CyberJobs simplifies your journey.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="w-full sm:w-auto relative px-8 py-3 bg-white text-[#0062FF] font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md">
                            Sign Up Free
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0062FF] transition-colors duration-200 shadow-md">
                            Explore Listings
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
