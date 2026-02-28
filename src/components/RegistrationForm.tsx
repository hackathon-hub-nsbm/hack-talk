"use client";

import { useState } from "react";
import {
    RegistrationType,
    RegistrationSchema,
} from "@/types/registration";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerParticipant } from "@/actions/firebaseActions";

const batchOptions = [
    "26.1",
    "25.4",
    "25.3",
    "25.2",
    "25.1",
    "24.3",
    "24.2",
    "24.1",
    "23.2",
    "23.1",
    "22.2",
];

const formFields = [
    {
        id: 1,
        field_name: "name",
        type: "text",
        label: "Full Name",
        placeholder: "e.g., Achini Subasinghe",
    },
    {
        id: 2,
        field_name: "student_id",
        type: "text",
        label: "Student ID",
        placeholder: "e.g., 33333",
    },
    {
        id: 3,
        field_name: "phone_number",
        type: "tel",
        label: "Phone Number",
        placeholder: "+94 7X XXX XXXX",
    },
    {
        id: 4,
        field_name: "email",
        type: "email",
        label: "Email Address",
        placeholder: "achinisubasinghe@email.com",
    },
];

const RegistrationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegistrationType>({
        resolver: zodResolver(RegistrationSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            student_id: "",
            batch: undefined,
            phone_number: "",
            email: "",
        },
    });

    const onSubmit: SubmitHandler<RegistrationType> = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage({ type: null, message: "" });

        try {
            const result = await registerParticipant(data);
            if (result) {
                setSubmitMessage({
                    type: "success",
                    message: "You're in! Registration successful.",
                });
                reset();
            } else {
                setSubmitMessage({
                    type: "error",
                    message: "Registration failed. Please try again.",
                });
            }
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Something went wrong.";
            setSubmitMessage({ type: "error", message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative glass-panel rounded-2xl p-8 md:p-12 steel-shadow steel-border"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-block relative">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
                            REGISTER NOW
                        </h2>
                        <div className="absolute -bottom-2 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-500 to-transparent" />
                    </div>
                    <p className="mt-5 text-gray-400 font-(--font-space-mono) tracking-widest text-xs">
                        Secure your spot at Hack Talk 2026
                    </p>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {formFields.map((field, idx) => (
                        <div
                            key={field.id}
                            className="flex flex-col animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <label className="mb-2 font-(--font-space-mono) text-xs tracking-widest text-gray-300 uppercase">
                            </label>
                            <input
                                type={field.type}
                                {...register(field.field_name as keyof RegistrationType)}
                                className="bg-black/40 border border-gray-600/40 text-gray-100 px-4 py-3 rounded-lg 
                         focus:outline-none focus:border-emerald-500/60 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]
                         transition-all duration-300 font-(--font-space-mono)
                         placeholder:text-gray-600 hover:border-gray-500/60"
                                placeholder={field.placeholder}
                            />
                            {errors[field.field_name as keyof RegistrationType] && (
                                <p className="text-red-400 text-xs mt-1.5 font-(--font-space-mono)">
                                    {errors[field.field_name as keyof RegistrationType]?.message}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Batch select — spans full width on its own */}
                    <div
                        className="flex flex-col md:col-span-2 max-w-sm animate-fade-in-up"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <label className="mb-2 font-(--font-space-mono) text-xs tracking-widest text-gray-300 uppercase">
                            Batch
                        </label>
                        <select
                            {...register("batch")}
                            className="bg-black/40 border border-gray-600/40 text-gray-100 px-4 py-3 rounded-lg 
                       focus:outline-none focus:border-emerald-500/60 focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]
                       transition-all duration-300 font-(--font-space-mono)
                       appearance-none cursor-pointer hover:border-gray-500/60"
                        >
                            <option value="" className="bg-[#0d0d12]">
                                Select your batch...
                            </option>
                            {batchOptions.map((option, idx) => (
                                <option key={idx} value={option} className="bg-[#0d0d12]">
                                    {option}
                                </option>
                            ))}
                        </select>
                        {errors.batch && (
                            <p className="text-red-400 text-xs mt-1.5 font-(--font-space-mono)">
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center mt-10">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-14 py-4 font-bold rounded-lg 
                     text-gray-100 tracking-widest text-base uppercase
                     bg-linear-to-r from-gray-800 via-gray-700 to-gray-800
                     border border-gray-600/50
                     hover:from-gray-700 hover:via-gray-600 hover:to-gray-700
                     hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]
                     transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transform hover:scale-105 active:scale-95
                     overflow-hidden group"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                        <span className="relative z-10">
                            {isSubmitting ? "Registering..." : "Register"}
                        </span>
                        <div
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent 
                          translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"
                        />
                    </button>
                </div>

                {/* Status message */}
                {submitMessage.type && (
                    <div
                        className={`mt-6 text-center p-4 rounded-lg font-(--font-space-mono) tracking-wider text-sm border animate-fade-in-up ${submitMessage.type === "success"
                            ? "bg-emerald-900/20 border-emerald-500/50 text-emerald-400"
                            : "bg-red-900/20 border-red-500/50 text-red-400"
                            }`}
                    >
                        {submitMessage.message}
                        {submitMessage.type === "success" && (
                            <div className="mt-4">
                                <p className="text-gray-400 text-xs mb-2">Join the WhatsApp group for updates:</p>
                                <a
                                    href="https://chat.whatsapp.com/HpB0L74ovBCBX4XA4hC3Hq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300 text-sm font-(--font-space-mono)"
                                >
                                    Join WhatsApp Group &rarr;
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegistrationForm;
