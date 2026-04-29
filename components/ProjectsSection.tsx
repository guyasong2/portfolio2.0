"use client";

import { useRef } from "react";
import type { Project } from "@/types/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card: any, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
          delay: i * 0.05,
        }
      );
    });
  }, { scope: container });

  return (
    <section id="projects" ref={container} className="scroll-mt-24 bg-black text-white -mx-6 md:-mx-8 px-6 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-8 mb-12 md:mb-20">
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-[-0.04em] leading-none">
            Selected Work
          </h2>
          <div className="hidden md:block h-[2px] flex-1 bg-white" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
            {projects.length} Projects
          </span>
        </div>

        {(!projects || projects.length === 0) ? (
          <div className="border-2 border-white py-32 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em]">No projects deployed yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-0">
            {projects.map((project, index) => (
              <article
                key={index}
                className="project-card border border-white p-6 md:p-10 flex flex-col justify-between gap-6 md:gap-10 group hover:bg-white hover:text-black transition-all duration-300 min-h-[260px] md:min-h-[320px]"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 block mb-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight mb-3 md:mb-4">
                    {project.name}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-md opacity-80">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="border border-current text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline transition-all"
                      >
                        Live →
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline transition-all"
                      >
                        Source →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}