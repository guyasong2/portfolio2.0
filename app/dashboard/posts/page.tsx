import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default async function PostsPage() {
  const supabase = await createClient();

  // Fetch posts with author and category details
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      published,
      created_at,
      categories(name),
      profiles(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Posts</h1>
        <Link href="/dashboard/posts/new" className="btn btn-primary gap-2">
          <FaPlus /> New Post
        </Link>
      </div>

      <div className="bg-base-100 border border-base-300 rounded-lg overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(!posts || posts.length === 0) ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-base-content/50">
                  No posts found. Create your first post!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover">
                  <td>
                    <div className="font-bold">{post.title}</div>
                    <div className="text-sm opacity-50">{post.slug}</div>
                  </td>
                  <td>
                    <div className={`badge ${post.published ? 'badge-success' : 'badge-neutral'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </div>
                  </td>
                  <td>
                    {(post.categories as any)?.name || 'Uncategorized'}
                  </td>
                  <td>
                    {format(new Date(post.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/dashboard/posts/${post.id}/edit`} 
                        className="btn btn-sm btn-ghost text-info"
                      >
                        <FaEdit />
                      </Link>
                      <button className="btn btn-sm btn-ghost text-error">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
