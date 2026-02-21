"use client";

import {
  ArrowLeft,
  Crown,
  Check,
  X,
  Eye,
  BanIcon,
  BookOpen,
  Download,
  BarChart3,
  Zap,
  Shield,
  Star,
  Users,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const plans = [
  {
    id: "roomie-basic",
    name: "Roomie Basic",
    price: 9,
    period: "one-time",
    validity: "Valid for 8 months",
    tagline: "Find your perfect roommate",
    description:
      "Unlock roommate profiles and view contact details — completely ad-free.",
    icon: Users,
    gradient: "from-sky-500 to-cyan-500",
    glowColor: "rgba(14, 165, 233, 0.3)",
    borderColor: "border-sky-500/30",
    bgAccent: "bg-sky-500/10",
    textAccent: "text-sky-400",
    features: [
      { text: "View roommate profiles", icon: Eye, included: true },
      { text: "See contact details", icon: Phone, included: true },
      { text: "Ad-free roommate browsing", icon: BanIcon, included: true },
      { text: "Verified student profiles", icon: Shield, included: true },
      { text: "eLib premium access", icon: BookOpen, included: false },
      { text: "Unlimited downloads", icon: Download, included: false },
      { text: "Comparison tools", icon: BarChart3, included: false },
    ],
    popular: false,
  },
  {
    id: "sic-premium",
    name: "SIC Premium",
    price: 49,
    period: "one-time",
    validity: "Valid for 2 months",
    tagline: "Everything SRM Insider offers",
    description:
      "Full access to all SRM Insider Community services — eLib, downloads, comparisons, and more.",
    icon: Crown,
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    glowColor: "rgba(245, 158, 11, 0.3)",
    borderColor: "border-amber-500/30",
    bgAccent: "bg-amber-500/10",
    textAccent: "text-amber-400",
    features: [
      { text: "View roommate profiles", icon: Eye, included: true },
      { text: "See contact details", icon: Phone, included: true },
      { text: "Ad-free everywhere", icon: BanIcon, included: true },
      { text: "Verified student profiles", icon: Shield, included: true },
      { text: "eLib premium access", icon: BookOpen, included: true },
      { text: "Unlimited downloads", icon: Download, included: true },
      { text: "Comparison tools", icon: BarChart3, included: true },
    ],
    popular: true,
  },
];

const comparisonFeatures = [
  {
    name: "View roommate profiles",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "See contact details",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Ad-free roommate browsing",
    free: false,
    basic: true,
    premium: true,
  },
  {
    name: "Verified student profiles",
    free: true,
    basic: true,
    premium: true,
  },
  {
    name: "eLib premium access",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "Unlimited downloads",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "Ad-free across all SIC services",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "Comparison tools",
    free: false,
    basic: false,
    premium: true,
  },
  {
    name: "Priority support",
    free: false,
    basic: false,
    premium: true,
  },
];

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 animate-fade-up">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] gap-2 pl-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur-md opacity-30" />
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Premium Plans
            </h1>
          </div>

          <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Unlock the full power of SRM Insider Community. Choose the plan that
            fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.id;

            return (
              <div
                key={plan.id}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative overflow-hidden rounded-3xl border transition-all duration-500 ${
                    plan.popular
                      ? `${plan.borderColor} shadow-[0_0_60px_-12px_${plan.glowColor}]`
                      : "border-[var(--border-primary)]"
                  } ${
                    isHovered
                      ? "border-[var(--border-accent)] shadow-[var(--shadow-glow)] -translate-y-2"
                      : ""
                  }`}
                  style={{
                    background: "var(--bg-card)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  {/* Gradient glow top */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient}`}
                  />

                  {/* Shimmer effect on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div
                        className="absolute inset-0 animate-shimmer"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${plan.glowColor} 50%, transparent 100%)`,
                          opacity: 0.1,
                        }}
                      />
                    </div>
                  )}

                  <div className="relative p-6 sm:p-8 space-y-6">
                    {/* Plan header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl ${plan.bgAccent} border ${plan.borderColor}`}
                        >
                          <Icon className={`h-5 w-5 ${plan.textAccent}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">
                            {plan.name}
                          </h3>
                          <p className="text-xs text-[var(--text-muted)] font-medium">
                            {plan.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm text-[var(--text-muted)] font-medium">
                        ₹
                      </span>
                      <span
                        className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                      >
                        {plan.price}
                      </span>
                      <div className="flex flex-col ml-1">
                        <span className="text-sm text-[var(--text-muted)] font-medium leading-tight">
                          one-time
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] opacity-60">
                          no recurring charges
                        </span>
                      </div>
                    </div>

                    {/* Validity badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${plan.bgAccent} border ${plan.borderColor} w-fit`}
                    >
                      <Clock className={`h-3.5 w-3.5 ${plan.textAccent}`} />
                      <span
                        className={`text-xs font-semibold ${plan.textAccent}`}
                      >
                        {plan.validity}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-[var(--border-primary)]" />

                    {/* Features */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                        What&apos;s included
                      </p>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, i) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <li
                              key={i}
                              className={`flex items-center gap-3 text-sm ${
                                feature.included
                                  ? "text-[var(--text-primary)]"
                                  : "text-[var(--text-muted)] opacity-50"
                              }`}
                            >
                              <div
                                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                                  feature.included
                                    ? `${plan.bgAccent}`
                                    : "bg-[var(--bg-hover)]"
                                }`}
                              >
                                {feature.included ? (
                                  <Check
                                    className={`h-3 w-3 ${plan.textAccent}`}
                                  />
                                ) : (
                                  <X className="h-3 w-3 text-[var(--text-muted)]" />
                                )}
                              </div>
                              <FeatureIcon
                                className={`h-3.5 w-3.5 flex-shrink-0 ${
                                  feature.included
                                    ? plan.textAccent
                                    : "text-[var(--text-muted)]"
                                }`}
                              />
                              <span className="font-medium">
                                {feature.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Link href="/dashboard" className="block">
                      <button
                        className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                          plan.popular
                            ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`
                            : "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--border-accent)] hover:bg-[var(--accent)] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {plan.popular ? (
                            <Zap className="h-4 w-4" />
                          ) : (
                            <Sparkles className="h-4 w-4" />
                          )}
                          Get {plan.name}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="space-y-8 animate-fade-up animation-delay-2000">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Compare <span className="text-gradient">Plans</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">
              See exactly what you get with each plan. No hidden fees, no
              surprises.
            </p>
          </div>

          <div className="card-premium overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-0 border-b border-[var(--border-primary)]">
              <div className="p-4 sm:p-6">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Features
                </span>
              </div>
              <div className="p-4 sm:p-6 text-center border-l border-[var(--border-primary)]">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Free
                </span>
                <span className="text-lg sm:text-xl font-black text-[var(--text-primary)] mt-1 block">
                  ₹0
                </span>
              </div>
              <div className="p-4 sm:p-6 text-center border-l border-[var(--border-primary)] bg-sky-500/5">
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                  Roomie Basic
                </span>
                <span className="text-lg sm:text-xl font-black text-sky-400 mt-1 block">
                  ₹9
                </span>
              </div>
              <div className="p-4 sm:p-6 text-center border-l border-[var(--border-primary)] bg-amber-500/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                  SIC Premium
                </span>
                <span className="text-lg sm:text-xl font-black text-amber-400 mt-1 block">
                  ₹49
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {comparisonFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-0 transition-colors duration-200 hover:bg-[var(--bg-hover)] ${
                  index !== comparisonFeatures.length - 1
                    ? "border-b border-[var(--border-primary)]"
                    : ""
                }`}
              >
                <div className="p-3.5 sm:p-5 flex items-center">
                  <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                    {feature.name}
                  </span>
                </div>
                <div className="p-3.5 sm:p-5 flex items-center justify-center border-l border-[var(--border-primary)]">
                  {feature.free ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[var(--bg-hover)] flex items-center justify-center">
                      <X className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-40" />
                    </div>
                  )}
                </div>
                <div className="p-3.5 sm:p-5 flex items-center justify-center border-l border-[var(--border-primary)] bg-sky-500/[0.02]">
                  {feature.basic ? (
                    <div className="w-6 h-6 rounded-full bg-sky-500/15 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-sky-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[var(--bg-hover)] flex items-center justify-center">
                      <X className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-40" />
                    </div>
                  )}
                </div>
                <div className="p-3.5 sm:p-5 flex items-center justify-center border-l border-[var(--border-primary)] bg-amber-500/[0.02]">
                  {feature.premium ? (
                    <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[var(--bg-hover)] flex items-center justify-center">
                      <X className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-40" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
