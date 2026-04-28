import { createClient } from "@/utils/supabase/server";
import PostEditor from "@/components/dashboard/PostEditor";
import { createOrUpdatePostAction } from "@/app/dashboard/posts/actions";

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name");

  return (
    <div className="max-w-5xl mx-auto">
      <PostEditor 
        categories={categories || []} 
        onSubmitAction={async (data, blocks) => {
          "use server";
          return createOrUpdatePostAction(undefined, data, blocks);
        }} 
      />
    </div>
  );
}
