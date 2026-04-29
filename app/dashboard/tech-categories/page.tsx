import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { FaTrash, FaPlus } from "react-icons/fa";

export default async function TechCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("tech_categories").select("*").order("created_at", { ascending: false });

  async function addCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name) return;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    const supabase = await createClient();
    await supabase.from("tech_categories").insert({ name, slug });
    revalidatePath("/dashboard/tech-categories");
  }

  async function deleteCategory(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;

    const supabase = await createClient();
    await supabase.from("tech_categories").delete().eq("id", id);
    revalidatePath("/dashboard/tech-categories");
  }

  return (
    <div className="space-y-12 md:space-y-20">
      <header className="border-b-2 border-black pb-6 md:pb-10">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em]">Categories</h1>
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mt-3">Tech Stack Management</p>
      </header>

      {/* Add Form */}
      <form action={addCategory} className="flex flex-col sm:flex-row gap-0 items-stretch sm:items-end">
        <div className="flex-1 sm:max-w-md">
          <label className="text-xs md:text-sm font-black uppercase tracking-[0.2em] block mb-3">New Category</label>
          <input 
            type="text" 
            name="name" 
            placeholder="e.g. Next.js" 
            className="w-full bg-white border-2 border-black h-14 px-4 md:px-6 text-base font-bold focus:outline-none" 
            required 
          />
        </div>
        <button type="submit" className="bg-black text-white border-2 border-black sm:border-l-0 h-14 px-6 md:px-8 text-sm font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
          <FaPlus /> Add
        </button>
      </form>

      {/* Table */}
      <div className="border-2 border-black overflow-x-auto">
        {(!categories || categories.length === 0) ? (
          <div className="py-16 md:py-24 text-center">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em]">No categories found.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                <th className="px-4 md:px-8 py-4 md:py-5">Name</th>
                <th className="px-4 md:px-8 py-4 md:py-5">Slug</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-t-2 border-black hover:bg-black hover:text-white transition-all group">
                  <td className="px-4 md:px-8 py-4 md:py-6 font-bold text-sm md:text-base">{cat.name}</td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm font-bold opacity-60">{cat.slug}</td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={cat.id} />
                      <button type="submit" className="text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:line-through">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
