import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { TEAM } from "@/lib/team";

export function CommunitySection() {
  return (
    <section className="gutter border-t border-hairline py-24 md:py-32">
      <div className="shell-wide grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="mono-label flex gap-3 text-muted">
            <span className="text-signal">05</span>
            <span>Community</span>
          </p>
        </div>

        <Reveal className="lg:col-span-5">
          <h2 className="max-w-[18ch] text-[clamp(1.8rem,3.4vw,2.7rem)] font-normal leading-[1.08] tracking-[-0.02em]">
            Student-led, and deliberately{" "}
            <span className="font-serif italic">small enough to be useful.</span>
          </h2>
          <p className="mt-7 max-w-[44ch] text-[1rem] leading-relaxed text-paper-dim">
            Apollo is run by students who are also publishing through it. Members
            scope projects together, review each other&apos;s drafts before
            anything goes out, and bring in mentors when a project needs
            expertise the group does not have.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/community" variant="secondary" className="group">
              How Membership Works <Arrow />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3 lg:col-start-10" delay={0.1}>
          <dl className="flex flex-col gap-7 border-t border-hairline pt-7">
            <div>
              <dt className="mono-label text-faint">Founded</dt>
              <dd className="mt-2 font-serif text-2xl leading-none">2026</dd>
            </div>
            <div>
              <dt className="mono-label text-faint">Core team</dt>
              <dd className="mt-2 font-serif text-2xl leading-none">
                {String(TEAM.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-faint">Review before publish</dt>
              <dd className="mt-2 font-serif text-2xl leading-none">Always</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
