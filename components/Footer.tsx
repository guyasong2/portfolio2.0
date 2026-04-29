import Link from "next/link";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-16 py-16 md:py-24">
        {/* Large CTA */}
        <div className="mb-12 md:mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4 md:mb-6">Get in touch</p>
          <a
            href="mailto:guyasong1@gmail.com"
            className="text-xl sm:text-2xl md:text-4xl lg:text-[clamp(2rem,5vw,5rem)] font-black uppercase tracking-[-0.03em] leading-tight hover:line-through transition-all block break-all sm:break-normal"
          >
            guyasong1@gmail.com
          </a>
        </div>

        {/* Links row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 border-t-2 border-white pt-8 md:pt-12">
          <div className="flex gap-6 md:gap-8">
            <a href="https://github.com/guyasong2" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity" aria-label="GitHub">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/guy-asong-b8b1441b5/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity" aria-label="LinkedIn">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@codeguru3204" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity" aria-label="YouTube">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="mailto:guyasong1@gmail.com" className="hover:opacity-50 transition-opacity" aria-label="Email">
              <FiMail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Guy Asong
          </p>
        </div>
      </div>
    </footer>
  );
}