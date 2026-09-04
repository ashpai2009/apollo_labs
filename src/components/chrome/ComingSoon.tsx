import Link from "next/link";
import { ButtonLink, Arrow } from "@/components/ui/Button";

/**
 * Placeholder for routes scheduled after the Phase 1B design review, so
 * navigation stays honest instead of dead-ending in a 404.
 */
export function ComingSoon({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="gutter flex min-h-[70dvh] items-center pb-24 pt-40">
      <div className="shell-wide grid gap-10 lg:grid-cols-12">
        <p className="mono-label text-muted lg:col-span-3 lg:pt-4">
          <span className="text-signal">{index}</span>
          <span className="ml-3">In development</span>
        </p>
        <div className="lg:col-span-8 lg:col-start-4">
          <h1 className="max-w-[14ch] text-[clamp(2.2rem,5vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.025em]">
            {title}
          </h1>
          <p className="mt-7 max-w-[46ch] text-[1rem] leading-relaxed text-paper-dim">
            {description}
          </p>
          <p className="mono-label mt-10 text-faint">
            Scheduled for the next build · Phase 1C
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#work" className="group">
              Browse Selected Work <Arrow />
            </ButtonLink>
            <Link
              href="/"
              className="link-reveal self-center text-sm text-paper-dim transition-colors hover:text-paper"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
