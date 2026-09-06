import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";

/** A short grid gives the homepage a clear sample without becoming an archive. */
export function ProjectGallery() {
  const selected = PROJECTS.slice(0, 3);
  const cardLayout = [
    "lg:col-span-7",
    "lg:col-span-5 lg:mt-16",
    "lg:col-span-6 lg:col-start-3 lg:mt-8",
  ];

  return (
    <section id="work" className="gutter section-lg scroll-mt-20">
      <div className="shell-wide">
        <SectionHeading
          label="Projects"
          title="Selected work from Apollo members."
          lede="A few things members have made, tested, and published."
          action={
            <Link
              href="/explore"
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:text-signal-text"
            >
              View all projects <Arrow />
            </Link>
          }
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          {selected.map((project, index) => (
            <div key={project.id} className={cardLayout[index]}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
