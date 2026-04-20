"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Receipt,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { payment } from "@/lib/api";

interface PaymentInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaymentData {
  orderId: string;
  amount: number;
  paidAt?: string;
  createdAt?: string;
  expiresAt?: string;
  status: string;
  isExpired?: boolean;
}

export function PaymentInfo({ isOpen, onClose }: PaymentInfoProps) {
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [paidPayment, setPaidPayment] = useState<PaymentData | null>(null);
  const [pendingPayment, setPendingPayment] = useState<PaymentData | null>(
    null,
  );
  const [price, setPrice] = useState<number>(13);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const [statusRes, configRes] = await Promise.all([
        payment.getStatus(),
        payment.getConfig().catch(() => ({ data: { success: false } })),
      ]);

      const data = statusRes.data;
      setHasPaid(data.hasPaid);
      setPaidPayment(data.payment);
      setPendingPayment(data.pendingPayment);

      if (configRes.data.success) {
        setPrice(configRes.data.amount);
      }
    } catch {
      toast.error("Failed to load payment info.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      document.body.style.overflow = "hidden";

      const savedUser = sessionStorage.getItem("user");
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setIsAdmin(!!user.isAdmin);
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, fetchStatus]);

  const handleManualVerify = async () => {
    setVerifying(true);

    try {
      const res = await payment.manualVerify();
      const data = res.data;

      if (data.paid) {
        setHasPaid(true);
        setPaidPayment(data.payment);
        setPendingPayment(null);
        toast.success(data.message);
      } else {
        toast(data.message);
      }
    } catch {
      toast.error("Verification failed. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="payment-modal-card w-full sm:max-w-[440px] md:max-w-[480px] rounded-t-2xl sm:rounded-2xl overflow-hidden animate-slide-up-sheet sm:animate-fade-up max-h-[90vh] sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="flex sm:hidden justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="relative flex-shrink-0">
          <div className="px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-500/25 flex-shrink-0">
                <Receipt className="h-5 w-5 text-sky-500" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Payment Details
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  View your payment status
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-2 rounded-xl hover:bg-[var(--bg-hover)] transition-all cursor-pointer flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-4">
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
                <p className="text-sm text-[var(--text-muted)]">
                  Loading payment info...
                </p>
              </div>
            ) : isAdmin ? (
              /* ── Admin state ── */
              <div className="space-y-6 py-4">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 shadow-sm animate-fade-up">
                    <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                    <span className="text-sm font-black text-amber-500 uppercase tracking-wider">
                      Premium Access Active
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--bg-input)] to-[var(--bg-hover)] border border-amber-500/20 text-center shadow-[0_0_20px_-5px_rgba(245,158,11,0.15)] relative overflow-hidden animate-fade-up animation-delay-150">
                  <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
                  <p className="text-[15px] sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed relative z-10 max-w-[250px] sm:max-w-xs mx-auto">
                    You have free access of all SIC services as a core member.
                  </p>
                </div>
              </div>
            ) : hasPaid && paidPayment ? (
              /* ── Active state ── */
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-500">
                      Payment Active
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] overflow-hidden divide-y divide-[var(--border-primary)]">
                  <DetailRow label="Status" value="Active ✓" highlight />
                  <DetailRow label="Amount" value={`₹${paidPayment.amount}`} />
                  <DetailRow
                    label="Order ID"
                    value={paidPayment.orderId}
                    mono
                  />
                  {paidPayment.paidAt && (
                    <DetailRow
                      label="Paid On"
                      value={formatDate(paidPayment.paidAt)}
                    />
                  )}
                  {paidPayment.expiresAt && (
                    <DetailRow
                      label="Expires On"
                      value={formatDate(paidPayment.expiresAt)}
                    />
                  )}
                  <DetailRow label="Access" value="All roommate contacts" />
                  <DetailRow label="Validity" value="8 months from payment" />
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  <p className="text-xs text-emerald-400 text-center leading-relaxed">
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    You have full access to all roommate contact details.
                  </p>
                </div>
              </div>
            ) : paidPayment && paidPayment.isExpired ? (
              /* ── Expired state ── */
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                    <Clock className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-semibold text-red-400">
                      Payment Expired
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] overflow-hidden divide-y divide-[var(--border-primary)]">
                  <DetailRow label="Status" value="Expired" />
                  <DetailRow label="Amount" value={`₹${paidPayment.amount}`} />
                  {paidPayment.paidAt && (
                    <DetailRow
                      label="Paid On"
                      value={formatDate(paidPayment.paidAt)}
                    />
                  )}
                  {paidPayment.expiresAt && (
                    <DetailRow
                      label="Expired On"
                      value={formatDate(paidPayment.expiresAt)}
                    />
                  )}
                </div>

                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                  <p className="text-xs text-red-400 text-center leading-relaxed">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    Your access has expired. Pay ₹{price} again from the
                    dashboard to re-unlock contacts.
                  </p>
                </div>
              </div>
            ) : (
              /* ── Unpaid / Pending state ── */
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-semibold text-amber-500">
                      {pendingPayment ? "Payment Pending" : "No Payment Found"}
                    </span>
                  </div>
                </div>

                {pendingPayment ? (
                  <>
                    <div className="rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] overflow-hidden divide-y divide-[var(--border-primary)]">
                      <DetailRow label="Status" value="Pending" />
                      <DetailRow
                        label="Amount"
                        value={`₹${pendingPayment.amount}`}
                      />
                      <DetailRow
                        label="Order ID"
                        value={pendingPayment.orderId}
                        mono
                      />
                      {pendingPayment.createdAt && (
                        <DetailRow
                          label="Created"
                          value={formatDate(pendingPayment.createdAt)}
                        />
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                      <p className="text-xs text-amber-400 text-center leading-relaxed">
                        <AlertCircle className="h-3 w-3 inline mr-1" />
                        If you&apos;ve already paid, tap below to verify
                        manually.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-center">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      No payment yet. Go to the dashboard and tap &quot;Unlock
                      All Contacts&quot; to get started.
                    </p>
                  </div>
                )}

                {/* Manual verify button */}
                <Button
                  onClick={handleManualVerify}
                  disabled={verifying}
                  variant="outline"
                  className="w-full gap-2"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      Verify Payment Manually
                    </>
                  )}
                </Button>
              </div>
            )}


          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-5 sm:px-6 py-4 sm:py-5 border-t border-[var(--border-primary)] bg-[var(--bg-card-solid)] pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-5">
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
            size="sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight = false,
  mono = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2.5 sm:py-3 gap-0.5 sm:gap-4">
      <span className="text-[11px] sm:text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider flex-shrink-0">
        {label}
      </span>
      <span
        className={`text-[13px] sm:text-sm font-medium sm:text-right break-all sm:break-normal sm:truncate ${
          highlight
            ? "text-emerald-500 font-semibold"
            : "text-[var(--text-primary)]"
        } ${mono ? "font-mono text-xs" : ""}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}
