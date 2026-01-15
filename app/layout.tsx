import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "./providers";
import { DemoBanner } from "@/components/DemoBanner";

export const metadata: Metadata = {
  title: "Sand Trap Audit Demo",
  description: "Prototype - no auth, no DB, data resets on refresh"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AppStateProvider>
          <DemoBanner />
          <main className="max-w-6xl mx-auto px-4 py-4">{children}</main>
        </AppStateProvider>
      </body>
    </html>
  );
}

