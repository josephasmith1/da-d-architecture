'use client';

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NimbataProvider } from "@/components/providers/NimbataProvider";
import { GoogleAnalytics } from "@/components/providers/GoogleAnalytics";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem={false}
        themes={["light", "dark"]}
      >
        <GoogleAnalytics />
        <NimbataProvider />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
