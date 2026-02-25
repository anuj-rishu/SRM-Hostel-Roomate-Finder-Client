"use client";

import { useState, useEffect } from "react";
import {
  X,
  Fingerprint,
  Plus,
  Loader2,
  Check,
  Smartphone,
  Trash2,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { passkey } from "@/lib/api";
import { startRegistration } from "@simplewebauthn/browser";

interface Passkey {
  id: string;
  deviceName: string;
  createdAt: string;
}

interface PasskeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PasskeyManager({ isOpen, onClose }: PasskeyManagerProps) {
  const [passkeys, setPasskeys] = useState<Passkey[]>([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [regForm, setRegForm] = useState({ netId: "", passwd: "" });
  const [showRegPassword, setShowRegPassword] = useState(false);

  const fetchPasskeys = async () => {
    try {
      const res = await passkey.list();
      if (res.data.success) {
        setPasskeys(res.data.passkeys);
      }
    } catch (err) {
      console.error("Failed to fetch passkeys", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPasskeys();
      setMessage(null);
      setShowRegisterForm(false);
      setRegForm({ netId: "", passwd: "" });
    }
  }, [isOpen]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setRegistering(true);

    try {
      const optionsRes = await passkey.getRegistrationOptions();
      if (!optionsRes.data.success) {
        throw new Error("Failed to get registration options");
      }

      const credential = await startRegistration({
        optionsJSON: optionsRes.data.options,
      });

      const verifyRes = await passkey.verifyRegistration({
        credential,
        deviceName: getDeviceName(),
        netId: regForm.netId,
        passwd: regForm.passwd,
      });

      if (verifyRes.data.success) {
        setMessage({
          type: "success",
          text: "Passkey registered successfully!",
        });
        fetchPasskeys();
        setShowRegisterForm(false);
        setRegForm({ netId: "", passwd: "" });
      }
    } catch (err: any) {
      if (err.name === "NotAllowedError" || err.name === "AbortError") {
        setMessage({
          type: "error",
          text: "Passkey registration was cancelled.",
        });
      } else if (err.name === "InvalidStateError") {
        setMessage({
          type: "error",
          text: "This passkey is already registered.",
        });
      } else {
        setMessage({
          type: "error",
          text:
            err.response?.data?.error ||
            err.message ||
            "Failed to register passkey.",
        });
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async (credentialId: string) => {
    setDeletingId(credentialId);
    try {
      const res = await passkey.remove(credentialId);
      if (res.data.success) {
        setPasskeys((prev) => prev.filter((pk) => pk.id !== credentialId));
        setMessage({ type: "success", text: "Passkey removed." });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to remove passkey.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  const hasPasskey = passkeys.length > 0;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[var(--overlay-bg)] backdrop-blur-md animate-fade-in">
      <div className="glass rounded-2xl shadow-[var(--shadow-lg)] w-full max-w-lg overflow-hidden animate-fade-up border border-[var(--border-primary)]">
        <div className="px-6 py-4 border-b border-[var(--border-primary)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/15 to-purple-500/15 border border-violet-500/20">
              <Fingerprint className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Manage Passkeys
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Secure biometric login
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-primary)] hover:text-[var(--accent)] p-1.5 rounded-xl hover:bg-[var(--bg-hover)] transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {message && (
            <div
              className={`mb-4 p-3 text-sm rounded-xl flex items-start gap-2 animate-slide-up ${
                message.type === "success"
                  ? "text-emerald-400 bg-emerald-500/8 border border-emerald-500/15"
                  : "text-red-400 bg-red-500/8 border border-red-500/15"
              }`}
            >
              {message.type === "success" ? (
                <Check className="h-4 w-4 mt-0.5" />
              ) : (
                <X className="h-4 w-4 mt-0.5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {!showRegisterForm ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-[var(--text-secondary)]">
                  Registered Devices
                </h4>
                <button
                  onClick={() => {
                    setShowRegisterForm(true);
                    setMessage(null);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors px-3 py-1.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {hasPasskey ? "Replace Passkey" : "Add Passkey"}
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-[var(--text-muted)]" />
                </div>
              ) : passkeys.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-[var(--border-primary)] rounded-xl bg-[var(--bg-primary)]/30">
                  <ShieldCheck className="h-10 w-10 text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    No passkeys found
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[200px] mx-auto">
                    Add a passkey to sign in faster without a password.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {passkeys.map((pk) => (
                    <div
                      key={pk.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] group hover:border-violet-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-primary)] text-violet-400">
                          <Smartphone className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {pk.deviceName}
                          </p>
                          <p className="text-[10px] text-[var(--text-muted)]">
                            Added:{" "}
                            {new Date(pk.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(pk.id)}
                        disabled={deletingId === pk.id}
                        className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                        title="Remove passkey"
                      >
                        {deletingId === pk.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleRegister} className="animate-fade-up">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  Setup Passkey
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  Enter your NetID credentials once to securely store them.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[var(--text-secondary)] pl-1">
                    NetID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regForm.netId}
                      onChange={(e) =>
                        setRegForm({ ...regForm, netId: e.target.value })
                      }
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
                      placeholder="e.g. ab1234"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                      <Fingerprint className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[var(--text-secondary)] pl-1">
                    New Student Portal Password
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regForm.passwd}
                      onChange={(e) =>
                        setRegForm({ ...regForm, passwd: e.target.value })
                      }
                      className="w-full h-10 pl-9 pr-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
                      placeholder="Enter password"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                      <Lock className="h-4 w-4" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    >
                      {showRegPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {hasPasskey && (
                <div className="mt-3 p-2.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg flex gap-2">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                  <span>Registering will replace your existing passkey.</span>
                </div>
              )}

              <div className="flex gap-2 mt-5">
                <button
                  type="submit"
                  disabled={registering}
                  className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {registering ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Fingerprint className="h-4 w-4" />
                      Register Passkey
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRegisterForm(false);
                    setRegForm({ netId: "", passwd: "" });
                  }}
                  className="h-10 px-4 rounded-xl border border-[var(--border-primary)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function getDeviceName(): string {
  const ua = navigator.userAgent;
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Android/i.test(ua)) return "Android Device";
  if (/Mac/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "Windows PC";
  if (/Linux/i.test(ua)) return "Linux Device";
  return "Unknown Device";
}
