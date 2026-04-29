"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPen, FaTags, FaChartBar, FaExternalLinkAlt, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

type SidebarProps = {
  userEmail: string;
};

export default function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: FaHome },
    { name: "Publications", href: "/dashboard/posts", icon: FaPen },
    { name: "Projects", href: "/dashboard/projects", icon: FaChartBar },
    { name: "Categories", href: "/dashboard/tech-categories", icon: FaTags },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white h-14 flex items-center justify-between px-6 border-b-2 border-black">
        <Link href="/dashboard" className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-7 h-7 bg-white text-black flex items-center justify-center text-xs font-black">G</div>
          Admin
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 
        w-64 bg-black text-white border-r-2 border-black 
        flex flex-col min-h-screen h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}>
        {/* Logo — desktop only (mobile has its own header) */}
        <div className="hidden lg:flex px-8 py-8 border-b-2 border-white/20 items-center gap-3">
          <Link href="/dashboard" className="text-lg font-black uppercase tracking-[0.2em] flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-sm font-black">G</div>
            Admin
          </Link>
        </div>

        {/* Close button — mobile only */}
        <div className="lg:hidden flex justify-end px-4 pt-4">
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 lg:py-8 px-4 space-y-1 overflow-y-auto">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] px-4 mb-6">Navigation</p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={`flex items-center gap-4 px-4 py-3.5 text-sm font-black uppercase tracking-[0.1em] transition-all ${isActive
                    ? "bg-white text-black"
                    : "hover:bg-white hover:text-black"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}

          <div className="pt-8">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] px-4 mb-6">External</p>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-4 px-4 py-3.5 text-sm font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-all"
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
              Portfolio
            </Link>
          </div>
        </nav>

        {/* User Info & Sign Out */}
        <div className="border-t-2 border-white/20 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-xl flex-shrink-0" />
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase truncate">{userEmail}</span>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] py-3 hover:bg-black hover:text-white border-2 border-white transition-all">
              <FaSignOutAlt />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
