import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { format } from "date-fns";
import { FaFileAlt, FaCheckCircle, FaEdit, FaEye } from "react-icons/fa";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  // Fetch metrics
  const { count: totalPosts } = await supabase.from("posts").select("*", { count: "exact", head: true });
  const { count: publishedPosts } = await supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true);
  
  const draftsCount = (totalPosts || 0) - (publishedPosts || 0);

  // Fetch recent activity (latest 5 posts)
  const { data: recentPosts } = await supabase
    .from("posts")
    .select("id, title, slug, published, created_at, categories(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Overview</h1>
          <p className="text-base-content/60 mt-1">Welcome back. Here is what is happening with your content today.</p>
        </div>
        <Link href="/dashboard/posts/new" className="btn btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all rounded-xl">
          <FaEdit className="mr-2" /> Write a Post
        </Link>
      </header>

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card bg-base-100 shadow-xl shadow-base-200/50 border border-base-200 hover:border-primary/50 transition-colors group">
          <div className="card-body p-6 flex flex-row items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-base-content/50 mb-1">Total Posts</h2>
              <p className="text-4xl font-black text-base-content group-hover:text-primary transition-colors">{totalPosts || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <FaFileAlt className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl shadow-base-200/50 border border-base-200 hover:border-success/50 transition-colors group">
          <div className="card-body p-6 flex flex-row items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-base-content/50 mb-1">Published</h2>
              <p className="text-4xl font-black text-base-content group-hover:text-success transition-colors">{publishedPosts || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success">
              <FaCheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl shadow-base-200/50 border border-base-200 hover:border-warning/50 transition-colors group">
          <div className="card-body p-6 flex flex-row items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-base-content/50 mb-1">Drafts</h2>
              <p className="text-4xl font-black text-base-content group-hover:text-warning transition-colors">{draftsCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-warning">
              <FaEdit className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-xl shadow-base-200/50 border border-base-200 overflow-hidden">
        <div className="card-body p-0">
          <div className="p-6 border-b border-base-200 bg-base-100/50 flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Posts</h2>
            <Link href="/dashboard/posts" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            {(!recentPosts || recentPosts.length === 0) ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-4">
                  <FaFileAlt className="w-8 h-8 text-base-content/30" />
                </div>
                <p className="text-lg font-medium text-base-content/70">No posts yet</p>
                <p className="text-sm text-base-content/50 mt-1">Get started by creating your first blog post.</p>
              </div>
            ) : (
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200/50 text-base-content/60 border-b border-base-200">
                    <th className="font-semibold py-4 pl-6">Title</th>
                    <th className="font-semibold py-4">Status</th>
                    <th className="font-semibold py-4">Date</th>
                    <th className="font-semibold py-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-base-200/30 transition-colors">
                      <td className="pl-6">
                        <p className="font-bold text-base-content">{post.title}</p>
                        <p className="text-xs text-base-content/50 mt-1">
                          {(post.categories as any)?.name || 'Uncategorized'}
                        </p>
                      </td>
                      <td>
                        {post.published ? (
                          <div className="badge badge-success badge-sm badge-outline gap-1 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Published
                          </div>
                        ) : (
                          <div className="badge badge-warning badge-sm badge-outline gap-1 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-warning"></span> Draft
                          </div>
                        )}
                      </td>
                      <td className="text-sm text-base-content/70">
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="pr-6 text-right">
                        <Link 
                          href={`/dashboard/posts/${post.id}/edit`}
                          className="btn btn-ghost btn-sm text-base-content/70 hover:text-primary transition-colors"
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
    </div>
  );
}
