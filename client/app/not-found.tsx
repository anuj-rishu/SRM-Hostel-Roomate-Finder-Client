"use client";

import Link from "next/link";
import { Home, MessageSquare, ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative z-10">
      <div className="max-w-lg w-full text-center space-y-8 animate-fade-up">
        {/* 404 Number */}
        <div className="relative select-none">
          <span className="text-[clamp(6rem,22vw,10rem)] font-extrabold leading-none tracking-tighter text-gradient opacity-90 block">
            404
          </span>
          <div
            className="absolute inset-0 text-[clamp(6rem,22vw,10rem)] font-extrabold leading-none tracking-tighter block opacity-10"
            style={{
              color: "var(--accent)",
              filter: "blur(20px)",
            }}
            aria-hidden
          >
            404
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-5 rounded-3xl border border-[var(--border-accent)] bg-[var(--accent-subtle)] animate-float">
            <Compass className="h-10 w-10 text-[var(--accent)]" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Page not found
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            id="not-found-home"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--gradient-accent)",
              boxShadow: "var(--shadow-accent)",
            }}
          >
            <Home className="h-4 w-4" />
            Go to Home
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            id="not-found-contact"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[var(--text-primary)] border border-[var(--border-secondary)] bg-[var(--bg-card)] hover:border-[var(--border-accent)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <MessageSquare className="h-4 w-4" />
            Contact Us
          </Link>
        </div>

        {/* Subtle divider */}
        <p className="text-xs text-[var(--text-muted)]">
          Error 404 · SRM ROOMIE
        </p>
      </div>
    </div>
  );
}
