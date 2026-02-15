"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Search, Menu, X, ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/api";
import { useRouter } from "next/navigation";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [user, setUser] = useState<{ username: string; registernumber: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check for user in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        auth.logout();
        setUser(null);
        router.push("/");
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm transition-all duration-200">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
                        <div className="bg-blue-600 p-1.5 rounded-lg shadow-md group-hover:shadow-blue-500/25 transition-all duration-300 transform group-hover:scale-105">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg tracking-tight text-gray-900 leading-tight">
                                SRM ROOMIE
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium leading-none">
                                by SRM Insider Community
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setPrivacyOpen(true)}
                            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
                        >
                            <ShieldAlert className="h-4 w-4" />
                            Privacy Policy
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                                    <img
                                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                                        alt="Avatar"
                                        className="h-6 w-6 rounded-full bg-white border border-blue-200"
                                    />
                                    <span className="text-sm font-medium text-blue-900 max-w-[100px] truncate">
                                        {user.username.split(" ")[0]}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                                    title="Logout"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                Find Roommates
                            </Link>
                        )}

                    </nav>

                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5">
                        <div className="container px-4 py-4 flex flex-col gap-4">
                            {user ? (
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                                            alt="Avatar"
                                            className="h-8 w-8 rounded-full bg-white border border-gray-200"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900">{user.username}</span>
                                            <span className="text-xs text-gray-500">{user.registernumber}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-gray-500 hover:text-red-600"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Link
                                    href="/dashboard"
                                    className="text-base font-medium text-gray-600 hover:text-blue-600 p-2 rounded-md hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Find Roommates
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    setPrivacyOpen(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="text-base font-medium text-gray-600 hover:text-blue-600 p-2 rounded-md hover:bg-gray-50 flex items-center gap-2 text-left"
                            >
                                <ShieldAlert className="h-4 w-4" />
                                Privacy Policy
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {privacyOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5 text-blue-600" />
                                Privacy Policy
                            </h3>
                            <button
                                onClick={() => setPrivacyOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
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
                            <Button onClick={() => setPrivacyOpen(false)} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Understood
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
