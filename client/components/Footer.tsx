import { Instagram, Linkedin, Heart, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-white py-4 md:py-6 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4">
                    <div className="flex items-center gap-2 order-2 md:order-1">
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                            Powered by <span className="font-bold text-gray-900">SRM INSIDER community</span>
                            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                        </p>
                    </div>

                    <div className="flex items-center gap-4 order-1 md:order-2">
                        <SocialLink href="https://www.instagram.com/srm.insider/" icon={<Instagram className="h-4 w-4" />} label="Instagram" color="pink-600" />
                        <SocialLink href="https://www.linkedin.com/company/srm-insider-community/" icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" color="blue-600" />
                        <SocialLink href="mailto:support@srminsider.live" icon={<Mail className="h-4 w-4" />} label="Email" color="purple-600" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative p-2 bg-gray-50 rounded-full hover:bg-white border border-gray-100 hover:border-gray-200 shadow-sm transition-all hover:-translate-y-0.5`}
            aria-label={label}
        >
            <div className={`text-gray-500 group-hover:text-${color} transition-colors`}>
                {icon}
            </div>
            <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-${color} opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white shadow-md px-2 py-0.5 rounded border border-gray-100 z-10 pointer-events-none`}>
                {label}
            </span>
        </Link>
    );
}
