import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section className="gutter border-t border-hairline py-28 md:py-40">
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12">
            <p className="mono-label text-muted lg:col-span-3 lg:pt-4">
              <span className="text-signal">◆</span>
              <span className="ml-3">Join Apollo Labs</span>
            </p>
            <div className="lg:col-span-8 lg:col-start-4">
              <h2 className="max-w-[16ch] text-[clamp(2.1rem,5vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.025em]">
                Your work deserves{" "}
                <span className="font-serif italic">somewhere to live.</span>
              </h2>
              <p className="mt-7 max-w-[44ch] text-[1rem] leading-relaxed text-paper-dim">
                Bring a half-finished idea, a dataset you cannot stop thinking
                about, or a project that has been sitting unpublished. We will
                help you finish it.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/explore" className="group">
                  Explore Apollo <Arrow />
                </ButtonLink>
                <ButtonLink href="/community" variant="secondary">
                  Join the Community
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
