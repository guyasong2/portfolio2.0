import { createClient } from "@/utils/supabase/server";
import PostCard from "@/components/blog/PostCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description: "Technical writeups, security research, and tutorials.",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id, title, slug, excerpt, cover_image, created_at, featured,
      categories(name)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false });

  const featuredPosts = posts?.filter(p => p.featured) || [];
  const regularPosts = posts?.filter(p => !p.featured) || [];

  return (
    <div className="min-h-screen">
      {/* Header — black */}
      <div className="bg-black text-white py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-6">Archive</p>
              <h1 className="text-[clamp(3rem,7vw,7rem)] font-black tracking-[-0.04em] uppercase leading-none">
                Blog
              </h1>
            </div>
            <Link
              href="/api/rss"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-all"
            >
              RSS Feed
            </Link>
          </div>
        </div>
      </div>

      {/* Content — white */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-24 space-y-24">
        {featuredPosts.length > 0 && (
          <section>
            <div className="flex items-end gap-8 mb-12">
              <h2 className="text-2xl font-black uppercase tracking-tight">Featured</h2>
              <div className="h-[2px] flex-1 bg-black" />
            </div>
            <div className="grid md:grid-cols-2 gap-0">
              {featuredPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-end gap-8 mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight">All Posts</h2>
            <div className="h-[2px] flex-1 bg-black" />
          </div>

          {(!regularPosts || regularPosts.length === 0) ? (
            <div className="border-2 border-black py-32 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em]">No posts published yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
              {regularPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
