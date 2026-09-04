import { ButtonLink, Arrow } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="gutter">
      <div className="shell-wide">
        <div className="flex flex-col gap-6 border-t border-hairline py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-12 md:py-16">
          <div>
            <h2 className="max-w-[22ch] text-[clamp(1.5rem,2.8vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em]">
              Have something worth publishing?
            </h2>
            <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-paper-dim">
              Bring a half-finished idea or a project that has been sitting
              unpublished. We will help you finish it.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href="/join" className="group">
              Join Apollo <Arrow />
            </ButtonLink>
            <ButtonLink href="/explore" variant="secondary">
              Browse the Archive
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
