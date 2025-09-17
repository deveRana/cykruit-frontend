"use client";
import { ReactNode } from "react";
import { useBroadcastLogoutListener } from "@/lib/hooks/useBroadcastLogoutListener";

export function RootLayoutInner({ children }: { children: ReactNode }) {
    useBroadcastLogoutListener(); // hook handles all cross-tab logout

    return <>{children}</>;
}
