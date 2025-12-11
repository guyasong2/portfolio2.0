// components/ExperienceSection.tsx
import type { Experience } from "@/types/portfolio";

type ExperienceSectionProps = {
  experiences: Experience[];
};

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Experience</h2>
        <p className="text-xs md:text-sm text-base-content/70 font-bold">
          Roles, responsibilities, and impact
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-6">
        {/* This border is the vertical timeline line */}
        <ul className="relative ml-4 md:ml-6 border-l-2 border-base-300/70">
          {experiences.map((exp, idx) => (
            <li
              key={exp.company + idx}
              className="relative mb-10 ml-4 last:mb-0"
            >
              {/* Circle on the line */}
              <span
                className="
                  absolute
                  -left-[25px]   
                  top-1
                  flex
                  h-4 w-4
                  items-center justify-center
                  rounded-full
                  border-2 border-primary
                  bg-base-100
                  shadow-sm
                "
              />

              {/* Card */}
              <article className="">
                <div className="card-body gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base md:text-lg font-bold">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-base-content/80 italic font-semibold">
                        {exp.company}
                        {exp.location && (
                          <>
                            {" "}
                            ·{" "}
                            <span className="text-base-content/60">
                              {exp.location}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <span className="text-xs md:text-sm text-base-content/60 font-bold">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80">
                    {exp.bullets.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.tech.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-outline border-primary/40 text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}