import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FaHome, FaPen, FaTags, FaFolder, FaSignOutAlt, FaBars } from "react-icons/fa";

import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="drawer lg:drawer-open bg-base-200/50 min-h-screen font-sans selection:bg-primary/30">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col min-w-0">
        {/* Navbar for mobile */}
        <div className="w-full navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-30 border-b border-base-200 lg:hidden shadow-sm">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <FaBars className="w-5 h-5 text-base-content/80" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-lg tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Guy Admin
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 lg:max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div> 
      
      <Sidebar />
    </div>
  );
}
