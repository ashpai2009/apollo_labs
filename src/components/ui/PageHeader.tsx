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
    <header className="gutter border-b border-hairline pb-12 pt-24 md:pb-16 md:pt-28">
      <div className="shell-wide grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </div>
        <div className="lg:col-span-9">
          <h1 className="max-w-[20ch] text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.06] tracking-[-0.03em]">
            {title}
          </h1>
          {lede && (
            <p className="mt-5 max-w-[56ch] text-[1rem] leading-[1.6] text-paper-dim">
              {lede}
            </p>
          )}
          {aside}
        </div>
      </div>
    </header>
  );
}

/** Numbered editorial block used down the length of the static pages. */
export function Prose({
  index,
  heading,
  children,
  aside,
}: {
  index: string;
  heading: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="gutter border-b border-hairline py-12 md:py-16">
      <div className="shell-wide grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="mono-label flex gap-3 text-muted lg:sticky lg:top-28">
            <span className="text-signal-text">{index}</span>
            <span>{heading}</span>
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-5">
          <div className="flex max-w-[62ch] flex-col gap-5 text-[1rem] leading-[1.7] text-paper-dim [&_strong]:font-normal [&_strong]:text-paper">
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
