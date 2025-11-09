"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, useAppDispatch } from "@/lib/feature/store";
import AuthInitializer from "@/app/auth-initializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthInitializer />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
