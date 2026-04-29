import type { Experience } from "@/types/portfolio";

type ExperienceSectionProps = {
  experiences: Experience[];
};

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-24 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-8 mb-12 md:mb-20">
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-[-0.04em] leading-none">
          Experience
        </h2>
        <div className="hidden md:block h-[2px] flex-1 bg-black" />
        <span className="text-[11px] font-bold uppercase tracking-[0.3em] whitespace-nowrap">
          {experiences.length} Roles
        </span>
      </div>

      <div className="space-y-0">
        {experiences.map((exp, idx) => (
          <article
            key={exp.company + idx}
            className="border-t-2 border-black py-8 md:py-12 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight">
                  {exp.role}
                </h3>
                <p className="text-sm font-bold uppercase tracking-[0.15em] mt-2">
                  {exp.company}
                  {exp.location && <span className="font-normal"> — {exp.location}</span>}
                </p>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] border-2 border-black px-4 py-2 self-start whitespace-nowrap">
                {exp.period}
              </span>
            </div>

            <ul className="space-y-3 mb-8 max-w-3xl">
              {exp.bullets.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-4">
                  <span className="font-black select-none">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tech.map((tag) => (
                <span
                  key={tag}
                  className="border border-black text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
        <div className="border-t-2 border-black" />
      </div>
    </section>
  );
}