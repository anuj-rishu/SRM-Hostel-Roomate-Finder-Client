"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RotateCw, ShieldAlert, X } from "lucide-react";
import { FollowBanner } from "@/components/FollowBanner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { auth } from "@/lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      router.push("/dashboard")
    }
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-gray-50">

      <div className="absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-3xl filter mix-blend-multiply opacity-70 animate-blob" />
      <div className="absolute top-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-purple-200/40 blur-3xl filter mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-[10%] left-[20%] h-[600px] w-[600px] rounded-full bg-pink-200/40 blur-3xl filter mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />

      <div className="z-10 container px-4 md:px-6 relative pt-12 md:pt-0">
        <div className="flex justify-center mb-12">
          <FollowBanner />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 self-center lg:self-start mb-2 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Live for all batches
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
              Find Your Perfect Roommate at SRM ROOMIE
            </h1>
            <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
              Find your genuine roommate of SRM, no fake profiles and fake data. Get logged by student portal and find your roommate.
            </p>

          </div>

          <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6">
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
              <div className="relative rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
                <div className="flex flex-col space-y-2 text-center">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">Welcome Back</h3>
                  <p className="text-sm text-gray-500">Enter your <span className="text-red-600 font-semibold">Student Portal Credentials</span> to access your account</p>
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

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [captchaData, setCaptchaData] = useState<{ captcha: string; token: string } | null>(null);
  const [formData, setFormData] = useState({
    login: "",
    passwd: "",
    captcha: "",
  });
  const [error, setError] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const res = await auth.getCaptcha();
      if (res.data.success) {
        setCaptchaData(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch captcha", err);
      // setError("Failed to load captcha. Please refresh.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!captchaData?.token) {
      setError("Captcha not loaded");
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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({
          username: res.data.username,
          registernumber: res.data.registernumber
        }));
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
      fetchCaptcha();
      setFormData(prev => ({ ...prev, captcha: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700" htmlFor="login">
          SRM NetID
        </label>
        <Input
          id="login"
          placeholder="NetID (e.g., ab1234)"
          type="text"
          value={formData.login}
          onChange={handleChange}
          required
          className="bg-gray-50 focus:bg-white"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700" htmlFor="passwd">
            Password
          </label>
        </div>
        <Input
          id="passwd"
          type="password"
          value={formData.passwd}
          onChange={handleChange}
          required
          className="bg-gray-50 focus:bg-white"
        />
      </div>

      {captchaData && (
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700" htmlFor="captcha">
            Captcha
          </label>
          <div className="flex gap-2">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-1 h-10 w-32 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={captchaData.captcha} alt="Captcha" className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={fetchCaptcha}
              className="border-gray-300 hover:bg-gray-100"
              title="Refresh Captcha"
            >
              <RotateCw className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
          <Input
            id="captcha"
            placeholder="Enter captcha"
            value={formData.captcha}
            onChange={handleChange}
            required
            className="bg-gray-50 focus:bg-white"
          />
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>



      <p className="px-8 text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <button
          type="button"
          onClick={() => setPrivacyOpen(true)}
          className="underline underline-offset-4 hover:text-blue-600 font-medium"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          type="button"
          onClick={() => setPrivacyOpen(true)}
          className="underline underline-offset-4 hover:text-blue-600 font-medium"
        >
          Privacy Policy
        </button>
        .
      </p>


      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-blue-600" />
                Privacy Policy
              </h3>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-left">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">We respect your privacy</p>
                We do not store your login token.
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                We only store essential user information such as:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li><strong className="text-gray-800">Name</strong> and <strong className="text-gray-800">Contact Details</strong></li>
                <li><strong className="text-gray-800">Hostel Details</strong> (Block, Room Number)</li>
              </ul>
              <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-gray-100 italic">
                This data is used solely for the purpose of matching you with potential roommates.
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <Button type="button" onClick={() => setPrivacyOpen(false)} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
