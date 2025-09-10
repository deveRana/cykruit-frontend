// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const url = req.nextUrl;

    // If no refresh token → block protected routes
    if (!refreshToken) {
        if (url.pathname.startsWith("/employer")) {
            return NextResponse.redirect(new URL("/login?role=employer", req.url));
        }

        if (url.pathname.startsWith("/seeker")) {
            return NextResponse.redirect(new URL("/login?role=seeker", req.url));
        }
    }

    return NextResponse.next();
}

// Configure which routes should be protected
export const config = {
    matcher: ["/employer/:path*", "/seeker/:path*"],
};
