import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SRM ROOMIE | Find Your Perfect Roommate at SRM",
  description: "SRM ROOMIE helps SRM students connect with compatible roommates based on lifestyle, hostel block, and interests. Powered by SRM Insider Community.",
  keywords: ["SRM ROOMIE", "SRM Hostel", "SRM Insider", "Student Housing", "SRM University", "Roommate Matching"],
  authors: [{ name: "SRM Insider Community" }],
  creator: "SRM Insider Community",
  publisher: "SRM Insider Community",
  metadataBase: new URL("https://srmroomie.ktr.srminsider.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SRM ROOMIE | Find Your Perfect Roommate",
    description: "Connect with verified SRM students, match by hostel preferences, and find your ideal roommate. Safe, secure, and student-focused.",
    url: "https://srmroomie.ktr.srminsider.live",
    siteName: "SRM ROOMIE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://srmroomie.ktr.srminsider.live/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SRM ROOMIE Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SRM ROOMIE",
    description: "Find your perfect roommate at SRM University. Verified profiles, hostel matching, and more.",
    creator: "@srminsider",
    images: ["https://srmroomie.ktr.srminsider.live/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SRM ROOMIE",
  "url": "https://srmroomie.ktr.srminsider.live",
  "description": "The official roommate matching platform for SRM University students.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://srmroomie.ktr.srminsider.live/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-100 text-gray-900`}
      >
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8P87N5679V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8P87N5679V');
          `}
        </Script>
      </body>
    </html>
  );
}
