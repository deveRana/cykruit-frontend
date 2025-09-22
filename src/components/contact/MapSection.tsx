"use client";

import React from "react";

const MapSection = () => {
    return (
        <section className="relative w-full py-16 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                        Find Us on the <span className="text-[#0062FF]">Map</span>
                    </h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Visit our office or get in touch.
                    </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1895820791888!2d73.91514447496299!3d18.520333082573202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1c74d38dbf9%3A0x58b93c5952957025!2sRivedix%20Technology%20Solutions!5e0!3m2!1sen!2sin!4v1758541768134!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
