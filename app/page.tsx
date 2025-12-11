// app/page.tsx
"use client";

import { education, experiences, projects  } from "@/data/portfolioData";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function HomePage() {
  // 🔧 EDIT HERE: Social links
  

  const scrollToProjects = () => {
    if (typeof document !== "undefined") {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">

      <main className="max-w-5xl mx-auto px-4 pb-16 space-y-20 md:space-y-24">
        <Hero onViewProjects={scrollToProjects} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} />
      </main>
    </div>
  );
}