"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RoommateCard } from "@/components/RoommateCard";
import { PaymentModal } from "@/components/PaymentModal";
import {
  Loader2,
  Users,
  Building2,
  Calendar,
  UserSearch,
  Inbox,
  Sparkles,
} from "lucide-react";
import { FollowBanner } from "@/components/FollowBanner";
import { useRouter } from "next/navigation";
import { roommates, payment } from "@/lib/api";
import Script from "next/script";

interface RoommateData {
  registerNo: string;
  studentName: string;
  email: string;
  phone: string;
}

interface DashboardData {
  myRoom: any;
  roommates: RoommateData[];
  hasPaid: boolean;
  isAdmin?: boolean;
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="flex flex-col items-center gap-4 animate-fade-up">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--accent)]/15 rounded-full blur-xl animate-pulse" />
              <div className="relative p-4 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)]">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium">
              Loading your roommates...
            </p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchData = useCallback(async () => {
    try {
      const res = await roommates.getAll();
      if (res.data.success) {
        setData(res.data);
      } else {
        setError(res.data.message || "Failed to fetch data");
      }
    } catch (err: any) {
      console.error("My Room error", err);
      if (err.response?.status === 401) {
        router.push("/");
      } else {
        setError(err.response?.data?.error || "Failed to load roommates.");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      router.push("/");
      return;
    }
    fetchData();
  }, [fetchData, router]);

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    if (orderId) {
      payment
        .verifyPayment(orderId)
        .then((res) => {
          if (res.data.paid) {
            fetchData();
          }
        })
        .catch(() => {});
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [searchParams, fetchData]);

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-up">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--accent)]/15 rounded-full blur-xl animate-pulse" />
            <div className="relative p-4 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)]">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--accent)]" />
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)] font-medium">
            Loading your roommates...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="lazyOnload"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-4rem)]">
        <div className="flex justify-center mb-6 animate-fade-up">
          <FollowBanner />
        </div>
        <div className="mb-8 md:mb-10 animate-fade-up">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2">
                {data?.myRoom ? (
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-gradient">
                      Room {data.myRoom.roomNo}
                    </span>
                    <span className="text-[var(--text-muted)] font-normal text-xl">
                      —
                    </span>
                    <span>{data.myRoom.hostelName}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <UserSearch className="h-8 w-8 text-[var(--accent)]" />
                    Explore Roommates
                  </span>
                )}
              </h1>

              {data?.myRoom && (
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <DetailChip
                    icon={<Building2 className="h-3.5 w-3.5" />}
                    text={data.myRoom.hostelName}
                  />
                  <DetailChip
                    icon={<Calendar className="h-3.5 w-3.5" />}
                    text={`AY: ${data.myRoom.academicYear}`}
                  />
                </div>
              )}

              {!data?.myRoom && (
                <p className="text-[var(--text-muted)] text-sm sm:text-base mt-1">
                  Discover students who match your preferences.
                </p>
              )}
            </div>
          </div>
          {data?.isAdmin && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/20 flex items-center gap-3 animate-fade-up">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-md" />
                <div className="relative p-2 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-amber-500">
                  Premium Access Active
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  You have free access of all SIC services as a core member.
                </p>
              </div>
            </div>
          )}
        </div>

        {error ? (
          <div className="p-4 rounded-2xl text-red-400 text-sm border border-red-500/15 bg-red-500/8 animate-fade-up">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              {error}
            </div>
          </div>
        ) : (
          <>
            {data?.roommates && data.roommates.length > 0 ? (
              <div
                className="space-y-6 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent)]/15">
                    <Users className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">
                      {data.roommates.length > 1
                        ? "Your Roommates"
                        : "Your Roommate"}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      {data.roommates.length}{" "}
                      {data.roommates.length > 1 ? "people" : "person"} sharing
                      your room
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {data.roommates.map((student, index) => (
                    <div
                      key={index}
                      className="animate-fade-up"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <RoommateCard
                        name={student.studentName}
                        hostel={data.myRoom?.hostelName || "SRM Hostel"}
                        email={student.email}
                        phone={student.phone}
                        imageUrl={`https://api.dicebear.com/7.x/initials/svg?seed=${student.registerNo}&backgroundColor=0ea5e9`}
                        locked={!data.hasPaid}
                        onUnlockClick={() => setPaymentModalOpen(true)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className="text-center py-16 glass rounded-3xl border border-[var(--border-primary)] animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[var(--accent)]/8 rounded-full blur-xl" />
                    <div className="relative p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
                      <Inbox className="h-10 w-10 text-[var(--text-muted)]" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[var(--text-secondary)] mb-1">
                      No roommates found yet
                    </p>
                    <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto leading-relaxed">
                      They will appear here once they login to the portal. Check
                      back later!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        roommateCount={data?.roommates?.length || 0}
      />
    </>
  );
}

function DetailChip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs font-medium text-[var(--text-secondary)]">
      <span className="text-[var(--accent)]">{icon}</span>
      {text}
    </div>
  );
}
