import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Initialize the Geist font with Latin subset
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Initialize the Geist Mono font with Latin subset
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for better SEO
export const metadata: Metadata = {
  title: "How many applications?!",
  description: "Professional job application tracker to organize your job search, track applications, interviews, and offers. Built with Next.js and modern UI components.",
  keywords: ["job application tracker", "career management", "job search", "interview tracking", "resume management", "career tools"],
  authors: [{ name: "How many applications?! Team" }],
  creator: "How many applications?!",
  publisher: "How many applications?!",
  openGraph: {
    title: "How many applications?!",
    description: "Professional job application tracker to organize your job search, track applications, interviews, and offers.",
    url: "https://job-application-tracker.vercel.app/",
    siteName: "How many applications?!",
    images: [
      {
        url: "/job.png",
        width: 1200,
        height: 630,
        alt: "How many applications?! - Professional Career Management Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How many applications?!",
    description: "Professional job application tracker to organize your job search, track applications, interviews, and offers.",
    images: ["/job.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
