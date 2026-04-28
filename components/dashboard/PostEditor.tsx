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
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Top Bar Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-4 rounded-lg border border-base-300 sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold">{initialPost ? "Edit Post" : "Create New Post"}</h1>
        <div className="flex gap-2">
          <Controller
            control={control}
            name="published"
            render={({ field: { onChange, value } }) => (
              <button
                type="button"
                className={`btn btn-sm ${!value ? "btn-neutral" : "btn-outline"}`}
                onClick={() => {
                  onChange(false);
                  handleSubmit(onSubmit)();
                }}
                disabled={isSubmitting}
              >
                <FaSave /> Save Draft
              </button>
            )}
          />
          <Controller
            control={control}
            name="published"
            render={({ field: { onChange, value } }) => (
              <button
                type="button"
                className={`btn btn-sm ${value ? "btn-primary" : "btn-outline btn-primary"}`}
                onClick={() => {
                  onChange(true);
                  handleSubmit(onSubmit)();
                }}
                disabled={isSubmitting}
              >
                <FaPaperPlane /> Publish
              </button>
            )}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100 p-6 rounded-lg border border-base-300 space-y-4">
            <h2 className="text-lg font-bold mb-4">Post Content</h2>
            
            <div className="form-control w-full">
              <label className="label"><span className="label-text">Title</span></label>
              <input 
                type="text" 
                className="input input-bordered w-full text-lg font-bold" 
                {...register("title", {
                  onChange: (e) => {
                    if (!initialPost) {
                      // Auto-generate slug on new post
                      const slugInput = document.querySelector('input[name="slug"]') as HTMLInputElement;
                      if (slugInput) {
                        slugInput.value = handleSlugify(e.target.value);
                      }
                    }
                  }
                })}
              />
              {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
            </div>

            <BlockEditor initialBlocks={blocks} onChange={setBlocks} />
          </div>
        </div>

        {/* Sidebar Metadata */}
        <div className="space-y-6">
          <div className="bg-base-100 p-6 rounded-lg border border-base-300 space-y-4">
            <h2 className="text-lg font-bold mb-4">Settings</h2>

            <div className="form-control w-full">
              <label className="label"><span className="label-text">Slug</span></label>
              <input type="text" className="input input-bordered w-full input-sm" {...register("slug")} />
              {errors.slug && <span className="text-error text-sm mt-1">{errors.slug.message}</span>}
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text">Category</span></label>
              <select className="select select-bordered w-full select-sm" {...register("category_id")}>
                <option value="">None</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text">Cover Image URL</span></label>
              <input type="url" className="input input-bordered w-full input-sm" {...register("cover_image")} />
              {errors.cover_image && <span className="text-error text-sm mt-1">{errors.cover_image.message}</span>}
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text">Excerpt</span></label>
              <textarea className="textarea textarea-bordered h-24" {...register("excerpt")}></textarea>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input type="checkbox" className="checkbox checkbox-primary" {...register("featured")} />
                <span className="label-text">Feature this post</span> 
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
