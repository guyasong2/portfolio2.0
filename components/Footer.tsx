// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="pt-6 border-t border-base-300/70 text-xs text-base-content/60 flex flex-col md:flex-row items-center justify-between gap-2">
      <span>© {new Date().getFullYear()} Guy Asong. All rights reserved.</span>
      <span>
        Built with <span className="font-medium">Next.js</span>,{" "}
        <span className="font-medium">Tailwind CSS</span> &{" "}
        <span className="font-medium">daisyUI</span>.
      </span>
    </footer>
  );
}