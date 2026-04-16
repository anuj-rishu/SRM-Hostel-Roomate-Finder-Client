"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  RotateCw,
  X,
  ArrowRight,
  Users,
  Shield,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Fingerprint,
} from "lucide-react";
import { FollowBanner } from "@/components/FollowBanner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { auth, getLoginCooldownRemaining, applyLoginCooldown, clearLoginCooldown, isSrmIpBlockError } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100dvh - 4rem)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(var(--accent)/3_1px,transparent_1px),linear-gradient(90deg,var(--accent)/3_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_70%)] pointer-events-none" />

      <div className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative py-8 md:py-0">
        <div className="flex justify-center mb-6 animate-fade-up">
          <FollowBanner />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div
            className="flex flex-col justify-center space-y-5 text-center lg:text-left animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500 self-center lg:self-start backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2.5 animate-pulse shadow-lg shadow-emerald-400/50"></span>
              Live for all batches
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-[var(--text-primary)]">Find Your </span>
              <span className="text-gradient">Perfect</span>
              <br />
              <span className="text-[var(--text-primary)]">Roommate </span>
              <span className="text-gradient">at SRM</span>
            </h1>

            <p className="max-w-[480px] text-[var(--text-secondary)] text-base leading-relaxed mx-auto lg:mx-0">
              Connect with verified SRM students. No fake profiles, no fake
              data. Login through your student portal and discover your ideal
              roommate.
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <FeaturePill
                icon={<Shield className="h-3.5 w-3.5" />}
                text="Verified Profiles"
              />
              <FeaturePill
                icon={<Users className="h-3.5 w-3.5" />}
                text="Real Students"
              />
            </div>
          </div>

          <div
            className="mx-auto flex w-full max-w-[400px] flex-col justify-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/12 via-cyan-500/8 to-teal-500/12 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative glass rounded-2xl p-6 sm:p-7 shadow-[var(--shadow-lg)]">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-3">
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-sky-500/15 to-cyan-500/15 border border-[var(--accent)]/15">
                      <KeyRound className="h-6 w-6 text-[var(--accent)]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                    Welcome Back
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Sign in with your{" "}
                    <span className="text-[var(--accent)] font-semibold">
                      Student Portal
                    </span>{" "}
                    credentials
                  </p>
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] text-sm text-[var(--text-secondary)] backdrop-blur-sm">
      <span className="text-[var(--accent)]">{icon}</span>
      {text}
    </div>
  );
}

