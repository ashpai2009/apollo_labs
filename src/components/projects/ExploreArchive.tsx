"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/lib/projects";
import { DISCIPLINES } from "@/lib/disciplines";
import type { Project, ProjectType } from "@/lib/types";

const TYPES: ProjectType[] = [
  "Research Paper",
  "Engineering",
  "Software",
  "Experiment",
];

type Sort = "newest" | "featured";

function matches(project: Project, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    project.title.toLowerCase().includes(q) ||
    project.summary.toLowerCase().includes(q) ||
    project.abstract.toLowerCase().includes(q) ||
    project.discipline.toLowerCase().includes(q) ||
    project.tags.some((t) => t.toLowerCase().includes(q)) ||
    project.authors.some((a) => a.name.toLowerCase().includes(q))
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`mono-label border px-3 py-2 transition-colors duration-200 ${
        active
          ? "border-signal bg-signal/12 text-signal"
          : "border-hairline text-muted hover:border-hairline-strong hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

export function ExploreArchive() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState<string | null>(() => {
    const requested = params.get("discipline");
    return DISCIPLINES.some((d) => d.name === requested) ? requested : null;
  });
  const [type, setType] = useState<ProjectType | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const results = useMemo(() => {
    const filtered = PROJECTS.filter(
      (p) =>
        matches(p, query) &&
        (!discipline || p.discipline === discipline) &&
        (!type || p.type === type),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "featured" && a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return b.date.localeCompare(a.date);
    });
  }, [query, discipline, type, sort]);

  const clear = () => {
    setQuery("");
    setDiscipline(null);
    setType(null);
  };
  const filtering = Boolean(query || discipline || type);

  return (
    <>
      {/* ── Controls ─────────────────────────────── */}
      <section className="gutter border-b border-hairline py-8">
        <div className="shell-wide flex flex-col gap-7">
          <div className="flex items-center gap-4 border-b border-hairline pb-4">
            <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-faint" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <label htmlFor="archive-search" className="sr-only">
              Search projects by title, author, tag, or summary
            </label>
            <input
              id="archive-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, authors, tags, abstracts…"
              className="h-9 w-full bg-transparent text-[1rem] text-paper outline-none placeholder:text-faint"
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono-label mr-1 text-faint">Discipline</span>
                <Chip active={!discipline} onClick={() => setDiscipline(null)}>
                  All
                </Chip>
                {DISCIPLINES.map((d) => (
                  <Chip
                    key={d.name}
                    active={discipline === d.name}
                    onClick={() =>
                      setDiscipline(discipline === d.name ? null : d.name)
                    }
                  >
                    {d.code}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono-label mr-1 text-faint">Type</span>
                <Chip active={!type} onClick={() => setType(null)}>
                  All
                </Chip>
                {TYPES.map((t) => (
                  <Chip
                    key={t}
                    active={type === t}
                    onClick={() => setType(type === t ? null : t)}
                  >
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mono-label mr-1 text-faint">Sort</span>
              <Chip active={sort === "newest"} onClick={() => setSort("newest")}>
                Newest
              </Chip>
              <Chip active={sort === "featured"} onClick={() => setSort("featured")}>
                Featured
              </Chip>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────── */}
      <section className="gutter py-12 md:py-16">
        <div className="shell-wide">
          <div className="flex items-baseline justify-between gap-6 border-b border-hairline pb-5">
            <p className="mono-label text-muted">
              <span className="text-signal">
                {String(results.length).padStart(2, "0")}
              </span>
              <span className="ml-3">
                {results.length === 1 ? "Project" : "Projects"}
              </span>
            </p>
            {filtering && (
              <button
                type="button"
                onClick={clear}
                className="link-reveal mono-label text-faint transition-colors hover:text-paper"
              >
                Clear filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-[1.6rem] text-paper-dim">
                Nothing matches that yet.
              </p>
              <p className="mt-3 text-sm text-muted">
                Try a broader term, or clear the filters to see the full archive.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
