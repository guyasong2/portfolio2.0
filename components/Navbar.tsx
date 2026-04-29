"use client";

import { useState } from "react";
import { FaGithub, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { FiMail, FiLinkedin } from "react-icons/fi";
import Link from "next/link";

type NavbarProps = {
  githubUrl: string;
  linkedinUrl: string;
  emailUrl: string;
};

export default function Navbar({
  githubUrl,
  linkedinUrl,
  emailUrl,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-white">
      <div className="flex justify-between h-16 items-center w-full max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="flex items-center gap-16">
          <Link href="/" className="text-base md:text-lg font-black uppercase tracking-[0.3em]">
            GUY ASONG
          </Link>
          <nav className="hidden md:flex gap-10">
            <Link href="/#projects" className="text-sm font-bold uppercase tracking-[0.2em] hover:line-through transition-all">Work</Link>
            <Link href="/#experience" className="text-sm font-bold uppercase tracking-[0.2em] hover:line-through transition-all">Experience</Link>
            <Link href="/blog" className="text-sm font-bold uppercase tracking-[0.2em] hover:line-through transition-all">Blog</Link>
          </nav>
        </div>

        {/* Desktop social icons */}
        <div className="hidden md:flex items-center gap-4">
          <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity p-1" aria-label="GitHub">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity p-1" aria-label="LinkedIn">
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a href={emailUrl} className="hover:opacity-50 transition-opacity p-1" aria-label="Email">
            <FiMail className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@codeguru3204" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity p-1" aria-label="YouTube">
            <FaYoutube className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-black bg-white">
          <nav className="flex flex-col">
            <Link href="/#projects" onClick={() => setIsOpen(false)} className="px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] border-b border-black hover:bg-black hover:text-white transition-all">
              Work
            </Link>
            <Link href="/#experience" onClick={() => setIsOpen(false)} className="px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] border-b border-black hover:bg-black hover:text-white transition-all">
              Experience
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] border-b border-black hover:bg-black hover:text-white transition-all">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-6 px-6 py-4">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity" aria-label="GitHub">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity" aria-label="LinkedIn">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href={emailUrl} className="hover:opacity-50 transition-opacity" aria-label="Email">
              <FiMail className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@codeguru3204" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity" aria-label="YouTube">
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
