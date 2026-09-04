import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { ArticleBody } from "@/components/publication/ArticleBody";
import { ResourceLinks } from "@/components/publication/ResourceLinks";
import { TableOfContents } from "@/components/publication/TableOfContents";
import { coverVariantFor, disciplineCode } from "@/lib/disciplines";
import {
  PROJECTS,
  formatDate,
  getProject,
  getRelatedProjects,
} from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const toc = [
    { id: "abstract", heading: "Abstract" },
    ...project.content.map((s) => ({ id: s.id, heading: s.heading })),
    ...(project.links ? [{ id: "resources", heading: "Resources" }] : []),
  ];

  return (
    <article>
      {/* ── Masthead ─────────────────────────────── */}
      <header className="gutter border-b border-hairline pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="shell-wide">
          <nav aria-label="Breadcrumb" className="mono-label text-faint">
            <Link href="/" className="transition-colors hover:text-paper-dim">
              Apollo
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link href="/explore" className="transition-colors hover:text-paper-dim">
              Archive
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-paper-dim">{disciplineCode(project.discipline)}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="mono-label flex items-center gap-2 text-paper-dim">
                  <span aria-hidden="true" className="size-1 bg-signal" />
                  {project.discipline}
                </span>
                <span aria-hidden="true" className="text-faint">
                  ·
                </span>
                <span className="mono-label text-muted">{project.type}</span>
                <span aria-hidden="true" className="text-faint">
                  ·
                </span>
                <span className="mono-label text-muted">{project.status}</span>
              </div>

              <h1 className="mt-7 max-w-[20ch] font-serif text-[clamp(2.2rem,5.4vw,4rem)] font-normal leading-[1.06] tracking-[-0.02em]">
                {project.title}
              </h1>

              <p className="mt-8 max-w-[54ch] text-[1.0625rem] leading-relaxed text-paper-dim">
                {project.summary}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-7 self-end border-t border-hairline pt-7 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <dt className="mono-label text-faint">Authors</dt>
                <dd className="mt-2.5 flex flex-col gap-1">
                  {project.authors.map((author) => (
                    <span key={author.name} className="text-[0.9375rem] text-paper">
                      {author.name}
                      {author.role && (
                        <span className="ml-2 text-[0.75rem] text-faint">
                          {author.role}
                        </span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-faint">Published</dt>
                <dd className="mt-2.5 text-[0.9375rem] text-paper">
                  {formatDate(project.date)}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-faint">Reading time</dt>
                <dd className="mt-2.5 text-[0.9375rem] text-paper">
                  {project.readingTime} min
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      {/* ── Cover ────────────────────────────────── */}
      <div className="gutter border-b border-hairline py-10 md:py-14">
        <div className="shell-wide">
          <div className="aspect-[21/9] w-full overflow-hidden border border-hairline bg-base max-md:aspect-[3/2]">
            <ProjectCover
              variant={coverVariantFor(project.discipline)}
              seed={project.id}
              label={`Cover artwork for ${project.title}`}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="mono-label border border-hairline px-2 py-1.5 text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────── */}
      <div className="gutter py-16 md:py-24">
        <div className="shell-wide grid gap-16 xl:grid-cols-12 xl:gap-10">
          <div className="hidden xl:col-span-3 xl:block">
            <TableOfContents items={toc} />
          </div>
          <div className="xl:col-span-8 xl:col-start-5">
            <div className="measure">
              <ArticleBody project={project} />
              <ResourceLinks project={project} />
            </div>
          </div>
        </div>
      </div>

      <RelatedProjects projects={getRelatedProjects(project)} />
    </article>
  );
}
