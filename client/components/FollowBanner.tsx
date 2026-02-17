"use client";

import { Instagram, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FollowBanner() {
  return (
    <Link
      href="https://www.instagram.com/srm.insider/"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-[var(--bg-card)] backdrop-blur-xl border border-[var(--border-primary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-pink-500/25 transition-all duration-400 hover:-translate-y-0.5"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform duration-300">
        <Instagram className="h-4 w-4 text-white" />
      </div>
      <span className="text-[13px] font-semibold text-[var(--text-primary)] tracking-tight">
        Follow us on Instagram
      </span>
      <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-pink-500 group-hover:translate-x-0.5 transition-all duration-300" />
    </Link>
  );
}
