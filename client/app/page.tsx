"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  RotateCw,
  X,
  ArrowRight,
  Users,
  Shield,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { FollowBanner } from "@/components/FollowBanner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { auth, isSrmIpBlockError } from "@/lib/api";

// Global store to persist state across remounts (Strict Mode/Mobile-Desktop toggle)
const captchaStore = {
  data: null as any,
  loading: false,
  promise: null as Promise<void> | null,
};

export default function Home() {
  const router = useRouter();
  const [captchaLoading, setCaptchaLoading] = useState(captchaStore.loading);
  const [captchaData, setCaptchaData] = useState<any>(captchaStore.data);

  const fetchCaptcha = async (force = false) => {
    // If already loading and not a force refresh, wait for existing promise
    if (captchaStore.loading && !force) {
      if (captchaStore.promise) await captchaStore.promise;
      setCaptchaData(captchaStore.data);
      setCaptchaLoading(false);
      return;
    }

    // If we already have data and not forcing, just use it
    if (captchaStore.data && !force && !captchaStore.loading) {
      setCaptchaData(captchaStore.data);
      setCaptchaLoading(false);
      return;
    }

    captchaStore.loading = true;
    setCaptchaLoading(true);

    captchaStore.promise = (async () => {
      try {
        const res = await auth.getCaptcha();
        if (res.data.success) {
          captchaStore.data = {
            captchaText: res.data.captchaText || undefined,
            captchaUrl: res.data.captchaUrl || undefined,
            token: res.data.token,
          };
          setCaptchaData(captchaStore.data);
        }
      } catch (_err) {
      } finally {
        captchaStore.loading = false;
        captchaStore.promise = null;
        setCaptchaLoading(false);
      }
    })();

    await captchaStore.promise;
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    if (token) {
      router.push("/dashboard");
    } else {
      fetchCaptcha();
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
                <LoginForm 
                  captchaData={captchaData} 
                  captchaLoading={captchaLoading} 
                  fetchCaptcha={fetchCaptcha} 
                />
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



function LoginForm({ 
  captchaData, 
  captchaLoading, 
  fetchCaptcha 
}: { 
  captchaData: any; 
  captchaLoading: boolean; 
  fetchCaptcha: (force?: boolean) => Promise<void>; 
}) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    login: "",
    passwd: "",
    captcha: "",
  });
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!captchaData?.token) {
      toast.error("Captcha not loaded. Click refresh.", { id: "login-error" });
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
        router.push("/dashboard");
      }
    } catch (err: any) {
      const serverMsg: string = err.response?.data?.error || err.message || "Login failed. Please try again.";
      const isIpBlock = isSrmIpBlockError(serverMsg) || err.isSrmIpBlock;
      let cleanMsg = serverMsg
        .replace(/Login failed:?/gi, "")
        .replace(/Alert/gi, "")
        .replace(/\s+/g, " ")
        .trim();

      if (cleanMsg.includes("Invalid login credentials")) {
        const match = cleanMsg.match(/(\d+) out of (\d+)/);
        if (match) {
          cleanMsg = `Invalid credentials. ${match[1]} attempts left.`;
        } else {
          cleanMsg = "Invalid credentials.";
        }
      }

      if (isIpBlock) {
        toast.error("⚠️ SRM portal is temporarily overloaded.", { id: "login-error" });
      } else {
        toast.error(cleanMsg, { id: "login-error" });
        fetchCaptcha();
        setFormData((prev) => ({ ...prev, captcha: "" }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">



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

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label
            className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-1.5"
            htmlFor="captcha"
          >
            <Shield className="h-3.5 w-3.5 text-[var(--accent)]" />
            Captcha
          </label>
          <button
            type="button"
            onClick={() => fetchCaptcha(true)}
            className="text-[var(--accent)] hover:text-[var(--accent)]/80 transition-all p-1 rounded-lg hover:bg-[var(--accent)]/10 flex items-center gap-1.5 text-xs font-semibold group"
            disabled={captchaLoading}
            title="Refresh Captcha"
          >
            <RotateCw className={`h-3.5 w-3.5 ${captchaLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            Refresh
          </button>
        </div>
        <div className="flex gap-2.5 items-center">
          {captchaLoading ? (
            <div className="bg-[var(--bg-card)] rounded-lg p-1 h-12 w-[120px] flex items-center justify-center border border-[var(--border-primary)] flex-shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="w-full h-6 rounded bg-[var(--border-primary)]/60" />
            </div>
          ) : captchaData?.captchaUrl ? (
            <div className="bg-white rounded-lg p-1 h-12 w-[120px] flex items-center justify-center overflow-hidden border border-[var(--border-primary)] shadow-inner flex-shrink-0">
              <img
                src={captchaData.captchaUrl}
                alt="Captcha"
                className="h-full w-full object-contain"
              />
            </div>
          ) : captchaData?.captchaText ? (
            <div className="bg-white rounded-lg h-12 px-4 flex items-center justify-center border border-[var(--border-primary)] shadow-inner flex-shrink-0">
              <span className="font-mono font-bold text-xl tracking-[0.25em] text-gray-800 select-none">
                {captchaData.captchaText}
              </span>
            </div>
          ) : null}
          <Input
            id="captcha"
            placeholder="Enter code"
            value={formData.captcha}
            onChange={handleChange}
            required
            autoComplete="off"
            className="flex-1 min-w-0 h-12 text-center tracking-[0.1em] font-medium"
            disabled={captchaLoading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-sm font-semibold mt-1"
        disabled={loading}
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


