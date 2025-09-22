import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactDetails = () => {
    return (
        <div className="text-center lg:text-left">
            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
                You Will Grow, You Will Succeed.{" "}
                <span className="text-[#0062FF]">We Promise That</span>
            </h2>

            {/* Updated Description */}
            <p className="text-lg text-gray-700 max-w-lg lg:max-w-none mx-auto lg:mx-0 mb-12">
                At <span className="font-semibold text-[#0062FF]">Cykruit</span>, we
                connect top cybersecurity professionals with leading organizations.
                Whether you’re seeking the right opportunity or the right talent, our
                platform ensures a secure, transparent, and efficient process.
            </p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Call */}
                <div className="flex items-center flex-col gap-4 py-6 px-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition">
                    <div className="p-4 rounded-full bg-[#0062FF]/10 text-[#0062FF] flex-shrink-0">
                        <Phone size={28} />
                    </div>
                    <div>
                        <p className="text-gray-600">+91 8857686089</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center flex-col gap-4 py-6 px-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition">
                    <div className="p-4 rounded-full bg-[#0062FF]/10 text-[#0062FF] flex-shrink-0">
                        <Mail size={28} />
                    </div>
                    <div>
                        <p className="text-gray-600">info@cyktuit.com</p>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center flex-col gap-4 py-6 px-3 rounded-2xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition">
                    <div className="p-4 rounded-full bg-[#0062FF]/10 text-[#0062FF] flex-shrink-0">
                        <MapPin size={28} />
                    </div>
                    <div>
                        <p className="text-gray-600">Pune, India</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactDetails;
