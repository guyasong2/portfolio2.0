"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProject(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const demo_url = formData.get("demo_url") as string;
  const code_url = formData.get("code_url") as string;
  const published = formData.get("published") === "on";
  
  const techCategories = formData.getAll("tech_categories") as string[];

  let projectId = id;

  if (id) {
    // Update existing
    await supabase.from("projects").update({
      name, description, demo_url, code_url, published
    }).eq("id", id);
    
    // Update tech links
    await supabase.from("project_tech").delete().eq("project_id", id);
  } else {
    // Insert new
    const { data, error } = await supabase.from("projects").insert({
      name, description, demo_url, code_url, published
    }).select("id").single();
    
    if (data) {
      projectId = data.id;
    }
  }

  // Insert new tech links
  if (projectId && techCategories.length > 0) {
    const techInserts = techCategories.map(techId => ({
      project_id: projectId,
      tech_id: techId
    }));
    await supabase.from("project_tech").insert(techInserts);
  }

  revalidatePath("/dashboard/projects");
  revalidatePath("/");
  redirect("/dashboard/projects");
}
