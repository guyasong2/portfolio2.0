import { createClient } from "@/utils/supabase/server";
import PostCard from "@/components/blog/PostCard";

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export const metadata = {
  title: "Blog | Guy Asong",
  description: "Thoughts, tutorials, and insights on web development, cybersecurity, and tech.",
  openGraph: {
    title: "Blog | Guy Asong",
    description: "Thoughts, tutorials, and insights on web development, cybersecurity, and tech.",
    url: "https://guyasong.me/blog",
    type: "website",
  },
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
    <div className="space-y-16">
      <header className="space-y-4 pt-8 border-b border-base-300/50 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-base-content/70 max-w-2xl">
          Thoughts, tutorials, and insights on web development, cybersecurity, and tech.
        </p>
      </header>

      {featuredPosts.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {featuredPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Latest Posts</h2>
        {(!regularPosts || regularPosts.length === 0) ? (
          <p className="text-base-content/60">No posts published yet. Check back soon!</p>
        ) : (
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
            {regularPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
