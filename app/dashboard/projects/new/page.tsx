import { createClient } from "@/utils/supabase/server";
import { saveProject } from "../actions";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: techCategories } = await supabase.from("tech_categories").select("*").order("name");

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center gap-4">
        <Link href="/dashboard/projects" className="btn btn-circle btn-ghost">
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">New Project</h1>
          <p className="text-base-content/60 mt-1">Add a new project to your portfolio.</p>
        </div>
      </header>

      <form action={saveProject} className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body space-y-6">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Project Name</span></label>
            <input type="text" name="name" className="input input-bordered w-full" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Description</span></label>
            <textarea name="description" className="textarea textarea-bordered h-24" required></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Live Demo URL</span></label>
              <input type="url" name="demo_url" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Source Code URL</span></label>
              <input type="url" name="code_url" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Tech Categories</span></label>
            <div className="flex flex-wrap gap-3 p-4 rounded-xl border border-base-200 bg-base-200/30">
              {techCategories?.map((cat) => (
                <label key={cat.id} className="label cursor-pointer justify-start gap-2 bg-base-100 px-3 py-1.5 rounded-lg border border-base-300 hover:border-primary transition-colors">
                  <input type="checkbox" name="tech_categories" value={cat.id} className="checkbox checkbox-sm checkbox-primary" />
                  <span className="label-text font-medium">{cat.name}</span>
                </label>
              ))}
              {(!techCategories || techCategories.length === 0) && (
                <p className="text-sm text-base-content/50 italic">No tech categories available. Add some in the Tech Categories section first.</p>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3 w-fit">
              <input type="checkbox" name="published" className="toggle toggle-success" />
              <span className="label-text font-bold">Published</span>
            </label>
          </div>

          <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
            <Link href="/dashboard/projects" className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary gap-2">
              <FaSave /> Save Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
