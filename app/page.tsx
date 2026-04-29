import { createClient } from "@/utils/supabase/server";
import { education, experiences } from "@/data/portfolioData";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import PostCard from "@/components/blog/PostCard";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const { data: projectsData } = await supabase
    .from("projects")
    .select(`
      id, name, description, demo_url, code_url,
      project_tech (
        tech_categories (name)
      )
    `)
    .eq("published", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  const { data: featuredPosts } = await supabase
    .from("posts")
    .select(`
      id, title, slug, excerpt, cover_image, created_at, featured,
      categories(name)
    `)
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const formattedProjects = (projectsData || []).map((project: any) => ({
    name: project.name,
    description: project.description,
    demoUrl: project.demo_url,
    codeUrl: project.code_url,
    tech: project.project_tech?.map((pt: any) => pt.tech_categories?.name).filter(Boolean) || [],
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero — full-bleed black */}
      <Hero />

      {/* Experience — white section */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16">
        <ExperienceSection experiences={experiences} />
      </div>

      {/* Projects — full-bleed black */}
      <ProjectsSection projects={formattedProjects} />

      {/* Featured Blog — white section */}
      {featuredPosts && featuredPosts.length > 0 && (
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-8 mb-12 md:mb-20">
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-[-0.04em] leading-none">
              Writing
            </h2>
            <div className="hidden md:block h-[2px] flex-1 bg-black" />
            <Link
              href="/blog"
              className="text-[11px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline transition-all whitespace-nowrap"
            >
              All Posts →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Education — white section */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16">
        <EducationSection education={education} />
      </div>
    </div>
  );
}