import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";

/**
 * Editorial composition rather than a uniform grid: one featured entry, a
 * stacked pair, a full-width wide entry, then standard rows.
 */
export function ProjectGallery() {
  const [lead, ...rest] = PROJECTS;
  const pair = rest.slice(0, 2);
  const wide = rest[2];
  const row = rest.slice(3, 6);
  const tail = rest.slice(6, 8);

  return (
    <section id="work" className="gutter scroll-mt-24 py-24 md:py-32">
      <div className="shell-wide">
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title={
            <>
              Published by students,{" "}
              <span className="font-serif italic text-paper-dim">
                reviewed in the open.
              </span>
            </>
          }
          lede="Every project here was proposed, built, and written up by a student member. Open one to read the abstract without leaving the archive."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:mt-20 lg:grid-cols-12 lg:gap-y-24">
          <Reveal className="lg:col-span-8">
            <ProjectCard project={lead} variant="featured" index={1} />
          </Reveal>

          <div className="flex flex-col gap-14 lg:col-span-4">
            {pair.map((project, i) => (
              <Reveal key={project.id} delay={0.06 * (i + 1)}>
                <ProjectCard project={project} index={i + 2} />
              </Reveal>
            ))}
          </div>

          <Reveal className="lg:col-span-12">
            <div className="border-t border-hairline pt-16">
              <ProjectCard project={wide} variant="wide" index={4} />
            </div>
          </Reveal>

          {row.map((project, i) => (
            <Reveal key={project.id} delay={0.05 * i} className="lg:col-span-4">
              <ProjectCard project={project} index={i + 5} />
            </Reveal>
          ))}

          {tail.map((project, i) => (
            <Reveal key={project.id} delay={0.05 * i} className="lg:col-span-4">
              <ProjectCard project={project} index={i + 8} />
            </Reveal>
          ))}

          <Reveal className="lg:col-span-4">
            <Link
              href="/explore"
              className="group flex h-full flex-col justify-center border border-hairline p-7 transition-colors duration-300 hover:border-hairline-strong"
            >
              <span className="mono-label text-faint">The Archive</span>
              <span className="mt-6 block">
                <span className="block font-serif text-[1.5rem] leading-tight">
                  Browse every Apollo project
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-signal-text">
                  Open Explore <Arrow />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
