"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import BlockEditor from "./BlockEditor";
import type { Post, Block } from "@/types/blog";
import { FaSave, FaPaperPlane } from "react-icons/fa";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  cover_image: z.string().url().optional().or(z.literal("")),
  published: z.boolean(),
  featured: z.boolean(),
  category_id: z.string().optional().nullable(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostEditorProps {
  initialPost?: Post;
  categories: { id: string; name: string }[];
  onSubmitAction: (data: PostFormData, blocks: Block[]) => Promise<{ error?: string, id?: string }>;
}

export default function PostEditor({ initialPost, categories, onSubmitAction }: PostEditorProps) {
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[]>(initialPost?.blocks || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, control, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialPost?.title || "",
      slug: initialPost?.slug || "",
      excerpt: initialPost?.excerpt || "",
      cover_image: initialPost?.cover_image || "",
      published: initialPost?.published || false,
      featured: initialPost?.featured || false,
      category_id: initialPost?.category_id || "",
    }
  });

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const result = await onSubmitAction(data, blocks);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/posts");
        router.refresh();
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlugify = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 pb-32">
      {error && (
        <div className="bg-black text-white p-6 border-2 border-black text-[11px] font-black uppercase tracking-[0.2em]">
          Error: {error}
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-8 bg-white p-4 md:p-8 lg:p-10 border-2 border-black sticky top-0 lg:top-0 z-10">
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">{initialPost ? "Edit Post" : "New Post"}</h1>
        </div>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="published"
            render={({ field: { onChange } }) => (
              <button
                type="button"
                className="border-2 border-black text-xs md:text-sm font-black uppercase tracking-[0.15em] px-4 md:px-8 py-3 md:py-4 hover:bg-black hover:text-white transition-all flex items-center gap-2 md:gap-3"
                onClick={() => { onChange(false); handleSubmit(onSubmit)(); }}
                disabled={isSubmitting}
              >
                <FaSave /> Draft
              </button>
            )}
          />
          <Controller
            control={control}
            name="published"
            render={({ field: { onChange } }) => (
              <button
                type="button"
                className="bg-black text-white border-2 border-black text-xs md:text-sm font-black uppercase tracking-[0.15em] px-4 md:px-8 py-3 md:py-4 hover:bg-white hover:text-black transition-all flex items-center gap-2 md:gap-3"
                onClick={() => { onChange(true); handleSubmit(onSubmit)(); }}
                disabled={isSubmitting}
              >
                <FaPaperPlane /> Publish
              </button>
            )}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-0">
        {/* Main */}
        <div className="lg:col-span-2 border-2 border-black p-4 md:p-8 lg:p-12 space-y-6 md:space-y-10">
          <div className="space-y-3">
            <label className="text-base font-black uppercase tracking-[0.3em] block">Title</label>
            <input
              type="text"
              className="w-full bg-white border-2 border-black text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight h-16 md:h-20 lg:h-24 px-4 md:px-8 focus:outline-none"
              placeholder="POST TITLE"
              {...register("title", {
                onChange: (e) => {
                  if (!initialPost) {
                    const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement;
                    if (slugInput) slugInput.value = handleSlugify(e.target.value);
                  }
                }
              })}
            />
            {errors.title && <span className="text-[10px] font-black uppercase">{errors.title.message}</span>}
          </div>

          <BlockEditor initialBlocks={blocks} onChange={setBlocks} />
        </div>

        {/* Sidebar */}
        <div className="border-2 border-black lg:border-l-0 p-6 md:p-10 space-y-10">
          <h2 className="text-xl font-black uppercase tracking-[0.2em] border-b-2 border-black pb-4">Settings</h2>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-[0.3em]">Slug</label>
            <input type="text" className="w-full bg-white border-2 border-black px-6 py-4 text-sm font-bold focus:outline-none" {...register("slug")} />
            {errors.slug && <span className="text-sm font-black uppercase">{errors.slug.message}</span>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-[0.3em]">Category</label>
            <select className="w-full bg-white border-2 border-black px-6 py-4 text-sm font-bold focus:outline-none appearance-none" {...register("category_id")}>
              <option value="">NONE</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-[0.3em]">Cover Image URL</label>
            <input type="url" className="w-full bg-white border-2 border-black px-6 py-4 text-sm font-bold focus:outline-none" {...register("cover_image")} />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black uppercase tracking-[0.3em]">Excerpt</label>
            <textarea className="w-full h-40 bg-white border-2 border-black px-6 py-4 text-sm font-bold leading-relaxed focus:outline-none resize-none" {...register("excerpt")} />
          </div>

          <label className="flex items-center gap-5 cursor-pointer group">
            <input type="checkbox" className="w-6 h-6 border-2 border-black appearance-none checked:bg-black cursor-pointer" {...register("featured")} />
            <span className="text-sm font-black uppercase tracking-[0.2em] group-hover:line-through transition-all">Featured</span>
          </label>
        </div>
      </div>
    </form>
  );
}
