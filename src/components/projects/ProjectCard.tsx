"use client";

import { useRef } from "react";
import { ProjectCover } from "./ProjectCover";
import { useProjectModal } from "./ProjectModalContext";
import { coverVariantFor } from "@/lib/disciplines";
import { authorLine } from "@/lib/projects";
import type { Project } from "@/lib/types";

/**
 * One card shape, two sizes. The image carries roughly 60% of the card, and
 * every card in a row lines up on the same aspect ratio.
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
          featured ? "aspect-[16/9]" : "aspect-[4/3]"
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
        className={`flex flex-1 flex-col gap-2.5 ${featured ? "p-6" : "p-5"}`}
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
            featured ? "text-[1.375rem]" : "text-[1.0625rem]"
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
              ? "text-[0.9375rem] leading-relaxed"
              : "line-clamp-2 text-[0.875rem] leading-relaxed"
          }`}
        >
          {project.summary}
        </p>

        <p className="mt-auto pt-2 text-[0.8125rem] text-muted">
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
