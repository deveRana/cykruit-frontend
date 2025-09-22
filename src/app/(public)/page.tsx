import HeroSection from '@/components/home-page/HeroSection'
import HowItWorks from '@/components/home-page/HowItWorks'
import CTA from '@/components/home-page/CTA'
import WhyChooseCyberJobs from '@/components/home-page/WhyChooseCyberJobs'
import React from 'react'
import Testimonials from '@/components/home-page/Testimonials'
import SubscribeSection from '@/components/home-page/SubscribeSection'
import Navbar from '@/components/layout/Navbar'

const LandingPage = () => {
    return (
        <>
            <div className="bg-[url('/assets/home/home-page-hero-img.svg')] bg-cover bg-center bg-no-repeat">
                <Navbar />
                <HeroSection />
            </div>
            <WhyChooseCyberJobs />
            <HowItWorks />
            <Testimonials />
            <CTA />
            <SubscribeSection />
        </>
    )
}

export default LandingPage