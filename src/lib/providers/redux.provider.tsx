"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import Loader from "@/components/micro-interactions/loaders/Loader";

export function ReduxProvider({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loader />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
