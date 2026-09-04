import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  action,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
        <h2 className="max-w-[16ch] text-balance text-[clamp(1.85rem,3.6vw,3rem)] font-normal leading-[1.06] tracking-[-0.02em]">
          {title}
        </h2>
        {lede && (
          <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-paper-dim md:pb-1.5">
            {lede}
          </p>
        )}
        {action && <div className="shrink-0 md:pb-1.5">{action}</div>}
      </div>
    </header>
  );
}
