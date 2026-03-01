"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import {
    submitQuestion,
    upvoteQuestion,
    removeUpvote,
} from "@/actions/questionActions";

function getVisitorId(): string {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem("hacktalk-visitor-id");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("hacktalk-visitor-id", id);
    }
    return id;
}

function timeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

export default function QnAPage() {
    const { questions, loading } = useQuestions();
    const [questionText, setQuestionText] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [sortBy, setSortBy] = useState<"votes" | "recent">("votes");
    const [visitorId, setVisitorId] = useState("");

    useEffect(() => {
        setVisitorId(getVisitorId());
        const savedName = localStorage.getItem("hacktalk-author-name");
        if (savedName) setAuthorName(savedName);
    }, []);

    const sorted = useMemo(() => {
        const active = questions.filter((q) => !q.answered);
        const answered = questions.filter((q) => q.answered);

        const sortFn =
            sortBy === "votes"
                ? (a: (typeof questions)[0], b: (typeof questions)[0]) => {
                    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
                    return b.votes - a.votes;
                }
                : (a: (typeof questions)[0], b: (typeof questions)[0]) => {
                    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
                    return b.created_at.getTime() - a.created_at.getTime();
                };

        return { active: [...active].sort(sortFn), answered: [...answered].sort(sortFn) };
    }, [questions, sortBy]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!questionText.trim() || submitting) return;

        setSubmitting(true);
        try {
            if (authorName.trim()) {
                localStorage.setItem("hacktalk-author-name", authorName.trim());
            }
            await submitQuestion(questionText, authorName);
            setQuestionText("");
        } catch {
            // silent fail
        } finally {
            setSubmitting(false);
        }
    };

    const handleVote = async (questionId: string, hasVoted: boolean) => {
        if (!visitorId) return;
        try {
            if (hasVoted) {
                await removeUpvote(questionId, visitorId);
            } else {
                await upvoteQuestion(questionId, visitorId);
            }
        } catch {
            // silent fail
        }
    };

    return (
        <div className="min-h-screen bg-[#08080c] text-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl md:text-4xl font-black tracking-wider mb-2"
                        style={{ fontFamily: "var(--font-orbitron)" }}
                    >
                        <span className="text-white">Live</span>{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">
                            Q&A
                        </span>
                    </h1>
                    <p className="text-gray-400 font-(--font-space-mono) text-xs tracking-widest">
                        Ask questions for the speakers &bull; Upvote what you want answered
                    </p>
                </div>

                {/* Submit form */}
                <form
                    onSubmit={handleSubmit}
                    className="glass-panel rounded-xl steel-border p-5 mb-8"
                >
                    <div className="mb-3">
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Your name (optional)"
                            className="w-full bg-black/40 border border-gray-600/30 text-gray-100 px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-all duration-300 font-(--font-space-mono) text-sm placeholder:text-gray-600"
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            placeholder="Type your question..."
                            maxLength={300}
                            rows={3}
                            className="w-full bg-black/40 border border-gray-600/30 text-gray-100 px-4 py-2.5 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-all duration-300 font-(--font-space-mono) text-sm placeholder:text-gray-600 resize-none"
                        />
                        <div className="text-right mt-1">
                            <span className="text-[10px] font-(--font-space-mono) text-gray-600">
                                {questionText.length}/300
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting || !questionText.trim()}
                        className="w-full py-2.5 rounded-lg font-(--font-space-mono) text-sm tracking-wider uppercase bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600/50 text-gray-200 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Sending..." : "Send Question"}
                    </button>
                </form>

                {/* Sort controls */}
                <div className="flex items-center gap-2 mb-5">
                    <span className="text-[10px] font-(--font-space-mono) text-gray-500 tracking-widest uppercase">
                        Sort:
                    </span>
                    <button
                        onClick={() => setSortBy("votes")}
                        className={`px-3 py-1 rounded-md text-xs font-(--font-space-mono) tracking-wider transition-all duration-200 ${sortBy === "votes" ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400" : "border border-gray-700/40 text-gray-500 hover:text-gray-300"}`}
                    >
                        Top
                    </button>
                    <button
                        onClick={() => setSortBy("recent")}
                        className={`px-3 py-1 rounded-md text-xs font-(--font-space-mono) tracking-wider transition-all duration-200 ${sortBy === "recent" ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400" : "border border-gray-700/40 text-gray-500 hover:text-gray-300"}`}
                    >
                        Recent
                    </button>
                    <div className="ml-auto">
                        <span className="text-[10px] font-(--font-space-mono) text-gray-600">
                            {questions.length} question{questions.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                {/* Questions list */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="inline-block w-6 h-6 border-2 border-gray-600 border-t-emerald-400 rounded-full animate-spin" />
                    </div>
                ) : sorted.active.length === 0 && sorted.answered.length === 0 ? (
                    <div className="text-center py-16 glass-panel rounded-xl steel-border">
                        <p className="text-gray-500 font-(--font-space-mono) text-sm tracking-wider">
                            No questions yet. Be the first to ask!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sorted.active.map((q) => {
                            const hasVoted = q.votedBy.includes(visitorId);
                            return (
                                <div
                                    key={q.id}
                                    className={`glass-panel rounded-xl p-4 transition-all duration-300 ${q.pinned ? "border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" : "border border-gray-700/20 hover:border-gray-600/40"}`}
                                >
                                    {q.pinned && (
                                        <div className="flex items-center gap-1 mb-2">
                                            <span className="text-[10px] font-(--font-space-mono) text-emerald-400 tracking-widest uppercase">
                                                📌 Pinned
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex gap-3">
                                        {/* Vote button */}
                                        <button
                                            onClick={() => handleVote(q.id, hasVoted)}
                                            className={`flex flex-col items-center gap-0.5 pt-0.5 min-w-[40px] transition-all duration-200 ${hasVoted ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"}`}
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill={hasVoted ? "currentColor" : "none"}
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M12 4l-8 8h5v8h6v-8h5z" />
                                            </svg>
                                            <span className="text-xs font-(--font-space-mono) font-bold">
                                                {q.votes}
                                            </span>
                                        </button>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-200 leading-relaxed break-words">
                                                {q.text}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[10px] font-(--font-space-mono) text-gray-500">
                                                    {q.author}
                                                </span>
                                                <span className="text-gray-700">&bull;</span>
                                                <span className="text-[10px] font-(--font-space-mono) text-gray-600">
                                                    {timeAgo(q.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Answered questions */}
                        {sorted.answered.length > 0 && (
                            <>
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-800" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-[#08080c] px-4 text-[10px] font-(--font-space-mono) text-gray-600 tracking-widest uppercase">
                                            Answered ({sorted.answered.length})
                                        </span>
                                    </div>
                                </div>
                                {sorted.answered.map((q) => (
                                    <div
                                        key={q.id}
                                        className="glass-panel rounded-xl p-4 border border-gray-800/30 opacity-50"
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex flex-col items-center gap-0.5 pt-0.5 min-w-[40px] text-gray-600">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                                <span className="text-xs font-(--font-space-mono)">
                                                    {q.votes}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-400 leading-relaxed break-words line-through decoration-gray-700">
                                                    {q.text}
                                                </p>
                                                <span className="text-[10px] font-(--font-space-mono) text-gray-600">
                                                    {q.author}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
