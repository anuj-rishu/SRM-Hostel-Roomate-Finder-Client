"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  Menu,
  X,
  ShieldAlert,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Fingerprint,
  Scale,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { PasskeyManager } from "@/components/PasskeyManager";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [passkeyOpen, setPasskeyOpen] = useState(false);
  const [user, setUser] = useState<{
    username: string;
    registernumber: string;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const checkUser = useCallback(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [pathname, checkUser]);

  useEffect(() => {
    const handleLogin = () => checkUser();
    window.addEventListener("user-login", handleLogin);
    window.addEventListener("storage", handleLogin);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const interval = setInterval(checkUser, 500);
    return () => {
      window.removeEventListener("user-login", handleLogin);
      window.removeEventListener("storage", handleLogin);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [checkUser]);

  const handleLogout = () => {
    auth.logout();
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border-primary)] shadow-[var(--shadow-sm)]" : "bg-transparent border-b border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-sky-500 to-cyan-600 p-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Users className="h-4.5 w-4.5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[var(--text-primary)] leading-tight">
                SRM ROOMIE
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--accent)] font-semibold leading-none opacity-70">
                by SRM Insider Community
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              href="/terms"
              className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="h-3.5 w-3.5" />
              Terms
            </Link>
            <Link
              href="/refund"
              className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Refunds
            </Link>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] px-3 py-2 rounded-xl hover:bg-[var(--bg-hover)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Privacy
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all duration-300 cursor-pointer"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            {user && (
              <button
                onClick={() => setPasskeyOpen(true)}
                className="p-2.5 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-primary)] hover:text-violet-500 transition-all duration-300 cursor-pointer"
                title="Manage Passkeys"
              >
                <Fingerprint className="h-4 w-4" />
              </button>
            )}
            {user ? (
              <div className="flex items-center gap-2 ml-1">
                <div className="flex items-center gap-2.5 bg-[var(--accent-subtle)] px-3 py-1.5 rounded-full border border-[var(--border-accent)]">
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=0ea5e9`}
                      alt="Avatar"
                      className="h-6 w-6 rounded-full ring-2 ring-[var(--accent)]/30"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[var(--bg-primary)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)] max-w-[100px] truncate">
                    {user.username.split(" ")[0]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-[var(--text-primary)] hover:text-red-400 hover:bg-red-500/10"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/dashboard" className="ml-1">
                <Button size="sm" className="gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Find Roommates
                </Button>
              </Link>
            )}
          </nav>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </button>
            <button
              className="p-2 rounded-xl hover:bg-[var(--bg-hover)] text-[var(--text-primary)] hover:text-[var(--accent)] transition-all cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-primary)] bg-[var(--header-bg)] backdrop-blur-xl absolute w-full left-0 shadow-[var(--shadow-lg)] animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between p-3 bg-[var(--bg-hover)] rounded-2xl border border-[var(--border-primary)]">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}&backgroundColor=0ea5e9`}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full ring-2 ring-[var(--accent)]/30"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[var(--bg-primary)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {user.username}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {user.registernumber}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-[var(--text-primary)] hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                  Find Roommates
                </Link>
              )}
              {user && (
                <button
                  onClick={() => {
                    setPasskeyOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-violet-500 p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-all text-left cursor-pointer"
                >
                  <Fingerprint className="h-4 w-4" />
                  Manage Passkeys
                </button>
              )}
              <Link
                href="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-all text-left cursor-pointer"
              >
                <Scale className="h-4 w-4" />
                Terms & Conditions
              </Link>
              <Link
                href="/refund"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-all text-left cursor-pointer"
              >
                <RefreshCcw className="h-4 w-4" />
                Cancellation & Refund
              </Link>
              <button
                onClick={() => {
                  setPrivacyOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] p-3 rounded-xl hover:bg-[var(--bg-hover)] transition-all text-left cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4" />
                Privacy Policy
              </button>
            </div>
          </div>
        )}
      </header>

      {privacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--overlay-bg)] backdrop-blur-md animate-fade-in">
          <div className="glass rounded-2xl shadow-[var(--shadow-lg)] w-full max-w-md overflow-hidden animate-fade-up">
            <div className="px-6 py-4 border-b border-[var(--border-primary)] flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[var(--accent-subtle)]">
                  <ShieldAlert className="h-4 w-4 text-[var(--accent)]" />
                </div>
                Privacy Policy
              </h3>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="text-[var(--text-primary)] hover:text-[var(--accent)] p-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="glass-accent rounded-xl p-4 text-sm text-[var(--accent)]">
                <p className="font-semibold mb-1">We respect your privacy</p>
                <span className="text-[var(--text-secondary)]">
                  We do not store your login token.
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                We only store essential user information:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <strong className="text-[var(--text-primary)]">Name</strong>{" "}
                  and{" "}
                  <strong className="text-[var(--text-primary)]">
                    Contact Details
                  </strong>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <strong className="text-[var(--text-primary)]">
                    Hostel Details
                  </strong>{" "}
                  (Block, Room Number)
                </li>
              </ul>
              <p className="text-[var(--text-muted)] text-xs pt-4 border-t border-[var(--border-primary)] italic">
                This data is used solely for matching you with potential
                roommates.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-[var(--border-primary)] flex justify-end">
              <Button onClick={() => setPrivacyOpen(false)} size="sm">
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
      <PasskeyManager
        isOpen={passkeyOpen}
        onClose={() => setPasskeyOpen(false)}
      />
    </>
  );
}
