// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// TODO: change this to your real deployed URL when you have a custom domain
const siteUrl = "https://your-domain.com";

const githubUrl = "https://github.com/guyasong2";
const linkedinUrl = "https://www.linkedin.com/in/guy-asong-b8b1441b5/";
const emailUrl = "mailto:guyasong1@gmail.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Guy Asong | Full‑Stack Developer & Cybersecurity Practitioner",
  description:
    "Portfolio of Guy Asong, a full‑stack developer and aspiring cybersecurity professional building secure web applications with Next.js, React, TypeScript, Tailwind CSS, Django, Django REST Framework, and Python.",
  keywords: [
    "Guy Asong",
    "full stack developer",
    "Next.js developer",
    "Django developer",
    "Django REST Framework",
    "TypeScript",
    "Python",
    "Tailwind CSS",
    "cybersecurity",
    "Cameroon",
    "Buea",
  ],
  authors: [{ name: "Guy Asong", url: siteUrl }],
  openGraph: {
    title: "Guy Asong | Full‑Stack Developer & Cybersecurity",
    description:
      "Full‑stack developer and cybersecurity practitioner building and securing modern web applications with Next.js, React, TypeScript, Django & Python.",
    url: siteUrl,
    siteName: "Guy Asong Portfolio",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Guy Asong | Full‑Stack Developer & Cybersecurity",
    description:
      "Portfolio of Guy Asong, full‑stack developer and cybersecurity practitioner working with Next.js, React, TypeScript, Django & Python.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-base-100 text-base-content`}
      >
        <Navbar
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          emailUrl={emailUrl}
        />

        {/* Main page content in a centered container */}
        <main className="max-w-5xl mx-auto px-4 pb-16 space-y-20 md:space-y-24">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}