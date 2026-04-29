import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import BlockRenderer from "@/components/blog/BlockRenderer";
import SEO from "@/components/blog/SEO";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import PostCard from "@/components/blog/PostCard";

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
    title: post.title,
    description: post.excerpt || `Read ${post.title}`,
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
      categories(id, name),
      blocks:post_blocks(*)
    `)
    .eq("slug", slug)
    .single();

  if (error || !post || (!post.published && !(await supabase.auth.getUser()).data.user)) {
    notFound();
  }

  const { data: relatedPosts } = await supabase
    .from("posts")
    .select(`*, categories(name)`)
    .eq("published", true)
    .eq("category_id", post.category_id)
    .neq("id", post.id)
    .limit(3);

  const blocks = post.blocks?.sort((a: any, b: any) => a.position - b.position) || [];

  const headings = blocks
    .filter((b: any) => b.block_type === "heading")
    .map((b: any) => ({
      text: b.block_content.text,
      id: b.block_content.text.toLowerCase().replace(/[^\w]+/g, '-'),
    }));

  const wordCount = blocks.reduce((acc: number, b: any) => {
    return acc + (b.block_content.text?.split(/\s+/).length || 0);
  }, 0);
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  return (
    <div className="min-h-screen">
      <SEO post={post as any} siteUrl="https://guyasong.me" />

      {/* Header — black band */}
      <div className="bg-black text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.3em] hover:line-through transition-all mb-8 sm:mb-12 inline-block">
            ← Back
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 sm:mb-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            {(post.categories as any)?.name && (
              <span className="border-2 border-white px-3 py-1">
                {(post.categories as any).name}
              </span>
            )}
            <span>{format(new Date(post.created_at), "MMMM d, yyyy")}</span>
            <span>{readingTime} min read</span>
          </div>

          <h1 className="text-[clamp(1.75rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-[1.05] max-w-4xl uppercase break-words">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-8 sm:mt-10">
            <div className="w-10 h-10 border-2 border-white overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={(post.profiles as any)?.avatar || "https://ui-avatars.com/api/?name=Guy+Asong&background=000&color=fff"} alt="Author" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-black">{(post.profiles as any)?.name || "Guy Asong"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-24 overflow-hidden">
        {post.cover_image && (
          <div className="w-full aspect-[21/9] overflow-hidden border-2 border-black mb-12 sm:mb-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-20">
          {/* TOC sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b-2 border-black pb-3">
                  Contents
                </p>
                <ul className="space-y-4">
                  {headings.map((h: any, i: number) => (
                    <li key={i}>
                      <a href={`#${h.id}`} className="text-[11px] font-bold uppercase tracking-[0.15em] hover:line-through transition-all block">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          <div className="flex-1 min-w-0 max-w-3xl">
            <BlockRenderer blocks={blocks} />

            {/* Author box */}
            <div className="mt-16 sm:mt-24 border-2 border-black p-6 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="w-20 h-20 border-2 border-black flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={(post.profiles as any)?.avatar || "https://ui-avatars.com/api/?name=Guy+Asong&background=000&color=fff"} alt="Author" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">{(post.profiles as any)?.name || "Guy Asong"}</h3>
                <p className="text-sm leading-relaxed mt-3 max-w-md">
                  Full-stack developer and security architect building secure web applications.
                </p>
                <div className="flex gap-6 mt-4">
                  <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline">Portfolio</Link>
                  <a href="https://github.com/guyasong2" className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t-2 border-black">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8 sm:mb-12">Related</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black">
              {relatedPosts.map((rp) => (
                <PostCard key={rp.id} post={rp as any} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
