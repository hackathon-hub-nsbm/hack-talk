"use client";

import EventHeader from "@/components/EventHeader";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

// Deterministic particle positions to avoid hydration mismatch from Math.random()
const particles = [
  { left: 5, top: 12, duration: 7.2, delay: 0.3 },
  { left: 15, top: 68, duration: 9.1, delay: 2.1 },
  { left: 25, top: 34, duration: 11.4, delay: 4.5 },
  { left: 38, top: 82, duration: 8.6, delay: 1.7 },
  { left: 48, top: 21, duration: 13.2, delay: 3.9 },
  { left: 55, top: 55, duration: 7.8, delay: 0.8 },
  { left: 62, top: 90, duration: 10.3, delay: 2.6 },
  { left: 72, top: 15, duration: 12.1, delay: 4.2 },
  { left: 80, top: 45, duration: 6.9, delay: 1.1 },
  { left: 88, top: 73, duration: 9.7, delay: 3.4 },
  { left: 10, top: 50, duration: 8.3, delay: 0.6 },
  { left: 33, top: 5, duration: 11.8, delay: 2.9 },
  { left: 67, top: 60, duration: 7.5, delay: 4.8 },
  { left: 92, top: 30, duration: 10.6, delay: 1.5 },
  { left: 45, top: 95, duration: 13.0, delay: 3.2 },
];

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gray-400/20 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-16 animate-fade-in-up">
          <EventHeader />
        </div>

        {/* Registration form */}
        <div
          className="max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <RegistrationForm />
        </div>

        {/* Footer */}
        <div
          className="mt-20 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
