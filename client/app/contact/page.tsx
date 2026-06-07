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
    <div className="min-h-screen pt-4 pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl mx-auto space-y-4">
        {}
        <div className="space-y-4 animate-fade-up">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] gap-2 pl-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-1.5">
            Contact Us
          </h1>

          <p className="text-[var(--text-secondary)] text-sm max-w-2xl leading-relaxed">
            Have a question, issue, or just want to say hi? We&apos;re here to
            help. Reach out to the SRM Insider Community team and we&apos;ll get
            back to you as soon as possible.
          </p>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up">
          {}
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex-shrink-0">
              <Clock className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">
                Response Time
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                We typically respond within{" "}
                <span className="text-[var(--accent)] font-semibold">
                  24–48 hours
                </span>
                .
              </p>
            </div>
          </div>

          {}
          <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex-shrink-0">
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">
                What to Include
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Registration number and a brief description of the issue.
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-6 animate-fade-up">
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-0.5">
            Find us on Social Media
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Stay updated and reach out through our official channels.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {}
            <a
              href="https://www.instagram.com/srm.insider/"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-instagram"
              className="group flex items-center gap-3 flex-1 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-500/40 hover:bg-pink-500/10"
            >
              <div className="p-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 group-hover:bg-pink-500/20 transition-colors duration-300">
                <Instagram className="h-4 w-4 text-pink-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Instagram
                </p>
                <p className="text-xs text-[var(--text-muted)]">@srm.insider</p>
              </div>
              <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-pink-400 transition-colors duration-200" />
            </a>

            {}
            <a
              href="https://www.linkedin.com/company/srm-insider-community/"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-linkedin"
              className="group flex items-center gap-3 flex-1 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-sky-500/10"
            >
              <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500/20 transition-colors duration-300">
                <Linkedin className="h-4 w-4 text-sky-400" />
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

            {}
            <a
              href="mailto:support@srminsider.live"
              id="contact-email-social"
              className="group flex items-center gap-3 flex-1 p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-cyan-500/10"
            >
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                <Mail className="h-4 w-4 text-cyan-400" />
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
