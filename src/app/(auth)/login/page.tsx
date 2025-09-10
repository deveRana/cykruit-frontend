// Login page
"use client";

import Loader from "@/components/micro-interactions/loaders/Loader";
import dynamic from "next/dynamic";
// import AuthGuard from "@/lib/auth/AuthGuard";

const LoginComponent = dynamic(() => import("./LoginComponent"), {
    ssr: false,
    loading: () => <Loader />,
});

export default function LoginPage() {
    return (
        <>
            <div className="min-h-screen relative">
                <LoginComponent />
            </div>
        </>
    );
}
