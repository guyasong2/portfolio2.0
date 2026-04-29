import type { Education } from "@/types/portfolio";

type EducationSectionProps = {
  education: Education[];
};

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education.length) return null;

  return (
    <section id="education" className="scroll-mt-24 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-8 mb-12 md:mb-20">
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-[-0.04em] leading-none">
          Education
        </h2>
        <div className="hidden md:block h-[2px] flex-1 bg-black" />
      </div>

      <div className="space-y-0">
        {education.map((edu, idx) => (
          <article
            key={edu.school + idx}
            className="border-t-2 border-black py-8 md:py-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight">
                  {edu.degree}
                  {edu.field && <span className="font-bold"> — {edu.field}</span>}
                </h3>
                {edu.school && (
                  <p className="text-sm font-bold uppercase tracking-[0.15em] mt-2">
                    {edu.school}
                    {edu.location && <span className="font-normal"> — {edu.location}</span>}
                  </p>
                )}
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] border-2 border-black px-4 py-2 self-start whitespace-nowrap">
                {edu.period}
              </span>
            </div>

            {edu.bullets && edu.bullets.length > 0 && (
              <ul className="space-y-3 max-w-3xl">
                {edu.bullets.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed flex gap-4">
                    <span className="font-black select-none">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
        <div className="border-t-2 border-black" />
      </div>
    </section>
  );
}