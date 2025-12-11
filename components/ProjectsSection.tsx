// components/ProjectsSection.tsx
import type { Project } from "@/types/portfolio";
import { FaArrowRight } from "react-icons/fa6";

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="scroll-mt-24 space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
        <p className="text-xs md:text-sm text-base-content/70 font-bold">
          Selected work and experiments
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-lg bg-base-200/40 border border-base-300/70 hover:border-primary/60 transition duration-200 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col"
          >
            {/* card-body becomes a flex column that fills the card */}
            <div className="card-body flex flex-col flex-1 gap-4 px-3 py-3">
              <div>
                <h3 className="card-title text-base md:text-lg font-bold">
                  {project.name}
                </h3>
                <p className="text-sm text-base-content/80">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-outline border-primary/40 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 🔽 This row is pushed to the bottom of the card */}
              <div className="mt-auto flex gap-2 pt-2">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-black text-white py-1 px-3 text-xs rounded"
                >
                  Live Demo
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-base-300 text-xs py-1 px-3 rounded"
                >
                  Source Code
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <a href="https://github.com/guyasong2?tab=overview&from=2025-10-01&to=2025-10-31" className="font-bold flex items-center gap-3 hover:border-b-2 w-52">View more Projects <FaArrowRight /></a>
    </section>
  );
}