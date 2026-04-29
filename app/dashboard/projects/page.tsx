import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { revalidatePath } from "next/cache";

export default async function ProjectsDashboardPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, published, created_at, position")
    .order("position", { ascending: true })
    .order("created_at", { ascending: false });

  async function deleteProject(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (!id) return;
    const supabase = await createClient();
    await supabase.from("projects").delete().eq("id", id);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const currentStatus = formData.get("status") === "true";
    if (!id) return;
    const supabase = await createClient();
    await supabase.from("projects").update({ published: !currentStatus }).eq("id", id);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
  }

  return (
    <div className="space-y-12 md:space-y-20">
      <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 md:gap-8 border-b-2 border-black pb-6 md:pb-10">
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.03em]">Projects</h1>
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mt-2 md:mt-3">Portfolio Management</p>
        </div>
        <Link 
          href="/dashboard/projects/new" 
          className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] px-6 md:px-10 py-4 md:py-5 hover:bg-white hover:text-black border-2 border-black transition-all flex items-center gap-3"
        >
          <FaPlus /> New Project
        </Link>
      </header>

      {/* Mobile: card layout */}
      <div className="sm:hidden space-y-0">
        {(!projects || projects.length === 0) ? (
          <div className="border-2 border-black py-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em]">No projects found.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="border-2 border-black p-5 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <Link href={`/dashboard/projects/${project.id}/edit`} className="font-bold text-sm flex-1">
                  {project.name}
                </Link>
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="status" value={project.published.toString()} />
                  <button type="submit" className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 border-2 ${project.published ? 'border-black bg-black text-white' : 'border-black'}`}>
                    {project.published ? 'Live' : 'Draft'}
                  </button>
                </form>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold">{new Date(project.created_at).toLocaleDateString()}</span>
                <div className="flex gap-4">
                  <Link href={`/dashboard/projects/${project.id}/edit`} className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2">
                    Edit
                  </Link>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit" className="text-[10px] font-black uppercase tracking-[0.2em] hover:line-through">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop: table layout */}
      <div className="hidden sm:block border-2 border-black overflow-x-auto">
        {(!projects || projects.length === 0) ? (
          <div className="py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em]">No projects found.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                <th className="px-4 md:px-8 py-4 md:py-5">Name</th>
                <th className="px-4 md:px-8 py-4 md:py-5">Status</th>
                <th className="px-4 md:px-8 py-4 md:py-5">Date</th>
                <th className="px-4 md:px-8 py-4 md:py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t-2 border-black hover:bg-black hover:text-white transition-all group">
                  <td className="px-4 md:px-8 py-4 md:py-6">
                    <Link href={`/dashboard/projects/${project.id}/edit`} className="font-bold text-sm md:text-base hover:underline underline-offset-4 decoration-2">
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6">
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={project.id} />
                      <input type="hidden" name="status" value={project.published.toString()} />
                      <button type="submit" className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-3 md:px-4 py-1 md:py-2 border-2 transition-all ${project.published ? 'border-black bg-black text-white group-hover:bg-white group-hover:text-black' : 'border-black group-hover:border-white'}`}>
                        {project.published ? 'Live' : 'Draft'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-xs md:text-sm font-bold whitespace-nowrap">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                    <div className="flex justify-end gap-4 md:gap-8">
                      <Link href={`/dashboard/projects/${project.id}/edit`} className="text-xs md:text-sm font-black uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:no-underline">
                        Edit
                      </Link>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <button type="submit" className="text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:line-through">
                          Delete
                        </button>
                      </form>
                    </div>
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
