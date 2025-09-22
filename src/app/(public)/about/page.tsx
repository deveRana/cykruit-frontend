import AboutSection from "@/components/about-page/AboutSection";
import CtaBanner from "@/components/about-page/CtaBanner";
import FeaturesSection from "@/components/about-page/FeaturesSection";
import JoinNetwork from "@/components/about-page/JoinNetwork";
import MissionSection from "@/components/about-page/MissionSection";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function AboutPage() {
    return (
        <>
            <div className="bg-[url('/assets/home/home-page-hero-img.svg')] bg-cover bg-center bg-no-repeat">
                <Navbar />
                <AboutSection />
            </div>
            <MissionSection />
            <FeaturesSection />
            <CtaBanner />
            <JoinNetwork />
        </>
    );
}
