import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { format } from "date-fns";
import { FaFileAlt, FaCheckCircle, FaEdit, FaChevronRight } from "react-icons/fa";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  const { count: totalPosts } = await supabase.from("posts").select("*", { count: "exact", head: true });
  const { count: publishedPosts } = await supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true);
  
  const draftsCount = (totalPosts || 0) - (publishedPosts || 0);

  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id, title, slug, published, created_at, categories(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-12 md:space-y-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b-2 border-black pb-6 md:pb-10">
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em]">Overview</h1>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mt-2 md:mt-3">System Status</p>
        </div>
        <Link 
          href="/dashboard/posts/new" 
          className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] px-6 md:px-10 py-4 md:py-5 hover:bg-white hover:text-black border-2 border-black transition-all flex items-center gap-3 self-start md:self-auto"
        >
          <FaEdit /> New Post
        </Link>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
        {[
          { label: "Total Posts", value: totalPosts, icon: FaFileAlt },
          { label: "Published", value: publishedPosts, icon: FaCheckCircle },
          { label: "Drafts", value: draftsCount, icon: FaEdit },
        ].map((metric, i) => (
          <div key={i} className="border-2 border-black p-6 md:p-10 lg:p-12 space-y-4 md:space-y-6 group hover:bg-black hover:text-white transition-all">
            <div className="flex justify-between items-start">
              <metric.icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em]">0{i+1}</span>
            </div>
            <p className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">{metric.value || 0}</p>
            <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">{metric.label}</h2>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-6 md:space-y-10">
        <div className="flex items-end justify-between gap-4 md:gap-8">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight">Recent</h2>
          <Link href="/dashboard/posts" className="text-xs md:text-sm font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline flex items-center gap-2 whitespace-nowrap">
            All Posts <FaChevronRight className="text-[8px] md:text-xs" />
          </Link>
        </div>
        
        {/* Mobile: card layout */}
        <div className="sm:hidden space-y-0">
          {(!recentPosts || recentPosts.length === 0) ? (
            <div className="border-2 border-black py-16 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em]">No posts yet.</p>
            </div>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="border-2 border-black p-5 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-bold text-sm">{post.title}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-60">
                      {(post.categories as any)?.name || 'Uncategorized'}
                    </p>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border-2 whitespace-nowrap ${post.published ? 'border-black bg-black text-white' : 'border-black'}`}>
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold">{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                  <Link 
                    href={`/dashboard/posts/${post.id}/edit`}
                    className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop: table layout */}
        <div className="hidden sm:block border-2 border-black overflow-x-auto">
          {(!recentPosts || recentPosts.length === 0) ? (
            <div className="py-24 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.3em]">No posts yet.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                  <th className="px-4 md:px-8 py-4 md:py-5">Title</th>
                  <th className="px-4 md:px-8 py-4 md:py-5">Status</th>
                  <th className="px-4 md:px-8 py-4 md:py-5">Date</th>
                  <th className="px-4 md:px-8 py-4 md:py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id} className="border-t-2 border-black hover:bg-black hover:text-white transition-all group">
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <p className="font-bold text-sm md:text-base">{post.title}</p>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1 opacity-60">
                        {(post.categories as any)?.name || 'Uncategorized'}
                      </p>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6">
                      <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-3 md:px-4 py-1 md:py-2 border-2 ${post.published ? 'border-black bg-black text-white group-hover:bg-white group-hover:text-black' : 'border-black'}`}>
                        {post.published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm font-bold whitespace-nowrap">
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                      <Link 
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="text-xs md:text-sm font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
