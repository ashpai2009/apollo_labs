import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function PageHeader({
  index,
  eyebrow,
  title,
  lede,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="gutter border-b border-hairline pb-14 pt-24 md:pb-20 md:pt-32">
      <div className="shell-wide grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <h1 className="t-page max-w-[18ch] text-paper">{title}</h1>
          {lede && (
            <p className="t-lead mt-7 max-w-[54ch] text-paper-dim">{lede}</p>
          )}
          {aside}
        </div>
      </div>
    </header>
  );
}

/**
 * A numbered band on the static pages.
 *
 * The left rail holds the section number and name as metadata. The right
 * column carries the actual hierarchy: a real heading, one lead sentence
 * that states the point, then short supporting copy and optional bullets.
 */
export function Prose({
  index,
  label,
  title,
  lead,
  points,
  children,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  points?: { term: string; detail: string }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="gutter border-b border-hairline py-14 md:py-20">
      <div className="shell-wide grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <p className="mono-label flex gap-3 text-muted lg:sticky lg:top-28">
            <span className="text-signal-text">{index}</span>
            <span>{label}</span>
          </p>
        </div>

        <div className="lg:col-span-8 lg:col-start-4">
          <h2 className="t-section max-w-[22ch] text-paper">{title}</h2>

          {lead && (
            <p className="t-lead mt-5 max-w-[50ch] text-paper-dim">{lead}</p>
          )}

          {children && (
            <div className="t-body mt-6 flex max-w-[62ch] flex-col gap-4 text-muted [&_strong]:font-medium [&_strong]:text-paper">
              {children}
            </div>
          )}

          {points && (
            <dl className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point.term} className="border-t border-hairline pt-4">
                  <dt className="t-body-sm font-medium text-paper">
                    {point.term}
                  </dt>
                  <dd className="t-meta mt-1.5 max-w-[34ch] text-muted">
                    {point.detail}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {aside}
        </div>
      </div>
    </section>
  );
}
