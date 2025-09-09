"use client"; // ensures this is a Client Component

import Loader from "@/components/micro-interactions/loaders/Loader";
import dynamic from "next/dynamic";

const LoginComponent = dynamic(() => import("./LoginComponent"), {
    ssr: false, // avoid server-side rendering issues and hydration flashes
    loading: () => <Loader fullScreen />, // full-screen loader immediately
});

export default function LoginPage() {
    return (
        <div className="min-h-screen relative">
            <LoginComponent />
        </div>
    );
}
