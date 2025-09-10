"use client";

import Loader from "@/components/micro-interactions/loaders/Loader";
import dynamic from "next/dynamic";

// Dynamically import the RegisterComponent with a smooth full-screen loader
const RegisterComponent = dynamic(() => import("./RegisterComponent"), {
    ssr: false, // ensures it only renders on client, avoids hydration flash
    loading: () => <Loader />, // full-screen loader immediately
});

export default function SignUpPage() {
    return (
        <div className="min-h-screen relative">
            <RegisterComponent />
        </div>
    );
}
