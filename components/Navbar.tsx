import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMail, FiLinkedin } from "react-icons/fi";

type NavbarProps = {
  githubUrl: string;
  linkedinUrl: string;
  emailUrl: string;
};

export default function Navbar({
  githubUrl,
  linkedinUrl,
  emailUrl,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/80 backdrop-blur">
      <div className="flex justify-between py-3 px-5 items-center max-w-5xl mx-auto">
        <div className="flex-1">
          <a
            href="#"
            className="text-xl md:text-2xl font-semibold tracking-tight"
          >
            <span className="text-primary font-bold">Guy</span> Asong
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="flex items-center gap-3.5">
            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm gap-2 hover:scale-105 transition"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm gap-2 hover:scale-105 transition"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>

            {/* Email */}
            <a
              href={emailUrl}
              className="btn btn-ghost btn-sm gap-2 hover:scale-105 transition"
              aria-label="Email"
            >
              <FiMail className="w-6 h-6" />
            </a>

            {/* Instagram */}
            <a
              href={emailUrl}
              className="btn btn-ghost btn-sm gap-2 hover:scale-105 transition"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>

            {/* YouTube */}
            <a
              href={emailUrl}
              className="btn btn-ghost btn-sm gap-2 hover:scale-105 transition"
              aria-label="YouTube"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
