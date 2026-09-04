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
    <section className="gutter pb-14 pt-24 md:pb-20 md:pt-28">
      <div className="shell-wide grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="mono-label flex items-center gap-2.5 text-signal-text">
            <span aria-hidden="true" className="size-1.5 bg-signal" />
            Student-Led Research
          </p>

          <h1 className="mt-5 max-w-[17ch] text-[clamp(2.1rem,4.4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Built for students who make{" "}
            <span className="font-serif font-normal italic tracking-[-0.01em]">
              things worth sharing.
            </span>
          </h1>

          <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.6] text-paper-dim">
            Apollo Labs is where student research lives. Build a project, refine
            it with people who care about the details, publish it properly — and
            leave it somewhere it can be read.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#work" className="group">
              Explore Projects <Arrow />
            </ButtonLink>
            <ButtonLink href="/join" variant="secondary">
              Publish Your Work
            </ButtonLink>
          </div>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2.5">
                <dd className="text-[1.375rem] font-medium leading-none tracking-[-0.02em]">
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
