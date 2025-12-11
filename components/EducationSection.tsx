// components/EducationSection.tsx
import type { Education } from "@/types/portfolio";

type EducationSectionProps = {
  education: Education[];
};

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education.length) return null;

  return (
    <section id="education" className="scroll-mt-24 space-y-8">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Education</h2>
        <p className="text-xs md:text-sm text-base-content/70 font-bold">
          Formal training and academic background
        </p>
      </div>

      <div className="mt-6">
        {/* Vertical timeline line */}
        <ul className="relative ml-4 md:ml-6 border-l-2 border-base-300/70">
          {education.map((edu, idx) => (
            <li
              key={edu.school + idx}
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
              <article className="bg-base-200/40">
                <div className="card-body gap-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="card-title text-base md:text-lg font-bold">
                        {edu.degree}
                        {edu.field && (
                          <span className="font-bold ">
                            {" "}
                            · {edu.field}
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-base-content/80 italic font-semibold">
                        {edu.school}
                        {edu.location && (
                          <>
                            {" "}
                            ·{" "}
                            <span className="text-base-content/60">
                              {edu.location}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <span className="text-xs md:text-sm text-base-content/60 font-bold">
                      {edu.period}
                    </span>
                  </div>

                  {edu.bullets && edu.bullets.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-base-content/80">
                      {edu.bullets.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}