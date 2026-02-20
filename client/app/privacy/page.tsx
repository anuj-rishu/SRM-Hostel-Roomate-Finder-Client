"use client";

import {
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Calendar,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const sections = [
  {
    icon: <Lock className="h-5 w-5 text-[var(--accent)]" />,
    title: "Login Token",
    content:
      "We do not store your SRM student portal login token or password at any point. Authentication happens session-only and is never persisted on our servers.",
    highlight: true,
  },
  {
    icon: <Database className="h-5 w-5 text-[var(--accent)]" />,
    title: "Data We Store",
    content:
      "We store only the minimum information required to match you with a roommate. This includes your name, contact details, and hostel details (block and room number).",
    highlight: false,
  },
  {
    icon: <Eye className="h-5 w-5 text-[var(--accent)]" />,
    title: "How Your Data Is Used",
    content:
      "Your data is used solely for matching you with potential roommates at SRM. We do not use it for advertising, profiling, or any third-party commercial purposes.",
    highlight: false,
  },
  {
    icon: <UserCheck className="h-5 w-5 text-[var(--accent)]" />,
    title: "Data Sharing",
    content:
      "We do not sell or share your personal data with any third parties. Your roommate match information is only visible to verified SRM students within the platform.",
    highlight: false,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
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
              <ShieldAlert className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Privacy Policy
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Calendar className="h-4 w-4" />
            <span>Last updated on 20-02-2026</span>
          </div>

          <p className="text-[var(--text-secondary)] text-base max-w-2xl leading-relaxed">
            At{" "}
            <strong className="text-[var(--text-primary)]">SRM ROOMIE</strong>,
            we take your privacy seriously. This page explains exactly what data
            we collect, how we use it, and how we protect it.
          </p>
        </div>

        {/* Highlight banner */}
        <div className="glass-accent rounded-2xl p-5 flex items-start gap-4 animate-fade-up animation-delay-1000">
          <div className="p-2 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex-shrink-0">
            <ShieldCheck className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)] mb-1">
              We respect your privacy
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              SRM ROOMIE is built by students, for students. We collect only
              what is strictly necessary and never misuse your data.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-4 animate-fade-up animation-delay-1000">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`card-premium p-6 flex items-start gap-5 ${
                section.highlight
                  ? "border-[var(--border-accent)] bg-[var(--accent-subtle)]"
                  : ""
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-primary)] flex-shrink-0">
                {section.icon}
              </div>
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)] mb-2">
                  {section.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What we store — visual list */}
        <div className="card-premium p-6 sm:p-8 animate-fade-up animation-delay-2000">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
            Information We Collect
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            The following fields are stored in our database when you register:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Name", desc: "Your full name from SRM portal" },
              {
                label: "Contact Details",
                desc: "Email address for communication",
              },
              { label: "Hostel Block", desc: "Your assigned hostel block" },
              { label: "Room Number", desc: "Your assigned room number" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-primary)]"
              >
                <div className="mt-1 w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.label}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] italic mt-5 pt-4 border-t border-[var(--border-primary)]">
            This data is used solely for matching you with potential roommates
            within the SRM campus. No sensitive academic or financial data is
            stored.
          </p>
        </div>

        {/* Contact for privacy concerns */}
        <div className="card-premium p-6 flex items-start gap-4 animate-fade-up animation-delay-2000">
          <div className="p-2.5 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-accent)] flex-shrink-0">
            <Mail className="h-5 w-5 text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
              Privacy Concerns
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              If you have any questions about this privacy policy or would like
              to request deletion of your data, please contact us.
            </p>
            <Link href="/contact">
              <Button size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
