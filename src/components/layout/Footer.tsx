"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-white text-gray-800 py-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
                    {/* Column 1: Contact Info */}
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="w-12 h-12 bg-[#0062FF] rounded-md flex items-center justify-center text-white text-xl font-bold mb-4">
                            C
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-gray-600">
                            <Mail size={18} />
                            <p>info@rivedix.com</p>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-gray-600">
                            <Phone size={18} />
                            <p>+91 8788089916</p>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-gray-600">
                            <MapPin size={18} />
                            <p>Somewhere in the World</p>
                        </div>
                    </div>

                    {/* Column 2: Home Links */}
                    <div className="mt-8 sm:mt-0">
                        <h4 className="font-semibold text-lg mb-4">Home</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <Link href="#" className="hover:text-[#0062FF] transition-colors">How Works</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-[#0062FF] transition-colors">Our Blog</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-[#0062FF] transition-colors">Our Testimonials</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-[#0062FF] transition-colors">Our FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: About Us Links */}
                    <div className="mt-8 md:mt-0">
                        <h4 className="font-semibold text-lg mb-4">About Us</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <Link href="#" className="hover:text-[#0062FF] transition-colors">Company</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-[#0062FF] transition-colors">Our Goals</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Profiles */}
                    <div className="mt-8 md:mt-0">
                        <h4 className="font-semibold text-lg mb-4">Social Profiles</h4>
                        <div className="flex justify-center sm:justify-start gap-4">
                            <Link href="#" className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>© 2025 Cykruit.</p>
                </div>
            </div>
        </footer>
    );
}
