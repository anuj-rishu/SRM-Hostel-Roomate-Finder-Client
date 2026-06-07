import { MapPin, Phone, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RoommateProps {
  name: string;
  hostel: string;
  email: string;
  phone: string;
  imageUrl: string;
  locked?: boolean;
  price?: number;
  onUnlockClick?: () => void;
}

export function RoommateCard({
  name,
  hostel,
  email,
  phone,
  imageUrl,
  locked = false,
  price,
  onUnlockClick,
}: RoommateProps) {
  return (
    <div className="group card-premium overflow-hidden relative">
      {}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
          locked
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 opacity-70"
            : "bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 opacity-50 group-hover:opacity-100"
        }`}
      />

      <div className="p-5">
        {}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-[var(--accent)] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-[var(--border-secondary)] group-hover:ring-[var(--accent)]/40 transition-all duration-500">
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[var(--bg-card-solid)] shadow-lg shadow-emerald-400/30" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-all duration-300 truncate">
              {name}
            </h3>

          </div>
        </div>

        {}
        <div className="mt-5 space-y-2.5">
          {}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] group-hover:border-[var(--accent)]/20 group-hover:bg-[var(--accent-subtle)] transition-all duration-500">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/10">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                Hostel
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {hostel}
              </span>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 gap-1.5">
            {locked ? (
              <div className="space-y-2">
                {}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-input)] border border-amber-500/10 relative overflow-hidden">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/10">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                      Email
                    </span>
                    <span className="text-sm font-medium text-amber-500/70 blur-[3px] select-none">
                      xxxxxxx@srmist.edu.in
                    </span>
                  </div>
                </div>
                {}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-input)] border border-amber-500/10 relative overflow-hidden">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/10">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                      Phone
                    </span>
                    <span className="text-sm font-medium text-amber-500/70 blur-[3px] select-none">
                      +91 XXXXXXXXXX
                    </span>
                  </div>
                </div>
                {}
                <Button
                  onClick={onUnlockClick}
                  className="w-full mt-1 gap-2 text-xs py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 transition-all duration-300"
                  size="sm"
                >
                  <span className="flex items-center justify-center gap-2">
                    Unlock All Contacts — ₹{price || 19} only
                  </span>
                </Button>
              </div>
            ) : (
              <>
                {email && email !== "N/A" && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-hover)] transition-all duration-300 group/item"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500 border border-sky-500/10 group-hover/item:bg-sky-500 group-hover/item:text-white group-hover/item:shadow-lg group-hover/item:shadow-sky-500/20 transition-all duration-300">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                        Email
                      </span>
                      <span
                        className="text-sm font-medium text-[var(--text-secondary)] truncate group-hover/item:text-[var(--text-primary)] transition-colors"
                        title={email}
                      >
                        {email}
                      </span>
                    </div>
                  </a>
                )}

                {phone && phone !== "N/A" && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--bg-hover)] transition-all duration-300 group/item"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 group-hover/item:bg-emerald-500 group-hover/item:text-white group-hover/item:shadow-lg group-hover/item:shadow-emerald-500/20 transition-all duration-300">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">
                        Phone
                      </span>
                      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover/item:text-[var(--text-primary)] transition-colors">
                        {phone}
                      </span>
                    </div>
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="bg-[var(--bg-input)] px-6 py-3 border-t border-[var(--border-primary)] flex justify-between items-center">
        <span className="text-[11px] font-medium text-[var(--text-muted)]">
          SRM Institute of Science and Technology
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-emerald-500">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
