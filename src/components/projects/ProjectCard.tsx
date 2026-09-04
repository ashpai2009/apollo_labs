"use client";

import { useRef } from "react";
import { ProjectCover } from "./ProjectCover";
import { useProjectModal } from "./ProjectModalContext";
import { coverVariantFor } from "@/lib/disciplines";
import { authorLine } from "@/lib/projects";
import type { Project } from "@/lib/types";

/**
 * One card shape, two sizes. Standard cards hold a fixed aspect so every card
 * in a row lines up. The featured card instead lets its cover grow to fill
 * whatever height the column has left, so matching the height of the stacked
 * cards beside it does not leave a void under the text.
 */
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { open } = useProjectModal();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-hairline bg-card transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-0.5 hover:border-hairline-strong focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-signal motion-reduce:hover:translate-y-0">
      <div
        className={`relative overflow-hidden bg-base ${
          featured
            ? "aspect-[16/9] lg:aspect-auto lg:min-h-[24rem] lg:flex-1"
            : "aspect-[4/3]"
        }`}
      >
        <ProjectCover
          variant={coverVariantFor(project.discipline)}
          seed={project.id}
          imageUrl={project.coverImageUrl}
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {project.status !== "Published" && (
          <span className="mono-label absolute left-3 top-3 border border-hairline bg-void px-2 py-1.5 text-paper-dim">
            {project.status}
          </span>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col gap-3 ${featured ? "p-7" : "p-5"}`}
      >
        <p className="mono-label flex items-center gap-2 text-signal-text">
          <span>{project.discipline}</span>
          <span aria-hidden="true" className="text-faint">
            ·
          </span>
          <span className="text-faint">{project.type}</span>
        </p>

        <h3
          className={`font-medium leading-snug tracking-[-0.01em] ${
            featured ? "text-[1.625rem]" : "text-[1.1875rem]"
          }`}
        >
          <button
            ref={buttonRef}
            type="button"
            onClick={() => open(project, buttonRef.current)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
              {project.title}
            </span>
          </button>
        </h3>

        <p
          className={`text-paper-dim ${
            featured
              ? "t-body-sm"
              : "line-clamp-2 t-body-sm"
          }`}
        >
          {project.summary}
        </p>

        <p className="t-meta mt-auto pt-3 text-muted">
          {authorLine(project)}
          <span aria-hidden="true" className="mx-1.5 text-faint">
            ·
          </span>
          {project.year}
        </p>
      </div>
    </article>
  );
}
