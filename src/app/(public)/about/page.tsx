import React from "react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col items-center px-4 sm:px-20 py-12 gap-12 bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
                About <span className="text-primary">Cykruit</span>
            </h1>

            <p className="text-center text-lg sm:text-xl max-w-3xl text-muted-foreground mb-10">
                Cykruit is a specialized job portal designed exclusively for the
                cybersecurity industry. Our mission is to bridge the gap between top
                cybersecurity professionals and forward-thinking employers.
            </p>

            {/* Mission / Vision */}
            <div className="grid gap-8 sm:grid-cols-2 max-w-5xl">
                <div className="p-6 rounded-2xl shadow-md border bg-card">
                    <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground">
                        To empower cybersecurity professionals by providing them with
                        meaningful career opportunities while helping organizations
                        protect their digital assets.
                    </p>
                </div>

                <div className="p-6 rounded-2xl shadow-md border bg-card">
                    <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground">
                        To become the leading global hub for cybersecurity recruitment,
                        fostering trust, growth, and innovation in the digital world.
                    </p>
                </div>
            </div>

            {/* Decorative */}
            <div className="mt-10 w-16 h-1 rounded-lg bg-primary animate-pulse" />
        </div>
    );
}
