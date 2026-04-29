import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://guyasong.me";

const githubUrl = "https://github.com/guyasong2";
const linkedinUrl = "https://www.linkedin.com/in/guy-asong-b8b1441b5/";
const emailUrl = "mailto:guyasong1@gmail.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Guy Asong | Cybersecurity Analyst & Developer",
    template: "%s | Guy Asong"
  },
  description:
    "Professional portfolio of Guy Asong, a cybersecurity practitioner and full-stack developer specializing in secure web applications.",
  keywords: [
    "Guy Asong",
    "cybersecurity",
    "penetration testing",
    "full stack developer",
    "Next.js",
    "secure coding",
    "Django",
    "Python",
  ],
  authors: [{ name: "Guy Asong", url: siteUrl }],
  openGraph: {
    title: "Guy Asong | Cybersecurity Analyst & Developer",
    description:
      "Cybersecurity practitioner building and securing modern web applications.",
    url: siteUrl,
    siteName: "Guy Asong",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Guy Asong | Cybersecurity Analyst & Developer",
    description:
      "Cybersecurity practitioner building and securing modern web applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-PV4MBXKX0S" />
      <body
        className={`${inter.className} antialiased min-h-screen bg-white text-black`}
      >
        <ReadingProgressBar />
        <Navbar
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          emailUrl={emailUrl}
        />

        <main className="w-full">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}