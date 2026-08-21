import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { EditModeProvider } from "@/components/EditModeProvider";

export const metadata: Metadata = {
  title: "Sovereign — Personal resilience and the Codex for a rapidly changing world",
  description:
    "Understand what's changing, measure your household's dependence on systems you don't control, and build toward a self-directed life — starting from the individual outward.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <EditModeProvider>
          <Header />
          {children}
          <ExitIntentPopup />
        </EditModeProvider>
      </body>
    </html>
  );
}
