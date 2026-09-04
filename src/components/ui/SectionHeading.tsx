import type { ReactNode } from "react";

/**
 * Compact section header: a label, one line of context, and an optional
 * action on the same row. Deliberately not a full-screen title block.
 */
export function SectionHeading({
  label,
  lede,
  action,
  className,
}: {
  label: string;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`flex flex-col gap-3 border-b border-hairline pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10 ${className ?? ""}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="mono-label text-signal-text">{label}</h2>
        {lede && (
          <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-paper-dim">
            {lede}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
