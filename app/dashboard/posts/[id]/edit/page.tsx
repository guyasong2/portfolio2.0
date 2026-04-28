import { createClient } from "@/utils/supabase/server";
import PostEditor from "@/components/dashboard/PostEditor";
import { createOrUpdatePostAction } from "@/app/dashboard/posts/actions";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = await createClient();
  
  const [categoriesResponse, postResponse] = await Promise.all([
    supabase.from("categories").select("id, name"),
    supabase.from("posts").select(`
      *,
      blocks:post_blocks(*)
    `).eq("id", id).single()
  ]);

  if (postResponse.error || !postResponse.data) {
    notFound();
  }

  // Sort blocks by position
  const post = postResponse.data;
  if (post.blocks) {
    post.blocks.sort((a: any, b: any) => a.position - b.position);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PostEditor 
        initialPost={post}
        categories={categoriesResponse.data || []} 
        onSubmitAction={async (data, blocks) => {
          "use server";
          return createOrUpdatePostAction(id, data, blocks);
        }} 
      />
    </div>
  );
}
