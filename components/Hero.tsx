"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-line-1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" })
      .fromTo(".hero-line-2", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.7")
      .fromTo(".hero-line-3", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power4.out" }, "-=0.7")
      .fromTo(".hero-meta", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo(".hero-image", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, "-=0.8")
      .fromTo(".hero-scroll", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

    // Subtle float for image
    gsap.to(".hero-image", {
      y: -12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: container });

  return (
    <section ref={container} className="min-h-[90vh] flex flex-col justify-center bg-black text-white py-16 md:py-24 px-6 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-12 md:gap-16 lg:gap-24">

        {/* Text */}
        <div className="flex-1 space-y-6 md:space-y-10 text-center lg:text-left">
          <div className="overflow-hidden">
            <h1 className="hero-line-1 text-[clamp(3rem,12vw,8rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase">
              GUY ASONG
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="hero-line-3 text-[clamp(0.85rem,2.5vw,1.5rem)] font-bold uppercase tracking-[0.15em]">
              Full-Stack Developer<br />
              & Aspiring Cybersecurity Analyst
            </p>
          </div>

          <div className="hero-meta flex flex-col sm:flex-row gap-4 md:gap-8 pt-6 md:pt-8 justify-center lg:justify-start">
            <button
              onClick={handleViewProjects}
              className="bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] px-8 md:px-10 py-4 md:py-5 border-2 border-white hover:bg-black hover:text-white transition-all"
            >
              View Work
            </button>
            <a
              href="https://drive.google.com/file/d/1tYqOTggMNM1JLh2GaLayv8PL8F-crjkF/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-white font-black uppercase tracking-[0.2em] text-[11px] px-8 md:px-10 py-4 md:py-5 hover:bg-white hover:text-black transition-all text-center"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="hero-image w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] relative overflow-hidden rounded-full flex-shrink-0">
          <Image
            src="/bg.png"
            alt="Guy Asong"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Scroll</span>
        <FaArrowDown className="text-xs animate-bounce" />
      </div>
    </section>
  );
}