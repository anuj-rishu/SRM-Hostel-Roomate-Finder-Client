import { Instagram } from "lucide-react";
import Link from "next/link";

export function FollowBanner() {
    return (
        <Link
            href="https://www.instagram.com/srm.insider/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-100/50 shadow-[0_2px_15px_-3px_rgba(236,72,153,0.1)] hover:shadow-[0_8px_20px_-6px_rgba(236,72,153,0.2)] transition-all duration-300 hover:-translate-y-0.5"
        >
            {/* Glass Highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-sm transform group-hover:scale-105 transition-transform duration-300">
                <Instagram className="h-4.5 w-4.5 text-white" />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-[13px] font-semibold text-gray-800 tracking-tight leading-tight">
                    Follow SRM Insider
                </span>
                <span className="text-[11px] font-medium text-pink-600/80 group-hover:text-pink-600 transition-colors">
                    @srm.insider
                </span>
            </div>

            <div className="relative ml-1 text-pink-400 group-hover:translate-x-1 transition-transform duration-300 hidden sm:block">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
            </div>
        </Link>
    );
}
