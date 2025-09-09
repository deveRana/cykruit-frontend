import React from "react";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-20 gap-10 bg-background text-foreground transition-colors duration-300">
            {/* Hero Section */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-foreground mb-4">
                Welcome to <span>Cykruit</span>
            </h1>

            <p className="text-center text-lg sm:text-xl max-w-xl text-muted-foreground mb-6">
                Find the best cybersecurity jobs or hire top talent all in one
                platform. Start exploring today!
            </p>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap justify-center mt-6">
                <a
                    href="/login?role=seeker"
                    className="px-6 py-2 rounded-lg font-semibold shadow-md bg-primary text-primary-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    target="_blank"
                >
                    Find Jobs
                </a>

                <a
                    href="/login?role=employer"
                    className="px-6 py-2 rounded-lg font-semibold border border-primary text-primary bg-background transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground"
                    target="_blank"
                >
                    Post a Job
                </a>
            </div>

            {/* Decorative Pulse Bar */}
            <div className="mt-10 w-16 h-1 rounded-lg bg-primary animate-pulse" />
        </div>
    );
}
