import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://srmroomie.ktr.srminsider.live"),
  title: "SRM ROOMIE | Find Your Perfect Roommate at SRM",
  description:
    "Connect with verified SRM students and find your ideal roommate. Real profiles, real students, instant matching.",
  keywords: [
    "SRM",
    "roommate",
    "hostel",
    "SRM University",
    "roommate finder",
    "SRM Insider",
  ],
  alternates: {
    canonical: "https://srmroomie.ktr.srminsider.live",
  },
  openGraph: {
    title: "SRM ROOMIE | Find Your Perfect Roommate at SRM",
    description:
      "Connect with verified SRM students and find your ideal roommate.",
    url: "https://srmroomie.ktr.srminsider.live",
    siteName: "SRM ROOMIE",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-9391004376397816",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SRM ROOMIE",
  url: "https://srmroomie.ktr.srminsider.live",
  description:
    "Connect with verified SRM students and find your ideal roommate.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-8P87N5679V"} />
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree.js"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col relative`}
        style={{
          background: "var(--bg-primary)",
          transition: "background 0.4s ease",
        }}
      >
        <ThemeProvider>
          <div className="noise-overlay" />
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-500">
            <div
              className="glow-orb w-[500px] h-[500px] -top-[200px] -left-[100px] animate-blob opacity-30"
              style={{ background: "var(--accent-glow)" }}
            />
            <div
              className="glow-orb w-[400px] h-[400px] top-[40%] -right-[100px] animate-blob animation-delay-2000 opacity-20"
              style={{ background: "var(--accent-glow)" }}
            />
            <div
              className="glow-orb w-[350px] h-[350px] -bottom-[100px] left-[30%] animate-blob animation-delay-4000 opacity-15"
              style={{ background: "var(--accent-glow)" }}
            />
          </div>
          <Header />
          <main className="flex-1 flex flex-col relative z-20">{children}</main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function resetViewport() {
                    setTimeout(function() {
                      window.scrollTo(0, window.scrollY);
                      document.body.style.height = '100%';
                      requestAnimationFrame(function() {
                        document.body.style.height = '';
                      });
                    }, 100);
                  }
                  document.addEventListener('focusout', function(e) {
                    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) {
                      resetViewport();
                    }
                  });
                  if (window.visualViewport) {
                    var prevHeight = window.visualViewport.height;
                    window.visualViewport.addEventListener('resize', function() {
                      var currHeight = window.visualViewport.height;
                      if (currHeight > prevHeight + 50) {
                        resetViewport();
                      }
                      prevHeight = currHeight;
                    });
                  }
                })();
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
