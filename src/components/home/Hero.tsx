import { HeroVisual } from "./HeroVisual";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";
import { DISCIPLINES } from "@/lib/disciplines";

const STATS = [
  { label: "Published", value: String(PROJECTS.length).padStart(2, "0") },
  { label: "Disciplines", value: String(DISCIPLINES.length).padStart(2, "0") },
  { label: "Established", value: "2026" },
];

/**
 * Asymmetric: the statement takes roughly three fifths of the grid and the
 * project visual the remainder, so the composition reads left-weighted rather
 * than as a centred slogan.
 */
export function Hero() {
  return (
    <section className="gutter pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="shell-wide grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 xl:col-span-6">
          <p className="mono-label flex items-center gap-2.5 text-signal-text">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            Student-Led Research
          </p>

          <h1 className="t-hero mt-7 max-w-[16ch] text-paper">
            Student work should have somewhere{" "}
            <span className="font-serif font-normal italic tracking-[-0.015em]">
              permanent
            </span>{" "}
            to live.
          </h1>

          <p className="t-lead mt-8 max-w-[46ch] text-paper-dim">
            Apollo Labs is where students scope a project, get it reviewed by
            people who care about the details, and publish it to an archive that
            stays put.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#work" size="lg" className="group">
              Explore Projects <Arrow />
            </ButtonLink>
            <ButtonLink href="/join" size="lg" variant="secondary">
              Publish Your Work
            </ButtonLink>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-14 gap-y-5 border-t border-hairline pt-7">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dd className="text-[clamp(2rem,2.6vw,2.75rem)] font-medium leading-none tracking-[-0.03em] text-paper">
                  {stat.value}
                </dd>
                <dt className="mono-label mt-2.5 text-faint">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 xl:col-span-6 max-lg:mx-auto max-lg:w-full max-lg:max-w-lg">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
