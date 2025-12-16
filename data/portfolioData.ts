// data/portfolioData.ts
import type { Experience, Project, Education } from "@/types/portfolio";

export const experiences: Experience[] = [
  {
    role: "Founder · Full‑Stack Developer",
    company: "Jarr (jarr.cm)",
    period: "Dec 2024 – Present",
    location: "Buea · Hybrid",
    bullets: [
      "Founder and full‑stack developer of Jarr, an AI study platform that turns past exam papers into smarter revision tools.",
      "Designed the architecture and implemented full‑stack features using Next.js, Django REST Framework and modern tooling.",
      "Own deployment, monitoring and iteration based on student feedback.",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Django",
      "Django REST Framework",
      "Python",
      "Vercel",
      "PythonAnywhere",
    ],
  },
  {
    role: "Intern · Application Security & Backend",
    company: "Orange Digital Center, University of Buea",
    period: "Jun 2024 – Present",
    location: "Cameroon · On‑site",
    bullets: [
      "Tested solutions for security vulnerabilities using various tools and manual techniques.",
      "Developed a Django‑based project to enhance functionality and reliability of internal tools.",
      "Collaborated with mentors and other interns on security‑focused features and reviews.",
    ],
    tech: ["Django", "Django REST Framework", "Python", "Nmap", "Linux", "Cybersecurity"],
  },
  {
    role: "Intern · Networking & Cybersecurity",
    company: "SPEEDNET",
    period: "Jul 2023 – May 2024",
    location: "Buea, Southwest, Cameroon · On‑site",
    bullets: [
      "Learned the basics of networking through practical experience with SOHO and enterprise networks.",
      "Assisted in setting up and troubleshooting network infrastructures and CCTV installations.",
      "Documented configurations and best practices for small business environments.",
    ],
    tech: ["Network Security", "Routing & Switching", "CCTV", "Linux"],
  },
  {
    role: "Content Creator",
    company: "YouTube · Freelance",
    period: "Mar 2019 – Present",
    location: "Buea, Southwest, Cameroon · Remote",
    bullets: [
      "Create tech and programming content focused on web development and cybersecurity.",
      "Use YouTube as a platform to both teach and deepen my own understanding of core concepts.",
      "Engage with a growing audience through tutorials, walkthroughs and project breakdowns.",
    ],
    tech: ["YouTube", "Content Creation", "Video Editing", "Public Speaking"],
  },
  {
    role: "Frontend Developer",
    company: "Wodarr Technologies · Part‑time",
    period: "Aug 2020 – Sep 2020",
    location: "Buea, Southwest, Cameroon · On‑site",
    bullets: [
      "Worked with senior developers to build robust web applications with HTML5, CSS3, Bootstrap, PHP and MySQL.",
      "Implemented responsive UI components and assisted in debugging layout issues.",
      "Collaborated on small internal tools and client‑facing pages.",
    ],
    tech: ["HTML5", "CSS3", "Bootstrap", "PHP", "MySQL"],
  },
  {
    role: "Software Development Trainee",
    company: "Software Development Program (Attestation)",
    period: "2020",
    location: "Buea, Cameroon",
    bullets: [
      "Completed an intensive software development program focused on modern web technologies.",
      "Built small projects to practice core concepts and teamwork.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

/**
 * 🔧 EDIT HERE: Project items
 */
export const projects: Project[] = [
  {
    name: "Jarr AI Coming soon page",
    description:
      "A simple but sleek coming soon page for an AI study companion startup in my community",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Django", "PostgreSQL"],
    demoUrl: "https://jarr-cm.vercel.app/",
    codeUrl: "https://github.com/guyasong2/jarr",
  },
  {
    name: "Project Management Tool",
    description:
      "Kanban-style project management app with team workspaces, tasks, and activity timelines.",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    demoUrl: "https://example.com/demo-2",
    codeUrl: "https://github.com/your-username/project-2",
  },
  {
    name: "E-Commerce Platform",
    description:
      "Full-stack e-commerce experience with product listings, cart, checkout and admin dashboard.",
    tech: ["Django", "Python", "Tailwind CSS", "Stripe"],
    demoUrl: "https://example.com/demo-3",
    codeUrl: "https://github.com/your-username/project-3",
  },
  {
    name: "Developer Portfolio",
    description:
      "A fast, SEO-friendly portfolio site showcasing projects, experience, and contact details.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://example.com/demo-4",
    codeUrl: "https://github.com/your-username/project-4",
  },
  {
    name: "CamForgeX",
    description:
      "An AI powered music creation and generation app my team built for a 48 hours hackathon",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Django Rest Framework"],
    demoUrl: "https://camforgex-frontend.vercel.app/",
    codeUrl: "https://github.com/TanellyAg/CamForgeX",
  },
  {
    name: "ODC Share",
    description:
      "An internship project my team and i built to solve a problem of file sharing at our internship site",
    tech: ["Tailwind CSS", "Django"],
    demoUrl: "https://github.com/guyasong2/odc_share",
    codeUrl: "https://github.com/guyasong2/odc_share",
  },
];



export const education: Education[] = [
  {
    school: "Catholic University Institute of Buea",
    degree: "Bachelor’s degree",
    field: "Cybersecurity",
    period: "Oct 2024 – Present",
    location: "Buea, Cameroon",
    bullets: [
      "Studying core concepts in cybersecurity, networking, and secure software development.",
      "Coursework including programming (C), operating systems, and information security.",
    ],
  },
  {
    school: "",
    degree: "A-level",
    field: "Arts",
    period: "Sep 2023 – july 2024",
    location: "Buea, Cameroon",
    bullets: [
      "Studying A4 which is Mathematics, English, Computer Science, Economics, Geography.",
      "Graduated with a pass in 3 papers",
    ],
  },
];