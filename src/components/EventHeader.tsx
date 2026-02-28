"use client";

import { useState, useEffect } from "react";

const EventHeader = () => {
    const [glitchActive, setGlitchActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center relative py-12 md:py-20">
            {/* Subtle glow behind the title */}
            <div className="absolute inset-0 blur-3xl bg-linear-to-r from-gray-700/10 via-white/5 to-gray-700/10 animate-pulse-glow" />

            <div className="relative z-10">
                {/* Logo / Branding area */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-sm md:text-base font-(--font-space-mono) text-gray-400 tracking-[0.4em] uppercase">
                        Hackathon Hub presents
                    </span>
                </div>

                {/* Main title */}
                <h1
                    className={`text-5xl md:text-7xl lg:text-9xl font-black
                     tracking-wider mb-2 ${glitchActive ? "animate-glitch" : ""}`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                >
                    <span className="text-white">Hack</span>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                        {"</>"}
                    </span>
                </h1>
                <h1
                    className={`text-5xl md:text-7xl lg:text-9xl font-black
                     tracking-wider mb-4 steel-text-glow ${glitchActive ? "animate-glitch" : ""}`}
                    style={{ fontFamily: "var(--font-orbitron)" }}
                >
                    <span className="text-transparent bg-clip-text bg-linear-to-br from-gray-100 via-gray-300 to-gray-500">
                        Talk
                    </span>
                    <span className="text-emerald-400 text-4xl md:text-5xl lg:text-6xl align-top">🎙</span>
                </h1>

                {/* Year badge */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-16 bg-linear-to-r from-transparent to-gray-500" />
                    <span className="text-2xl md:text-3xl font-(--font-orbitron) text-gray-300 tracking-[0.3em]">
                        2026
                    </span>
                    <div className="h-px w-16 bg-linear-to-l from-transparent to-gray-500" />
                </div>

                {/* Tagline */}
                <div className="space-y-3 max-w-2xl mx-auto">
                    <p className="text-sm md:text-lg font-(--font-space-mono) text-gray-300 tracking-[0.2em] uppercase">
                        Real Stories from Real Hackathon Veterans
                    </p>
                </div>

                {/* "Coming Soon" badge */}
                <div className="mt-10 inline-block">
                    <div className="px-8 py-3 rounded-full border border-gray-600/50 bg-gray-900/50 backdrop-blur-sm">
                        <span className="text-xs md:text-sm font-(--font-space-mono) text-emerald-400 tracking-[0.3em] uppercase">
                            Registrations Open
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHeader;
