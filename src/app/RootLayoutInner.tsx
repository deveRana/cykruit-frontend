"use client";
import { ReactNode } from "react";
import { useBroadcastAuthListener } from "@/lib/hooks/useBroadcastAuthListener";

export function RootLayoutInner({ children }: { children: ReactNode }) {
    useBroadcastAuthListener(); // now handles login + logout cross-tab

    return <>{children}</>;
}
