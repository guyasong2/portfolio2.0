import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const githubUrl = "https://github.com/your-username";
const linkedinUrl = "https://linkedin.com/in/your-username";
const emailUrl = "mailto:you@example.com";

export const metadata: Metadata = {
  title: "Guy Asong - Full-Stack Developer and an aspiring cybersecurity student",
  description:
    "Portfolio of Guy Asong, full-stack developer working with Next.js, React, TypeScript, Tailwind CSS, Django, DRF, and Python. Also an aspiring cybersecurity student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar
                githubUrl={githubUrl}
                linkedinUrl={linkedinUrl}
                emailUrl={emailUrl}
              />
        {children}
        <div className="max-w-5xl mx-auto px-4 pb-16 space-y-20 md:space-y-24">
          <Footer/>
        </div>
      </body>
    </html>
  );
}