import type { Metadata } from "next";
import { Space_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Hack Talk 2026 — Where AI Meets Actual Defense",
  description:
    "A discussion about hackathons by previous participants. Organized by Hackathon Hub, NSBM Green University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${orbitron.variable} antialiased select-none bg-[#08080c] text-gray-100 overflow-x-hidden`}
      >
        {/* Dark metallic background gradient */}
        <div className="fixed inset-0 bg-linear-to-br from-gray-950 via-[#0d0d12] to-gray-950 pointer-events-none" />
        <div className="fixed inset-0 tech-grid pointer-events-none opacity-40" />

        {/* Subtle ambient orbs */}
        <div className="fixed top-10 left-10 w-125 h-125 bg-gray-500/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div
          className="fixed bottom-10 right-10 w-100 h-100 bg-emerald-900/5 rounded-full blur-3xl animate-float pointer-events-none"
          style={{ animationDelay: "3s" }}
        />

        {/* Decorative side lines (inspired by the image's right-edge circuit-like elements) */}
        <div className="fixed top-0 right-8 w-px h-full circuit-line pointer-events-none opacity-30" />
        <div className="fixed top-0 right-16 w-px h-2/3 circuit-line pointer-events-none opacity-15" />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
