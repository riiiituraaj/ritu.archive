import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: ["italic"], variable: "--instrument-serif" });

export const metadata: Metadata = {
  title: "Ritu Raj Bora | Product Designer & Frontend Developer",
  description: "Ritu Raj Bora is a product designer, frontend developer, graphic designer and video editor working across design, code and visual storytelling.",
  metadataBase: new URL("https://riturajbora.com"),
  alternates: { canonical: "/" },
  openGraph: { title: "Ritu Raj Bora | Product Designer & Frontend Developer", description: "Design × Code × Visual Storytelling × Motion", type: "website", url: "https://riturajbora.com" },
  twitter: { card: "summary_large_image", title: "Ritu Raj Bora | Product Designer & Frontend Developer", description: "Design × Code × Visual Storytelling × Motion" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={instrumentSerif.variable}>{children}</body></html>;
}
