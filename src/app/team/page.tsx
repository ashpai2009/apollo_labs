import type { Metadata } from "next";
import { TeamGrid } from "@/components/about/TeamGrid";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the students who lead Apollo Labs, support its members, and build its research publishing platform.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Team"
        title={
          <>
            The people doing the work,{" "}
            <span className="text-paper-dim">and the roles they own.</span>
          </>
        }
        lede="Apollo is small on purpose. Every person here owns a clear part of the organization and remains close to the projects being published."
      />

      <TeamGrid />

      <section className="gutter section-lg">
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-10 border border-hairline bg-surface/45 p-7 md:p-10 lg:grid-cols-12 lg:items-end lg:gap-16">
              <div className="lg:col-span-7">
                <p className="mono-label text-muted">
                  <span className="text-signal-text">◆</span>
                  <span className="ml-3">Work with us</span>
                </p>
                <h2 className="t-section mt-6 max-w-[17ch] text-paper">
                  Bring a question. Leave with something finished.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end lg:pb-1">
                <ButtonLink href="/join" size="lg" className="group">
                  Join Apollo <Arrow />
                </ButtonLink>
                <ButtonLink href="/community" size="lg" variant="secondary">
                  How membership works
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
