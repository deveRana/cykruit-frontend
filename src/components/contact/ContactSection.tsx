import React from 'react'

const ContactSection = () => {
    return (
        <div className="relative h-96 flex flex-col items-center justify-center px-4 sm:px-10 text-foreground">
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/70" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
                {/* Hero Section */}
                <div className="max-w-3xl text-center space-y-4 sm:space-y-6 px-2 sm:px-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-snug sm:leading-tight md:leading-tight">
                        Let's Talk{" "}
                        <span className="text-[#0142D3] font-bold">Security</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-[#414141] font-light">
                        Whether you're hiring, getting hired, or looking to partner —we're here to help.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ContactSection