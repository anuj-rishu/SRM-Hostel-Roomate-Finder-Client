"use client";

import { ArrowLeft, Calendar, RefreshCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function RefundPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
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
            <div className="p-2 rounded-xl bg-[var(--accent-subtle)] border border-[var(--border-accent)]">
              <RefreshCcw className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Cancellation & Refund Policy
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Calendar className="h-4 w-4" />
            <span>Last updated on 19-02-2026 10:27:51</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="card-premium p-6 sm:p-10 space-y-6 animate-fade-up animation-delay-1000">
          <div className="prose prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
            <p className="mb-4">
              <strong className="text-[var(--text-primary)]">
                ANUJ TIWARI
              </strong>{" "}
              believes in helping its customers as far as possible, and has
              therefore a liberal cancellation policy. Under this policy:
            </p>

            <ul className="list-disc pl-5 space-y-4 marker:text-[var(--accent)]">
              <li>
                Cancellations will be considered only if the request is made
                immediately after placing the order. However, the cancellation
                request may not be entertained if the orders have been
                communicated to the vendors/merchants and they have initiated
                the process of shipping them.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">
                  ANUJ TIWARI
                </strong>{" "}
                does not accept cancellation requests for perishable items like
                flowers, eatables etc. However, refund/replacement can be made
                if the customer establishes that the quality of product
                delivered is not good.
              </li>
              <li>
                In case of receipt of damaged or defective items please report
                the same to our Customer Service team. The request will,
                however, be entertained once the merchant has checked and
                determined the same at his own end. This should be reported
                within{" "}
                <strong className="text-[var(--text-primary)]">30 Days</strong>{" "}
                of receipt of the products. In case you feel that the product
                received is not as shown on the site or as per your
                expectations, you must bring it to the notice of our customer
                service within{" "}
                <strong className="text-[var(--text-primary)]">30 Days</strong>{" "}
                of receiving the product. The Customer Service Team after
                looking into your complaint will take an appropriate decision.
              </li>
              <li>
                In case of complaints regarding products that come with a
                warranty from manufacturers, please refer the issue to them. In
                case of any Refunds approved by{" "}
                <strong className="text-[var(--text-primary)]">
                  ANUJ TIWARI
                </strong>
                , it’ll take{" "}
                <strong className="text-[var(--text-primary)]">6-8 Days</strong>{" "}
                for the refund to be processed to the end customer.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
