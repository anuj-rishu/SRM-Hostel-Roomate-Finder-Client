"use client";

import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Clock,
  Instagram,
  Linkedin,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Back + Header */}
        <div className="space-y-4 animate-fade-up">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] gap-2 pl-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-accent)]">
              <MessageSquare className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Contact Us
            </h1>
          </div>

          <p className="text-[var(--text-secondary)] text-base max-w-2xl">
            Have a question, issue, or just want to say hi? We&apos;re here to
            help. Reach out to the SRM Insider Community team and we&apos;ll get
            back to you as soon as possible.
          </p>
        </div>

        {/* Primary Email Card */}
        <div className="animate-fade-up animation-delay-1000">
          <a
            href="mailto:support@srminsider.live"
            className="group block card-premium p-6 sm:p-10 cursor-pointer"
            id="contact-email-card"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Icon */}
              <div
                className="relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%)",
                  boxShadow: "0 8px 32px -4px rgba(14, 165, 233, 0.45)",
                }}
              >
                <Mail className="h-8 w-8 text-white" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  Email Support
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold text-gradient break-all">
                    support@srminsider.live
                  </span>
                  <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200 flex-shrink-0" />
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1.5">
                  Click to open your mail app and send us a message
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[var(--accent-subtle)] border border-[var(--border-accent)] text-[var(--accent)] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[var(--accent)] group-hover:text-white flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Shimmer line on hover */}
            <div
              className="mt-6 h-px w-full rounded-full transition-all duration-500"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--border-accent), transparent)",
                opacity: 0,
              }}
            />
          </a>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up animation-delay-2000">
          {/* Response Time */}
          <div className="card-premium p-5 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex-shrink-0">
              <Clock className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                Response Time
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We typically respond within{" "}
                <span className="text-[var(--text-accent)] font-medium">
                  24–48 hours
                </span>
                . For urgent issues, please mention it in the subject line.
              </p>
            </div>
          </div>

          {/* What to include */}
          <div className="card-premium p-5 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex-shrink-0">
              <Sparkles className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                What to Include
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Your SRM registration number, a brief description of the issue,
                and any relevant screenshots help us resolve things faster.
              </p>
            </div>
          </div>
        </div>

        {/* Social / Other Channels */}
        <div className="card-premium p-6 sm:p-8 animate-fade-up animation-delay-2000">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            Find us on Social Media
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Stay updated and reach out through our official channels.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/srm.insider/"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-instagram"
              className="group flex items-center gap-3 flex-1 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-500/40 hover:bg-pink-500/10"
            >
              <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 group-hover:bg-pink-500/20 transition-colors duration-300">
                <Instagram className="h-5 w-5 text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Instagram
                </p>
                <p className="text-xs text-[var(--text-muted)]">@srm.insider</p>
              </div>
              <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-pink-400 transition-colors duration-200" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/srm-insider-community/"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-linkedin"
              className="group flex items-center gap-3 flex-1 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-sky-500/10"
            >
              <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500/20 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-sky-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  LinkedIn
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  SRM Insider Community
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-sky-400 transition-colors duration-200" />
            </a>

            {/* Email shortcut */}
            <a
              href="mailto:support@srminsider.live"
              id="contact-email-social"
              className="group flex items-center gap-3 flex-1 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                <Mail className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Email
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  support@srminsider.live
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-cyan-400 transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
