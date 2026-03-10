"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getInviteById, InviteData } from "@/data/invites";
import EventHeader from "@/components/EventHeader";
import Footer from "@/components/Footer";
import QRCode from "react-qr-code";

// Deterministic particle positions to avoid hydration mismatch
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
    { left: 18, top: 88, duration: 8.9, delay: 1.3 },
    { left: 76, top: 7, duration: 10.1, delay: 3.7 },
    { left: 52, top: 42, duration: 9.4, delay: 0.9 },
    { left: 83, top: 62, duration: 11.2, delay: 2.4 },
    { left: 28, top: 78, duration: 7.7, delay: 4.1 },
];

export default function InvitePage() {
    const params = useParams();
    const id = params.id as string;
    const [invite, setInvite] = useState<InviteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const inviteData = getInviteById(id);
        setInvite(inviteData || null);
        setIsLoading(false);

        if (inviteData) {
            initializeCamera();
        }
    }, [id]);

    useEffect(() => {
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [cameraStream]);

    const initializeCamera = async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
            });
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Camera access error:", error);
            setCameraError(
                "Camera access denied or unavailable. Please allow camera permissions to continue."
            );
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        setIsCapturing(true);

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedPhoto(photoDataUrl);

        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
            setCameraStream(null);
        }

        setIsCapturing(false);
    };

    const retakePhoto = () => {
        setCapturedPhoto(null);
        initializeCamera();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4" />
                    <p className="text-gray-400 font-(--font-space-mono)">
                        Loading invitation...
                    </p>
                </div>
            </div>
        );
    }

    if (!invite) {
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

                <div className="container mx-auto px-4 py-8 md:py-16">
                    <div className="text-center animate-fade-in-up">
                        <EventHeader />
                    </div>

                    <div className="max-w-2xl mx-auto mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <div className="relative glass-panel rounded-2xl p-8 md:p-12 steel-shadow steel-border">
                            <div className="text-red-400 text-6xl mb-6">⚠️</div>
                            <h2 className="text-3xl md:text-4xl font-bold steel-text-glow mb-4 tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
                                INVALID INVITATION
                            </h2>
                            <p className="text-gray-400 font-(--font-space-mono) tracking-widest text-sm mb-6">
                                INVITATION CODE NOT RECOGNIZED
                            </p>
                            <p className="text-gray-500 font-(--font-space-mono) text-sm">
                                The invitation code you entered is not valid. Please verify the
                                URL and contact the organizers if you believe this is an error.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }

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

            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Header */}
                <div className="mb-16 animate-fade-in-up">
                    <EventHeader />
                </div>

                {/* Invitation Card */}
                <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <div className="relative glass-panel rounded-2xl p-8 md:p-12 steel-shadow steel-border">
                        {/* Ambient glow */}
                        <div className="absolute inset-0 blur-3xl bg-linear-to-r from-gray-600/10 via-emerald-600/10 to-gray-600/10 animate-pulse-glow" />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="inline-block relative">
                                    <h2 className="text-3xl md:text-4xl font-bold steel-text-glow mb-2 tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
                                        OFFICIAL INVITATION
                                    </h2>
                                    <div className="absolute -bottom-2 left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500 to-transparent" />
                                </div>
                                <p className="mt-6 text-gray-400 font-(--font-space-mono) tracking-widest text-sm">
                                    HACK TALK 2026 &bull; NSBM GREEN UNIVERSITY
                                </p>
                            </div>

                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="text-center">
                                    <label className="block mb-3 font-(--font-space-mono) text-sm tracking-widest text-emerald-400 uppercase">
                                        Invited Guest
                                    </label>
                                    <div className="bg-black/50 border border-emerald-500/30 text-gray-100 px-4 py-3 rounded-lg font-(--font-space-mono) text-center">
                                        {invite.name}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <label className="block mb-3 font-(--font-space-mono) text-sm tracking-widest text-emerald-400 uppercase">
                                        Academic Position
                                    </label>
                                    <div className="bg-black/50 border border-emerald-500/30 text-gray-100 px-4 py-3 rounded-lg font-(--font-space-mono) text-center">
                                        {invite.position}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <label className="block mb-3 font-(--font-space-mono) text-sm tracking-widest text-emerald-400 uppercase">
                                        Department
                                    </label>
                                    <div className="bg-black/50 border border-emerald-500/30 text-gray-100 px-4 py-3 rounded-lg font-(--font-space-mono) text-center">
                                        {invite.department || "—"}
                                    </div>
                                </div>
                            </div>

                            {/* Camera Section */}
                            <div className="mb-10">
                                <label className="block mb-6 font-(--font-space-mono) text-sm tracking-widest text-emerald-400 uppercase text-center">
                                    {capturedPhoto
                                        ? "IDENTITY VERIFICATION COMPLETE"
                                        : "IDENTITY VERIFICATION REQUIRED"}
                                </label>

                                {cameraError ? (
                                    <div className="text-center">
                                        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg font-(--font-space-mono) text-center">
                                            {cameraError}
                                        </div>
                                        <button
                                            onClick={initializeCamera}
                                            className="mt-4 px-6 py-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold tracking-wider transition-all duration-300 rounded-lg transform hover:scale-105 active:scale-95"
                                            style={{ fontFamily: "var(--font-orbitron)" }}
                                        >
                                            RETRY CAMERA ACCESS
                                        </button>
                                    </div>
                                ) : capturedPhoto ? (
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <img
                                                src={capturedPhoto}
                                                alt="Captured photo"
                                                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border-2 border-emerald-500/50"
                                            />
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={retakePhoto}
                                            className="mt-4 block mx-auto px-6 py-2 bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold tracking-wider transition-all duration-300 rounded-lg transform hover:scale-105 active:scale-95"
                                            style={{ fontFamily: "var(--font-orbitron)" }}
                                        >
                                            RETAKE PHOTO
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="relative inline-block bg-black/50 border border-emerald-500/30 rounded-lg overflow-hidden">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-64 h-48 md:w-80 md:h-60 object-cover"
                                            />
                                            <div className="absolute inset-0 border border-emerald-500/20 rounded-lg pointer-events-none" />
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <button
                                                onClick={capturePhoto}
                                                disabled={isCapturing}
                                                className="px-8 py-3 bg-linear-to-r from-emerald-600 via-emerald-700 to-cyan-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-wider transition-all duration-300 rounded-lg transform hover:scale-105 active:scale-95 overflow-hidden group"
                                                style={{ fontFamily: "var(--font-orbitron)" }}
                                            >
                                                <span className="relative z-10">
                                                    {isCapturing ? "CAPTURING..." : "CAPTURE PHOTO"}
                                                </span>
                                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                            </button>
                                            <p className="text-xs text-gray-500 font-(--font-space-mono) tracking-wider">
                                                PLEASE POSITION YOURSELF IN THE FRAME
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hidden canvas for photo capture */}
                            <canvas ref={canvasRef} className="hidden" />

                            {/* QR Code Section */}
                            <div className="mb-10">
                                <div className="flex items-center justify-between mb-6">
                                    <label className="block font-(--font-space-mono) text-sm tracking-widest text-emerald-400 uppercase">
                                        Share Invitation
                                    </label>
                                    <button
                                        onClick={() => setShowQR(!showQR)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${showQR ? "bg-emerald-600" : "bg-gray-600"}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${showQR ? "translate-x-6" : "translate-x-1"}`}
                                        />
                                    </button>
                                </div>

                                {showQR && (
                                    <div className="text-center animate-fade-in-up">
                                        <div className="inline-block p-4 bg-white rounded-lg shadow-lg">
                                            <QRCode
                                                value={`https://hack-talk.vercel.app/invite/${invite.id}`}
                                                size={200}
                                                style={{
                                                    height: "auto",
                                                    maxWidth: "100%",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                        <p className="mt-4 text-xs text-gray-500 font-(--font-space-mono) tracking-wider">
                                            SCAN TO ACCESS THIS INVITATION
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Personal Message */}
                            {invite.message && (
                                <div className="mb-10">
                                    <label className="block mb-3 font-(--font-space-mono) text-sm tracking-widest text-emerald-400 uppercase text-center">
                                        Personal Message
                                    </label>
                                    <div className="bg-black/50 border border-emerald-500/30 text-gray-100 px-6 py-4 rounded-lg font-(--font-space-mono) text-center italic">
                                        &quot;{invite.message}&quot;
                                    </div>
                                </div>
                            )}

                            {/* Event Details */}
                            <div className="text-center mb-10">
                                <h3 className="text-xl md:text-2xl font-bold steel-text-glow mb-4 tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
                                    HACK TALK 2026
                                </h3>
                                <div className="space-y-2 text-gray-400 font-(--font-space-mono) tracking-wider text-sm">
                                    <p>DATE: March 11, 2026</p>
                                    <p>TIME: 10:00 AM</p>
                                    <p>VENUE: C2-003, NSBM Green University</p>
                                    <p>
                                        THEME: Real Stories from Real Hackathon Veterans
                                    </p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="text-center">
                                <button
                                    onClick={() => (window.location.href = "/")}
                                    className="inline-flex items-center px-8 py-4 bg-linear-to-r from-emerald-600 via-emerald-700 to-cyan-600 hover:from-emerald-500 hover:via-emerald-600 hover:to-cyan-500 text-white font-bold tracking-wider transition-all duration-300 rounded-lg transform hover:scale-105 active:scale-95 overflow-hidden group"
                                    style={{ fontFamily: "var(--font-orbitron)" }}
                                >
                                    <span className="relative z-10">ACCEPT INVITATION</span>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </button>
                                <p className="mt-4 text-xs text-gray-500 font-(--font-space-mono) tracking-wider">
                                    PROCEED TO REGISTRATION
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-20 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
