import Link from "next/link";
import { format } from "date-fns";
import type { Post } from "@/types/blog";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg bg-base-200/40 border border-base-300/70 hover:border-primary/60 transition duration-200 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col overflow-hidden">
      {post.cover_image && (
        <div className="w-full h-48 overflow-hidden bg-base-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={post.cover_image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="card-body flex flex-col flex-1 gap-4 px-4 py-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {(post as any).categories?.name && (
              <span className="badge badge-primary badge-sm badge-outline text-xs font-semibold">
                {(post as any).categories.name}
              </span>
            )}
            <span className="text-xs text-base-content/60 font-medium">
              {format(new Date(post.created_at), "MMM d, yyyy")}
            </span>
          </div>
          
          <h3 className="card-title text-lg md:text-xl font-bold line-clamp-2 leading-tight hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          {post.excerpt && (
            <p className="text-sm text-base-content/80 mt-2 line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="font-bold text-sm flex items-center gap-2 hover:text-primary transition"
          >
            Read Article <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
