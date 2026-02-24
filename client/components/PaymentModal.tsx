"use client";

import { useState, useEffect } from "react";
import {
  X,
  Lock,
  CreditCard,
  Sparkles,
  Loader2,
  CheckCircle2,
  IndianRupee,
  ShieldCheck,
  Zap,
  Users,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { payment } from "@/lib/api";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  roommateCount: number;
}

declare global {
  interface Window {
    Cashfree: any;
  }
}

export function PaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  roommateCount,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [price, setPrice] = useState<number>(19);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await payment.getConfig();
        if (res.data.success) {
          setPrice(res.data.amount);
        }
      } catch (err) {
        console.error("Failed to fetch payment price:", err);
      }
    };
    if (isOpen) {
      fetchConfig();
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await payment.createOrder();
      const data = res.data;

      if (data.alreadyPaid) {
        onPaymentSuccess();
        return;
      }

      if (!data.paymentSessionId) {
        setError("Failed to initialize payment. Please try again.");
        setLoading(false);
        return;
      }

      const cashfree = await window.Cashfree({
        mode:
          process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
            ? "production"
            : "sandbox",
      });

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(async (result: any) => {
        if (result.error) {
          setError(result.error.message || "Payment failed. Please try again.");
          setLoading(false);
          return;
        }

        if (result.redirect) {
          return;
        }

        if (result.paymentDetails) {
          try {
            const verifyRes = await payment.verifyPayment(data.orderId);
            if (verifyRes.data.paid) {
              onPaymentSuccess();
            } else {
              setError(
                "Payment verification pending. Please refresh the page.",
              );
            }
          } catch {
            setError(
              "Payment verification failed. Please refresh and try again.",
            );
          }
        }
        setLoading(false);
      });
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(
        err.response?.data?.error || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="payment-modal-card w-full sm:max-w-[460px] rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up-sheet sm:animate-fade-up max-h-[80vh] sm:max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="flex sm:hidden justify-center pt-2 pb-0.5">
          <div className="w-9 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex-shrink-0">
          <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-amber-500/15 border border-amber-500/25 flex-shrink-0">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] sm:text-lg font-bold text-[var(--text-primary)]">
                  Unlock Roommate Details
                </h3>
                <p className="text-[10px] sm:text-xs text-[var(--text-muted)]">
                  ₹{price} · all roommates · 8 months
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-[var(--bg-hover)] transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
            {/* Features */}
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                What you get
              </p>
              <div className="grid gap-1.5 sm:gap-2">
                <FeatureRow
                  icon={<Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  iconBg="bg-sky-500/10 text-sky-500 border-sky-500/15"
                  title="Email Addresses"
                  desc="Contact roommates directly"
                />
                <FeatureRow
                  icon={<Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  iconBg="bg-emerald-500/10 text-emerald-500 border-emerald-500/15"
                  title="Phone Numbers"
                  desc="Call or message roommates"
                />
                <FeatureRow
                  icon={<Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                  iconBg="bg-violet-500/10 text-violet-500 border-violet-500/15"
                  title={`${roommateCount} ${roommateCount > 1 ? "Roommates" : "Roommate"} Found`}
                  desc="All contacts unlocked at once"
                />
              </div>
            </div>

            {/* Price card */}
            <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/8 to-orange-500/5 border border-amber-500/20 px-3 py-3 sm:px-5 sm:py-4 text-center">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full shadow-lg shadow-amber-500/25">
                  <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  Best Value
                </span>
              </div>
              <div className="flex items-center justify-center gap-0.5 mt-1 sm:mt-1.5 mb-0.5">
                <IndianRupee className="h-5 w-5 sm:h-7 sm:w-7 text-amber-500" />
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  {price}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] font-medium">
                One-time · All roommates · 8 months
              </p>
              <div className="mt-2 sm:mt-2.5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-500/15">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> 8
                  months access
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-sky-500 bg-sky-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-sky-500/15">
                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> Instant
                  unlock
                </span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-2.5 sm:p-3 rounded-xl text-red-400 text-xs border border-red-500/15 bg-red-500/8">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1" />
                  <span className="leading-snug">{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-[var(--border-primary)] space-y-2 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-3">
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full gap-2 text-sm sm:text-base py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 rounded-xl"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Pay ₹{price} & Unlock Now
                <Sparkles className="h-4 w-4" />
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wide font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              Secure Payment
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] inline-block" />
              Powered by Cashfree
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  icon,
  iconBg,
  title,
  desc,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] hover:border-[var(--border-secondary)] transition-colors duration-200">
      <div
        className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg border ${iconBg} flex-shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] leading-tight">
          {title}
        </p>
        <p className="text-[9px] sm:text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
}
