import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loan Calculator - EMI, Home Loan, Car Loan Calculator",
  description:
    "Free online loan calculator to calculate EMI, home loan, car loan, personal loan. Get accurate loan EMI calculations with our professional finance calculator.",
  keywords:
    "loan calculator, emi calculator, home loan calculator, car loan calculator, personal loan calculator, finance calculator",
  authors: [{ name: "Finance Calculator" }],
  openGraph: {
    title: "Loan Calculator - EMI, Home Loan, Car Loan Calculator",
    description:
      "Free online loan calculator to calculate EMI, home loan, car loan, personal loan.",
    type: "website",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V7MME7KLY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V7MME7KLY3');
          `}
        </Script>

      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
