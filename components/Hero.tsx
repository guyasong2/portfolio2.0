// components/Hero.tsx
import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiDjango,
  SiPython,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiOwasp,
  SiVercel,
} from "react-icons/si";
import { RiShieldKeyholeLine, RiShieldCheckLine } from "react-icons/ri";
import { TbApi } from "react-icons/tb";

type HeroProps = {
  onViewProjects: () => void;
};

const stackItems = [
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "React", Icon: SiReact },
  { label: "JavaScript", Icon: SiJavascript },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Tailwind", Icon: SiTailwindcss },
  { label: "Django", Icon: SiDjango },
  { label: "Django REST Framework", Icon: TbApi },
  { label: "Python", Icon: SiPython },
  { label: "Cybersecurity", Icon: RiShieldKeyholeLine },
  { label: "Secure Coding", Icon: RiShieldCheckLine },
  { label: "OWASP Top 10", Icon: SiOwasp },
  { label: "Git", Icon: SiGit },
  { label: "GitHub", Icon: SiGithub },
  { label: "Docker", Icon: SiDocker },
  { label: "Linux", Icon: SiLinux },
  { label: "Vercel", Icon: SiVercel },
];

export default function Hero({ onViewProjects }: HeroProps) {
  return (
    <section className="pt-10 md:pt-16">
      <div
        className="
          hero
          rounded-2xl
          border border-base-300/60
          shadow-xl overflow-hidden
          p-6 md:p-10 
        "
      >
        <div
          className="
            hero-content
            w-full
            flex flex-col md:flex-row
            items-start
            justify-between
            gap-8 md:gap-12
          "
        >
          {/* Left: text */}
          <div className="space-y-5 max-w-xl md:max-w-2xl flex-1">
            <p className="uppercase tracking-[0.2em] text-xs text-primary/80 font-bold">
              Full-Stack Developer · Cybersecurity
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              I build and secure modern web applications from idea to production.
            </h1>
            <p className="text-sm md:text-base text-base-content/80">
              I’m <span className="font-medium">Guy Asong</span>, a full‑stack developer and
              cybersecurity practitioner. I work with{" "}
              <span className="font-medium">
                Next.js, React, TypeScript, Tailwind CSS, Django, Django REST Framework, and Python
              </span>
              , and I apply secure‑by‑design principles and app‑sec practices to keep systems safe.
              I deploy applications with <span className="font-medium">Vercel</span> and{" "}
              <span className="font-medium">PythonAnywhere</span>, delivering production‑ready,
              secure solutions for companies and clients.
            </p>
          </div>

          {/* Right: stack & tools card */}
          <div className="relative w-full md:w-96 lg:w-96 shrink-0">
            <div className="relative h-60 md:h-64 rounded-3xl border border-base-300/60 flex flex-col justify-between p-3 md:p-5 shadow-lg">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-base-content/60 mb-2">
                  Stack and tools
                </p>
                <div className="flex flex-wrap gap-2">
                  {stackItems.map(({ label, Icon }) => (
                    <span
                      key={label}
                      className="badge badge-sm border-primary/40 bg-base-100/70 text-xs inline-flex items-center gap-1.5"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between pt-3">
                <div>
                  <p className="text-xs text-base-content/60">Available for</p>
                  <p className="font-semibold text-sm">Full‑time & Freelance</p>
                </div>
                <a
                  href="mailto:guyasong1@gmail.com"
                  className="bg-black rounded-lg text-white py-2 px-2 text-center text-sm"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-6 h-24 w-24 rounded-full bg-primary/40 blur-3xl opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}