function RoommateSearchOverlay() {
  const messages = [
    "Syncing with SRM portal...",
    "Fetching your hostel data...",
    "Scanning for roommates...",
    "Almost there...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, oklch(0.15 0.04 220) 0%, oklch(0.08 0.02 220) 60%, oklch(0.06 0.01 220) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(var(--accent)/4_1px,transparent_1px),linear-gradient(90deg,var(--accent)/4_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,var(--accent-glow),transparent_65%)] pointer-events-none opacity-60" />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-32 h-32 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "var(--accent)",
              borderRightColor: "var(--accent)",
              animation: "spin 1.4s linear infinite",
            }}
          />
          <div
            className="absolute w-24 h-24 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "oklch(0.72 0.18 190)",
              borderLeftColor: "oklch(0.72 0.18 190)",
              animation: "spin 1.8s linear infinite reverse",
            }}
          />
          <div
            className="absolute w-20 h-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--accent)/20 0%, transparent 70%)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <div className="relative z-10 p-4 rounded-full bg-[var(--bg-card)] border border-[var(--accent)]/25 shadow-[0_0_40px_rgba(14,165,233,0.25)]">
            <Users className="h-8 w-8 text-[var(--accent)]" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Looking for your{" "}
            <span className="text-gradient">Roommate</span>
          </h2>
          <p
            className="text-sm text-[var(--text-muted)] transition-opacity duration-300"
            style={{ opacity: fade ? 1 : 0 }}
          >
            {messages[msgIndex]}
          </p>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--accent)]/40"
              style={{
                animation: `pulse 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
          Hang tight! We&apos;re matching you with verified SRM students in your hostel.
        </p>
      </div>
    </div>
  );
}

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showRoommateSearch, setShowRoommateSearch] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [captchaData, setCaptchaData] = useState<{
    captchaText?: string;
    captchaUrl?: string;
    token: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    login: "",
    passwd: "",
    captcha: "",
  });
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const initial = getLoginCooldownRemaining();
    if (initial > 0) setCooldown(initial);
    const timer = setInterval(() => {
      const remaining = getLoginCooldownRemaining();
      setCooldown(remaining);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    if (getLoginCooldownRemaining() > 0) return;
    setCaptchaLoading(true);
    try {
      const res = await auth.getCaptcha();
      if (res.data.success) {
        setCaptchaData({
          captchaText: res.data.captchaText || undefined,
          captchaUrl: res.data.captchaUrl || undefined,
          token: res.data.token,
        });
      }
    } catch (_err) {
    } finally {
      setCaptchaLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const remaining = getLoginCooldownRemaining();
    if (remaining > 0) {
      setError(`Please wait ${remaining}s before trying again to protect the server.`);
      return;
    }

    setLoading(true);

    if (!captchaData?.token) {
      setError("Captcha not loaded. Click refresh to try again.");
      setLoading(false);
      return;
    }

    try {
      const res = await auth.login({
        login: formData.login,
        passwd: formData.passwd,
        captcha: formData.captcha,
        token: captchaData.token,
      });

      if (res.data.success) {
        clearLoginCooldown();
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            username: res.data.username,
            registernumber: res.data.registernumber,
            isAdmin: res.data.isAdmin,
          }),
        );
        window.dispatchEvent(new Event("user-login"));
        setShowRoommateSearch(true);
        await new Promise((resolve) => setTimeout(resolve, 4500));
        router.push("/dashboard");
      }
    } catch (err: any) {
      applyLoginCooldown();
      const serverMsg: string = err.response?.data?.error || err.message || "Login failed. Please try again.";
      const isIpBlock = isSrmIpBlockError(serverMsg) || err.isSrmIpBlock;
      if (isIpBlock) {
        setError("⚠️ SRM portal is temporarily overloaded. Please wait a moment — the system will retry automatically.");
      } else {
        setError(serverMsg);
        fetchCaptcha();
        setFormData((prev) => ({ ...prev, captcha: "" }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showRoommateSearch && <RoommateSearchOverlay />}
      <form onSubmit={handleSubmit} className="space-y-4">

      {cooldown > 0 && (
        <div className="p-3 text-sm text-amber-400 bg-amber-500/8 border border-amber-500/20 rounded-xl flex items-start gap-2 animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="h-3 w-3 text-amber-400" />
          </div>
          <div>
            <p className="font-semibold">Rate limit active</p>
            <p className="text-amber-400/80 text-xs mt-0.5">
              Wait <span className="font-bold tabular-nums">{cooldown}s</span> to protect the server from IP blocks.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/8 border border-red-500/15 rounded-xl flex items-start gap-2 animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <X className="h-3 w-3 text-red-400" />
          </div>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-1.5"
          htmlFor="login"
        >
          <Users className="h-3.5 w-3.5 text-[var(--accent)]" />
          SRM NetID
        </label>
        <Input
          id="login"
          placeholder="e.g., ab1234"
          type="text"
          value={formData.login}
          onChange={handleChange}
          required
          autoComplete="username"
        />
      </div>

      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-1.5"
          htmlFor="passwd"
        >
          <Lock className="h-3.5 w-3.5 text-[var(--accent)]" />
          Password
        </label>
        <div className="relative">
          <Input
            id="passwd"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.passwd}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-1.5"
          htmlFor="captcha"
        >
          <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
          Captcha
        </label>
        <div className="flex gap-2 items-center">
          {captchaLoading ? (
            <div className="bg-[var(--bg-card)] rounded-lg p-1 h-10 w-[90px] flex items-center justify-center border border-[var(--border-primary)] flex-shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="w-full h-5 rounded bg-[var(--border-primary)]/60" />
            </div>
          ) : captchaData?.captchaUrl ? (
            <div className="bg-white rounded-lg p-1 h-10 w-[90px] flex items-center justify-center overflow-hidden border border-[var(--border-primary)] shadow-inner flex-shrink-0">
              <img
                src={captchaData.captchaUrl}
                alt="Captcha"
                className="h-full w-full object-contain"
              />
            </div>
          ) : captchaData?.captchaText ? (
            <div className="bg-white rounded-lg h-10 px-3 flex items-center justify-center border border-[var(--border-primary)] shadow-inner flex-shrink-0">
              <span className="font-mono font-bold text-lg tracking-[0.25em] text-gray-800 select-none">
                {captchaData.captchaText}
              </span>
            </div>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={fetchCaptcha}
            title="Refresh"
            className="h-10 w-10 flex-shrink-0"
            disabled={captchaLoading || cooldown > 0}
          >
            <RotateCw className={`h-3.5 w-3.5 ${captchaLoading ? "animate-spin" : ""}`} />
          </Button>
          <Input
            id="captcha"
            placeholder="Enter code"
            value={formData.captcha}
            onChange={handleChange}
            required
            autoComplete="off"
            className="flex-1 min-w-0 h-10"
            disabled={captchaLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-sm font-semibold mt-1"
        disabled={loading || cooldown > 0}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing In...
          </span>
        ) : cooldown > 0 ? (
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Wait {cooldown}s
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Sign In
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-[var(--text-muted)] pt-1">
        By signing in, you agree to our{" "}
        <a
          href="/privacy"
          className="text-[var(--accent)] font-medium hover:underline"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
    </>
  );
}


