import { HeroVisual } from "./HeroVisual";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";
import { DISCIPLINES } from "@/lib/disciplines";

const STATS = [
  { label: "Published", value: String(PROJECTS.length).padStart(2, "0") },
  { label: "Disciplines", value: String(DISCIPLINES.length).padStart(2, "0") },
  { label: "Established", value: "2026" },
];

export function Hero() {
  return (
    <section className="gutter pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="shell-wide grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="mono-label flex items-center gap-2.5 text-signal-text">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            Student-Led Research
          </p>

          <h1 className="t-hero mt-6 max-w-[15ch] text-paper">
            Built for students who make{" "}
            <span className="font-serif font-normal italic tracking-[-0.01em]">
              things worth sharing.
            </span>
          </h1>

          <p className="t-lead mt-7 max-w-[44ch] text-paper-dim">
            Build a project, refine it with people who care about the details,
            and publish it somewhere it can actually be read.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#work" className="group">
              Explore Projects <Arrow />
            </ButtonLink>
            <ButtonLink href="/join" variant="secondary">
              Publish Your Work
            </ButtonLink>
          </div>

          <dl className="mt-11 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2.5">
                <dd className="text-[1.625rem] font-medium leading-none tracking-[-0.02em] text-paper">
                  {stat.value}
                </dd>
                <dt className="mono-label text-faint">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
