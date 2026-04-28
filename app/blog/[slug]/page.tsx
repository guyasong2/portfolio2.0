import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import BlockRenderer from "@/components/blog/BlockRenderer";
import type { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const supabase = await createClient();
  const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${post.title} | Guy Asong Blog`,
    description: post.excerpt || `Read ${post.title} by Guy Asong`,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      url: `https://guyasong.me/blog/${post.slug}`,
      images: post.cover_image ? [post.cover_image, ...previousImages] : previousImages,
      type: "article",
      publishedTime: post.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: post.cover_image ? [post.cover_image] : previousImages,
    },
    alternates: {
      canonical: `https://guyasong.me/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles(name, avatar),
      categories(name),
      blocks:post_blocks(*)
    `)
    .eq("slug", slug)
    .single();

  if (error || !post || (!post.published && !(await supabase.auth.getUser()).data.user)) {
    notFound();
  }

  // Sort blocks
  const blocks = post.blocks?.sort((a: any, b: any) => a.position - b.position) || [];
  
  // Extract Headings for TOC
  const headings = blocks
    .filter((b: any) => b.block_type === "heading")
    .map((b: any) => ({
      text: b.block_content.text,
      id: b.block_content.text.toLowerCase().replace(/[^\w]+/g, '-'),
    }));

  return (
    <article className="max-w-4xl mx-auto pb-16">
      <header className="space-y-6 text-center pt-8 pb-12">
        <div className="flex items-center justify-center gap-2 mb-6">
          {(post.categories as any)?.name && (
            <span className="badge badge-primary badge-outline font-semibold">
              {(post.categories as any).name}
            </span>
          )}
          <span className="text-sm font-medium text-base-content/60">
            {format(new Date(post.created_at), "MMMM d, yyyy")}
          </span>
          <span className="text-sm font-medium text-base-content/60">&bull;</span>
          <span className="text-sm font-medium text-base-content/60">
            {post.read_time || Math.ceil(blocks.length / 3)} min read
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 pt-6">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-primary/20 p-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={(post.profiles as any)?.avatar || "https://ui-avatars.com/api/?name=Guy+Asong&background=random"} alt="Author" className="rounded-full" />
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">{(post.profiles as any)?.name || "Guy Asong"}</p>
            <p className="text-xs text-base-content/60">Author</p>
          </div>
        </div>
      </header>

      {post.cover_image && (
        <div className="w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl mb-16 bg-base-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={post.cover_image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Table of Contents (Desktop Sidebar) */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/50 mb-4">
                Table of Contents
              </h3>
              <ul className="space-y-2 text-sm">
                {headings.map((h: any, i: number) => (
                  <li key={i}>
                    <a 
                      href={`#${h.id}`} 
                      className="text-base-content/70 hover:text-primary transition-colors block py-1"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <BlockRenderer blocks={blocks} />
        </div>
      </div>
    </article>
  );
}
