import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { ProjectCover } from "@/components/projects/ProjectCover";

/**
 * Split-screen auth shell: Apollo identity on one side, the form set directly
 * into the page on the other — no floating card.
 */
export function AuthLayout({
  eyebrow,
  title,
  statement,
  children,
  footer,
}: {
  eyebrow: string;
  title: ReactNode;
  statement: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-2">
      {/* Identity */}
      <aside className="relative hidden overflow-hidden border-r border-hairline bg-base lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-70">
          <ProjectCover variant="network" seed="apollo-auth" />
        </div>
        <div className="relative gutter pt-16">
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo size={30} />
            <span className="flex items-baseline gap-[0.45em] text-[0.8125rem] font-medium uppercase leading-none tracking-[0.2em]">
              <span className="text-paper">Apollo</span>
              <span className="text-muted">Labs</span>
            </span>
          </Link>
        </div>
        <div className="relative gutter pb-16">
          <p className="max-w-[20ch] font-serif text-[clamp(1.9rem,2.6vw,2.6rem)] leading-[1.15]">
            {statement}
          </p>
          <p className="mono-label mt-8 text-faint">
            Apollo Labs · Est. 2026 · Student-Led Research
          </p>
        </div>
      </aside>

      {/* Form */}
      <section className="gutter flex flex-col justify-center py-28 lg:py-16">
        <div className="mx-auto w-full max-w-[26rem]">
          <p className="mono-label flex items-center gap-3 text-muted">
            <span className="text-signal-text">◆</span>
            {eyebrow}
          </p>
          <h1 className="mt-7 text-[clamp(1.9rem,3.4vw,2.5rem)] font-normal leading-[1.08] tracking-[-0.025em]">
            {title}
          </h1>
          {children}
          <div className="mt-10 border-t border-hairline pt-6">{footer}</div>
        </div>
      </section>
    </div>
  );
}

export function MockNotice() {
  return (
    <p className="mono-label mt-6 border border-hairline px-3 py-2.5 text-faint">
      Prototype build — no account is created and nothing is submitted.
    </p>
  );
}
