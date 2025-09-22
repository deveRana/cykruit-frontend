import React from 'react'
import StatsSection from './StatsSection'

const AboutSection = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 text-foreground">
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/70" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                {/* Hero Section */}
                <div className="max-w-3xl text-center space-y-4 sm:space-y-6 px-2 sm:px-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug sm:leading-tight md:leading-tight">
                        About {" "} <span className="text-[#0142D3] font-bold">Cykruit</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-[#414141] font-light">
                        The first job portal built exclusively for cybersecurity. Whether you're hunting threats or hiring defenders, this is your home.
                    </p>
                </div>
            </div>
            <StatsSection />

        </div>
    )
}

export default AboutSection