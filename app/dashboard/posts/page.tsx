import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import { FaPlus, FaImage } from "react-icons/fa";
import Image from "next/image";

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      id, title, slug, published, created_at, cover_image,
      categories(name), profiles(name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="space-y-12 md:space-y-20">
      <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 md:gap-8 border-b-2 border-black pb-6 md:pb-10">
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em]">Publications</h1>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mt-2 md:mt-3">Content Management</p>
        </div>
        <Link 
          href="/dashboard/posts/new" 
          className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] px-6 md:px-10 py-4 md:py-5 hover:bg-white hover:text-black border-2 border-black transition-all flex items-center gap-3"
        >
          <FaPlus /> New Post
        </Link>
      </header>

      {/* Mobile: card layout */}
      <div className="sm:hidden space-y-0">
        {(!posts || posts.length === 0) ? (
          <div className="border-2 border-black py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em]">No posts found.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/dashboard/posts/${post.id}/edit`} className="block border-2 border-black p-5 space-y-3 hover:bg-black hover:text-white transition-all group">
              <div className="flex gap-4">
                {post.cover_image && (
                  <div className="w-16 h-12 relative border-2 border-black overflow-hidden flex-shrink-0 group-hover:border-white">
                    <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{post.title}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-60">
                    {(post.categories as any)?.name || 'Uncategorized'}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold">{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border-2 ${post.published ? 'border-black bg-black text-white group-hover:bg-white group-hover:text-black' : 'border-black group-hover:border-white'}`}>
                  {post.published ? 'Live' : 'Draft'}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Desktop: table layout */}
      <div className="hidden sm:block border-2 border-black overflow-x-auto">
        {(!posts || posts.length === 0) ? (
          <div className="py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em]">No posts found.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                <th className="px-4 md:px-8 py-4 md:py-5 w-24">Cover</th>
                <th className="px-4 md:px-8 py-4 md:py-5">Post</th>
                <th className="px-4 md:px-8 py-4 md:py-5">Status</th>
                <th className="px-4 md:px-8 py-4 md:py-5">Date</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t-2 border-black hover:bg-black hover:text-white transition-all group">
                  <td className="px-4 md:px-8 py-4 md:py-5">
                    <Link href={`/dashboard/posts/${post.id}/edit`} className="block w-16 md:w-20 h-10 md:h-14 relative bg-white border-2 border-black overflow-hidden">
                      {post.cover_image ? (
                        <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaImage className="text-xs md:text-sm" />
                        </div>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-5">
                    <Link href={`/dashboard/posts/${post.id}/edit`} className="block">
                      <div className="font-bold text-sm md:text-base">{post.title}</div>
                      <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-1 opacity-60 truncate max-w-[200px]">
                        {(post.categories as any)?.name || 'Uncategorized'} / {post.slug}
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-5">
                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-3 md:px-4 py-1 md:py-2 border-2 ${post.published ? 'border-black bg-black text-white group-hover:bg-white group-hover:text-black' : 'border-black group-hover:border-white'}`}>
                      {post.published ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-5 text-xs md:text-sm font-bold whitespace-nowrap">
                    {format(new Date(post.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-5 text-right">
                    <div className="flex justify-end gap-4 md:gap-8">
                      <Link href={`/dashboard/posts/${post.id}/edit`} className="text-xs md:text-sm font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline">
                        Edit
                      </Link>
                      <button className="text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:line-through">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
