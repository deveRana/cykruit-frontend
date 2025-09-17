import React from "react";

export default function EmployerPage() {
    return (
        <div className="min-h-screen flex flex-col items-center px-4 sm:px-20 py-12 gap-12 bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
                Hire Top Cybersecurity Talent with <span className="text-primary">Cykruit</span>
            </h1>

            <p className="text-center text-lg sm:text-xl max-w-2xl text-muted-foreground mb-10">
                Connect with skilled cybersecurity professionals ready to protect and
                strengthen your organization. Posting jobs has never been easier.
            </p>

            {/* Features */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                <div className="p-6 rounded-2xl shadow-md border bg-card hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Targeted Talent Pool</h3>
                    <p className="text-muted-foreground">
                        Access a network of cybersecurity professionals across various
                        specialties.
                    </p>
                </div>

                <div className="p-6 rounded-2xl shadow-md border bg-card hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Quick Job Posting</h3>
                    <p className="text-muted-foreground">
                        Post jobs in minutes and start receiving applications right away.
                    </p>
                </div>

                <div className="p-6 rounded-2xl shadow-md border bg-card hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                    <p className="text-muted-foreground">
                        Our platform helps match you with candidates that best fit your needs.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <a
                href="/login?role=employer"
                className="px-8 py-3 rounded-lg font-semibold shadow-md bg-primary text-primary-foreground transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
                Post Your Job Now
            </a>
        </div>
    );
}
