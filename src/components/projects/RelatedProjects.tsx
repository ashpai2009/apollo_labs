import { ProjectCard } from "./ProjectCard";
import { ProjectSurface } from "./ProjectSurface";
import type { Project } from "@/lib/types";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <section className="gutter border-t border-hairline py-20 md:py-28">
      <div className="shell-wide">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="mono-label text-muted">
            <span className="text-signal-text">◆</span>
            <span className="ml-3">Related Work</span>
          </h2>
        </div>
        <ProjectSurface>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </ProjectSurface>
      </div>
    </section>
  );
}
