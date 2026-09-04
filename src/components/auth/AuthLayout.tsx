import type { ReactNode } from "react";
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
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
      {/* Identity */}
      <aside className="relative hidden overflow-hidden border-r border-hairline bg-base lg:flex lg:flex-col lg:justify-end">
        <div className="absolute inset-0">
          <ProjectCover variant="curves" seed="apollo-auth-panel" />
        </div>
        {/* Scrim: keeps the wordmark and statement legible over the artwork
            in both themes without washing the gradient out. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/15 to-void/25"
        />
        <div className="relative z-10 gutter pb-16">
          <p className="t-section max-w-[16ch] text-paper">{statement}</p>
          <p className="mono-label mt-8 text-faint">
            Apollo Labs · Est. 2026 · Student-Led Research
          </p>
        </div>
      </aside>

      {/* Form */}
      <section className="gutter flex flex-col justify-center py-28 lg:py-16">
        <div className="mx-auto w-full max-w-[28rem]">
          <p className="mono-label flex items-center gap-3 text-muted">
            <span className="text-signal-text">◆</span>
            {eyebrow}
          </p>
          <h1 className="t-section mt-7 text-paper">{title}</h1>
          {children}
          <div className="mt-10 border-t border-hairline pt-6">{footer}</div>
        </div>
      </section>
    </div>
  );
}
