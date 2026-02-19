"use client";

import { ArrowLeft, ShieldCheck, Calendar, Globe, Scale } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TermsPage() {
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
              <Scale className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Terms & Conditions
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Calendar className="h-4 w-4" />
            <span>Last updated on 19-02-2026 10:17:59</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="card-premium p-6 sm:p-10 space-y-6 animate-fade-up animation-delay-1000">
          <div className="prose prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
            <p className="mb-4">
              These Terms and Conditions, along with privacy policy or other
              terms (“Terms”) constitute a binding agreement by and between{" "}
              <strong className="text-[var(--text-primary)]">
                ANUJ TIWARI
              </strong>
              , ( “Website Owner” or “we” or “us” or “our”) and you (“you” or
              “your”) and relate to your use of our website, goods (as
              applicable) or services (as applicable) (collectively,
              “Services”).
            </p>

            <p className="mb-4">
              By using our website and availing the Services, you agree that you
              have read and accepted these Terms (including the Privacy Policy).
              We reserve the right to modify these Terms at any time and without
              assigning any reason. It is your responsibility to periodically
              review these Terms to stay informed of updates.
            </p>

            <div className="grid gap-6 my-8">
              <div className="p-4 rounded-xl bg-[var(--bg-hover)] border border-[var(--border-primary)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[var(--accent)]" />
                  Terms of Use
                </h3>
                <p>
                  The use of this website or availing of our Services is subject
                  to the following terms of use:
                </p>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-3 marker:text-[var(--accent)]">
              <li>
                To access and use the Services, you agree to provide true,
                accurate and complete information to us during and after
                registration, and you shall be responsible for all acts done
                through the use of your registered account.
              </li>
              <li>
                Neither we nor any third parties provide any warranty or
                guarantee as to the accuracy, timeliness, performance,
                completeness or suitability of the information and materials
                offered on this website or through the Services, for any
                specific purpose. You acknowledge that such information and
                materials may contain inaccuracies or errors and we expressly
                exclude liability for any such inaccuracies or errors to the
                fullest extent permitted by law.
              </li>
              <li>
                Your use of our Services and the website is solely at your own
                risk and discretion. You are required to independently assess
                and ensure that the Services meet your requirements.
              </li>
              <li>
                The contents of the Website and the Services are proprietary to
                Us and you will not have any authority to claim any intellectual
                property rights, title, or interest in its contents.
              </li>
              <li>
                You acknowledge that unauthorized use of the Website or the
                Services may lead to action against you as per these Terms or
                applicable laws.
              </li>
              <li>
                You agree to pay us the charges associated with availing the
                Services.
              </li>
              <li>
                You agree not to use the website and/ or Services for any
                purpose that is unlawful, illegal or forbidden by these Terms,
                or Indian or local laws that might apply to you.
              </li>
              <li>
                You agree and acknowledge that website and the Services may
                contain links to other third party websites. On accessing these
                links, you will be governed by the terms of use, privacy policy
                and such other policies of such third party websites.
              </li>
              <li>
                You understand that upon initiating a transaction for availing
                the Services you are entering into a legally binding and
                enforceable contract with the us for the Services.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">
              Refunds & Cancellations
            </h3>
            <p className="mb-4">
              You shall be entitled to claim a refund of the payment made by you
              in case we are not able to provide the Service. The timelines for
              such return and refund will be according to the specific Service
              you have availed or within the time period provided in our
              policies (as applicable). In case you do not raise a refund claim
              within the stipulated time, than this would make you ineligible
              for a refund.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">
              Force Majeure
            </h3>
            <p className="mb-4">
              Notwithstanding anything contained in these Terms, the parties
              shall not be liable for any failure to perform an obligation under
              these Terms if performance is prevented or delayed by a force
              majeure event.
            </p>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">
              Governing Law & Jurisdiction
            </h3>
            <p className="mb-4">
              These Terms and any dispute or claim relating to it, or its
              enforceability, shall be governed by and construed in accordance
              with the laws of India.
            </p>
            <p className="mb-4">
              All disputes arising out of or in connection with these Terms
              shall be subject to the exclusive jurisdiction of the courts in{" "}
              <strong className="text-[var(--text-primary)]">
                Chengalpattu, Tamil Nadu
              </strong>
              .
            </p>

            <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">
              Contact Us
            </h3>
            <p className="mb-4">
              All concerns or communications relating to these Terms must be
              communicated to us using the contact information provided on this
              website.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex justify-center animate-fade-up animation-delay-2000">
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm px-4 py-2 rounded-full border border-[var(--border-primary)] bg-[var(--bg-card)]">
            <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
            <span>By using SRM ROOMIE, you agree to these terms.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
