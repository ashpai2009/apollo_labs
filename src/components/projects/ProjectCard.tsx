"use client";

import { useRef } from "react";
import { ProjectCover } from "./ProjectCover";
import { useProjectModal } from "./ProjectModalContext";
import { coverVariantFor } from "@/lib/disciplines";
import { authorLine, formatShortDate } from "@/lib/projects";
import type { Project } from "@/lib/types";

type Variant = "featured" | "standard" | "wide";

export function ProjectCard({
  project,
  variant = "standard",
  index,
}: {
  project: Project;
  variant?: Variant;
  index?: number;
}) {
  const { open } = useProjectModal();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const cover = (
    <div
      className={`relative overflow-hidden border border-hairline bg-base transition-colors duration-500 group-hover:border-hairline-strong ${
        variant === "featured"
          ? "aspect-[16/10]"
          : variant === "wide"
            ? "aspect-[16/10] sm:aspect-auto sm:h-full sm:min-h-[16rem]"
            : "aspect-[4/3]"
      }`}
    >
      <ProjectCover
        variant={coverVariantFor(project.discipline)}
        seed={project.id}
        className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {project.status !== "Published" && (
        <span className="mono-label absolute left-3 top-3 bg-void/80 px-2 py-1 text-paper-dim backdrop-blur-sm">
          {project.status}
        </span>
      )}
    </div>
  );

  const meta = (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="mono-label flex items-center gap-2 whitespace-nowrap text-paper-dim">
        <span aria-hidden="true" className="size-1 shrink-0 bg-signal" />
        {project.discipline}
      </span>
      <span aria-hidden="true" className="hidden h-px flex-1 bg-hairline sm:block" />
      <span className="mono-label whitespace-nowrap text-faint">{project.type}</span>
    </div>
  );

  const body = (
    <div
      className={
        variant === "featured"
          ? "mt-6 flex flex-col gap-4"
          : variant === "wide"
            ? "mt-5 flex flex-col gap-4 sm:mt-0"
            : "mt-5 flex flex-col gap-3"
      }
    >
      {meta}
      <h3
        className={`font-serif font-normal leading-[1.12] tracking-[-0.01em] ${
          variant === "featured"
            ? "text-[clamp(1.6rem,2.6vw,2.35rem)]"
            : variant === "wide"
              ? "text-[clamp(1.45rem,2.2vw,1.9rem)]"
              : "text-[1.3rem]"
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
          variant === "standard"
            ? "line-clamp-2 text-[0.875rem] leading-relaxed"
            : "max-w-[52ch] text-[0.9375rem] leading-relaxed"
        }`}
      >
        {project.summary}
      </p>
      <div className="mt-1 flex items-baseline gap-3">
        <span className="text-[0.8125rem] text-muted">{authorLine(project)}</span>
        <span aria-hidden="true" className="text-faint">·</span>
        <span className="mono-label text-faint">{formatShortDate(project.date)}</span>
      </div>
    </div>
  );

  return (
    <article
      className="group relative isolate rounded-[1px] transition-opacity duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-offset-[6px] focus-within:outline-signal"
      aria-labelledby={undefined}
    >
      {typeof index === "number" && (
        <span className="mono-label absolute -top-6 right-0 hidden text-faint lg:block">
          {String(index).padStart(2, "0")}
        </span>
      )}
      {variant === "wide" ? (
        <div className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10">
          {cover}
          <div className="sm:py-2">{body}</div>
        </div>
      ) : (
        <>
          {cover}
          {body}
        </>
      )}
    </article>
  );
}
