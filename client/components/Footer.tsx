import { Instagram, Linkedin, Heart, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-primary)] bg-[var(--header-bg)] backdrop-blur-xl py-5 mt-auto relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 order-2 sm:order-1">
            <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-1.5">
              Crafted with
              <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400 animate-pulse" />
              by
              <span className="font-bold text-gradient">
                SRM Insider Community
              </span>
            </p>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Contact Us
            </Link>
          </div>
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            <SocialLink
              href="https://www.instagram.com/srm.insider/"
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              hoverColor="hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/10"
            />
            <SocialLink
              href="https://www.linkedin.com/company/srm-insider-community/"
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
              hoverColor="hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/10"
            />
            <SocialLink
              href="mailto:support@srminsider.live"
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              hoverColor="hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
  hoverColor,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  hoverColor: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${hoverColor}`}
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
