"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaPen, FaTags, FaFolder, FaSignOutAlt, FaChartBar, FaCog } from "react-icons/fa";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: FaHome },
    { name: "Posts", href: "/dashboard/posts", icon: FaPen },
    { name: "Categories", href: "/dashboard/categories", icon: FaFolder },
    { name: "Tags", href: "/dashboard/tags", icon: FaTags },
  ];

  return (
    <div className="drawer-side z-40">
      <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-base-300 justify-between shadow-2xl">
        <div>
          <li className="mb-8">
            <Link href="/dashboard" className="text-2xl font-black tracking-tighter p-2 hover:bg-transparent cursor-default">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Guy</span> Admin
            </Link>
          </li>
          
          <li className="menu-title text-xs font-bold uppercase tracking-widest text-base-content/40 mb-2">Content</li>
          
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary text-primary-content shadow-md shadow-primary/20 hover:bg-primary/90 hover:text-primary-content" 
                        : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                    )}
                  >
                    <Icon className={clsx("w-5 h-5", isActive ? "text-primary-content" : "text-base-content/50")} />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="divider opacity-30"></div>
          <li>
            <form action="/auth/signout" method="post">
              <button 
                type="submit" 
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl font-medium text-error/80 hover:text-error hover:bg-error/10 transition-colors"
              >
                <FaSignOutAlt className="w-5 h-5 opacity-70" /> 
                Sign Out
              </button>
            </form>
          </li>
        </div>
      </ul>
    </div>
  );
}
