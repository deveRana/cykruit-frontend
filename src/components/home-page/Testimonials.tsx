"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
    { quote: "We filled 3 security roles in just two weeks! CyberJobs is a game-changer.", name: "Shantanu J.", title: "Security Lead, Rivedix" },
    { quote: "Finally a platform that understands security hiring nuances. Amazing filters!", name: "Akshay K.", title: "Penetration Tester, Rivedix" },
    { quote: "I found my current blue team role here. Seamless experience!", name: "Amrita S.", title: "SOC Analyst, GovSec" },
    { quote: "The pre-vetted profiles saved us countless hours of screening.", name: "Priya L.", title: "HR Director, TechSecure" },
    { quote: "Highly specific job listings that attract top-tier talent. This is a must-have.", name: "Rahul T.", title: "Head of DevOps, InnovateSec" },
    { quote: "Easy to use and full of features. A professional network for cybersecurity.", name: "Ananya B.", title: "CISO, Sentinel Corp." },
];

export default function TestimonialsAndCTA() {
    const swiperRef = useRef<any>(null);

    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-start">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                    What Cyber <span className="text-[#0062FF]">Experts Are Saying</span>
                </h2>
                <p className="text-gray-600 mb-16 max-w-3xl text-base sm:text-lg md:text-xl">
                    A purpose-built platform for cybersecurity recruitment, helping organizations scale securely with the right talent.
                </p>

                {/* Swiper Container */}
                <div className="relative sm:px-10">
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        className="px-2 sm:px-6 md:px-10"
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 15 },
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 25 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index} className="flex justify-center px-2 sm:px-4 py-4">
                                <div className="w-full ">
                                    <Card className="p-8 rounded-3xl shadow-lg hover:shadow-xl bg-white flex flex-col items-center text-center sm:h-[320px]  transition-all duration-300 border-0">
                                        <span className="text-6xl text-gray-300 font-serif mb-4 transform scale-x-[-1] inline-block -rotate-12">
                                            &ldquo;
                                        </span>
                                        <p className="text-gray-800 text-lg mb-4 flex-grow">{testimonial.quote}</p>
                                        <div className="w-16 h-1 bg-gray-200 my-4"></div>
                                        <p className="font-semibold text-lg text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute top-1/2 -left-5 sm:left-0 -translate-y-1/2 p-3 bg-[#0062FF] text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none z-10"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute top-1/2 -right-5 sm:right-0 -translate-y-1/2 p-3 bg-[#0062FF] text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none z-10"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
