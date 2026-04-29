import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "@/types/blog";

type PostCardProps = {
  post: Post & { categories?: { name: string } };
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-2 border-black flex flex-col hover:bg-black hover:text-white transition-all duration-300 bg-white">
      {post.cover_image && (
        <Link href={`/blog/${post.slug}`} className="relative w-full h-56 overflow-hidden block border-b-2 border-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {(post.categories as any)?.name && (
            <div className="absolute top-0 left-0">
              <span className="bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 block group-hover:bg-white group-hover:text-black transition-all">
                {(post.categories as any).name}
              </span>
            </div>
          )}
        </Link>
      )}

      <div className="flex flex-col flex-1 p-4 sm:p-8 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">
            {format(new Date(post.created_at), "MMM d, yyyy")}
          </div>

          <h3 className="text-base sm:text-xl font-black leading-tight tracking-tight uppercase break-words">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {post.excerpt && (
            <p className="text-sm leading-relaxed opacity-70 line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline transition-all"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
