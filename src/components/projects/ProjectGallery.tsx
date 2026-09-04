import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";

/**
 * One featured entry beside two standard cards, then a clean three-column
 * grid. Same card component throughout, same aspect ratios per row.
 */
export function ProjectGallery() {
  const [lead, ...rest] = PROJECTS;
  const beside = rest.slice(0, 2);
  const grid = rest.slice(2, 8);

  return (
    <section id="work" className="gutter section scroll-mt-20">
      <div className="shell-wide">
        <SectionHeading
          label="Projects"
          title="Selected work from Apollo members."
          lede="Research, engineering, and software built by Apollo members. Open one to read the abstract without leaving the page."
          action={
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:text-signal-text"
            >
              View all projects <Arrow />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectCard project={lead} featured />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {beside.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
