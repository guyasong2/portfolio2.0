"use server";

import { createClient } from "@/utils/supabase/server";
import type { Block } from "@/types/blog";
import { v4 as uuidv4 } from "uuid";

export async function createOrUpdatePostAction(
  postId: string | undefined, 
  data: any, 
  blocks: Block[]
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // 1. Create or Update the Post
  const postPayload = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    cover_image: data.cover_image,
    published: data.published,
    featured: data.featured,
    category_id: data.category_id || null,
    author_id: user.id,
    updated_at: new Date().toISOString(),
  };

  let actualPostId = postId;

  if (postId) {
    const { error: postError } = await supabase
      .from("posts")
      .update(postPayload)
      .eq("id", postId);
    
    if (postError) return { error: postError.message };
  } else {
    // Check if slug exists
    const { data: existing } = await supabase.from("posts").select("id").eq("slug", data.slug).single();
    if (existing) return { error: "Slug already exists" };

    const { data: newPost, error: postError } = await supabase
      .from("posts")
      .insert([postPayload])
      .select("id")
      .single();
    
    if (postError) return { error: postError.message };
    actualPostId = newPost.id;
  }

  // 2. Sync Blocks
  // First, delete existing blocks for this post
  if (postId) {
    await supabase.from("post_blocks").delete().eq("post_id", actualPostId);
  }

  // Then, insert new blocks
  if (blocks.length > 0) {
    const blocksToInsert = blocks.map((block, index) => ({
      // We don't reuse the block.id from the client completely, to avoid unique constraint issues if we duplicate blocks client side. We just generate new UUIDs.
      id: uuidv4(), 
      post_id: actualPostId,
      block_type: block.block_type,
      block_content: block.block_content,
      position: index,
    }));

    const { error: blocksError } = await supabase
      .from("post_blocks")
      .insert(blocksToInsert);
    
    if (blocksError) return { error: blocksError.message };
  }

  return { id: actualPostId };
}
