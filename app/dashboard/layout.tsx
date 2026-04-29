import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
    <div className="min-h-screen bg-white text-black flex">
      <Sidebar userEmail={user.email || ""} />
      
      {/* Content area — add top padding on mobile for the fixed header */}
      <main className="flex-1 pt-20 lg:pt-0 p-6 md:p-10 lg:p-16 overflow-x-hidden min-w-0">
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
