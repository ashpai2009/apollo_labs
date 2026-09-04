import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Apollo Labs projects and account.",
};

type Profile = {
  full_name: string;
  email: string | null;
  graduation_year: number | null;
  role: "member" | "reviewer" | "admin";
};

type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  status: string;
  updated_at: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const [{ data: profile, error: profileError }, { data: projects, error: projectsError }] = await Promise.all([
    supabase.from("profiles").select("full_name,email,graduation_year,role").eq("id", user.id).maybeSingle<Profile>(),
    supabase.from("projects").select("id,slug,title,status,updated_at").eq("created_by", user.id).order("updated_at", { ascending: false }).returns<ProjectSummary[]>(),
  ]);

  const name = profile?.full_name ?? String(user.user_metadata.full_name ?? user.email?.split("@")[0] ?? "Apollo member");
  const dataUnavailable = profileError || projectsError;

  return (
    <div className="min-h-[100dvh] bg-base pb-24 pt-28 md:pt-32">
      <section className="shell-wide gutter">
        <div className="flex flex-col gap-8 border-b border-hairline pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-label text-signal-text">Member Workspace</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.045em]">Welcome, {name}.</h1>
            <p className="mt-4 text-sm text-muted">
              {profile?.role ? `${profile.role[0].toUpperCase()}${profile.role.slice(1)}` : "Member"}
              {profile?.graduation_year ? ` · Class of ${profile.graduation_year}` : ""}
            </p>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="secondary" size="sm">Sign Out</Button>
          </form>
        </div>

        {dataUnavailable && (
          <div className="mt-8 border border-signal/40 bg-signal/[0.06] p-5 text-sm text-paper-dim" role="alert">
            Your account is active, but the Apollo project database is not available yet. An administrator needs to apply the Supabase migration.
          </div>
        )}

        <div className="mt-12 grid gap-5 md:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.7fr)]">
          <section className="border border-hairline bg-surface/40 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="mono-label text-muted">Your Projects</p>
                <h2 className="mt-3 text-2xl tracking-[-0.025em]">Work in progress</h2>
              </div>
              <span className="mono-label text-faint">{projects?.length ?? 0} total</span>
            </div>
            {projects?.length ? (
              <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
                {projects.map((project) => (
                  <li key={project.id} className="flex items-center justify-between gap-4 py-4">
                    <div>
                      <p className="font-medium text-paper">{project.title}</p>
                      <p className="mt-1 text-xs text-faint">Updated {new Date(project.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <span className="mono-label border border-hairline px-2 py-1 text-muted">{project.status.replace("_", " ")}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 border-y border-hairline py-10">
                <p className="text-paper-dim">No projects yet.</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted">Project creation is the next workspace milestone. Your account and publishing identity are ready.</p>
              </div>
            )}
          </section>

          <aside className="border border-hairline p-6 md:p-8">
            <p className="mono-label text-muted">Account</p>
            <dl className="mt-6 space-y-5 text-sm">
              <div><dt className="text-faint">Name</dt><dd className="mt-1 text-paper">{name}</dd></div>
              <div><dt className="text-faint">Email</dt><dd className="mt-1 break-all text-paper">{profile?.email ?? user.email}</dd></div>
              <div><dt className="text-faint">Status</dt><dd className="mt-1 text-paper">Active</dd></div>
            </dl>
          </aside>
        </div>
      </section>
    </div>
  );
}
