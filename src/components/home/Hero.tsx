import { HeroVisual } from "./HeroVisual";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/projects";
import { DISCIPLINES } from "@/lib/disciplines";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="gutter shell-wide relative pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Editorial column */}
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="mono-label flex items-center gap-3 text-muted">
              <span className="text-signal">◆</span>
              Apollo Labs · Student-Led Research
            </p>

            <h1 className="mt-8 max-w-[15ch] text-[clamp(2.5rem,6.4vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.03em]">
              Built for students who make{" "}
              <span className="font-serif italic tracking-[-0.01em]">
                things worth sharing.
              </span>
            </h1>

            <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-paper-dim">
              Apollo Labs is where student research actually lives. Build a
              project, refine it with people who care about the details, publish
              it properly — and leave it somewhere it can be read.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#work" className="group">
                Explore Projects <Arrow />
              </ButtonLink>
              <ButtonLink href="/join" variant="secondary">
                Publish Your Work
              </ButtonLink>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-7">
              {[
                { label: "Published", value: String(PROJECTS.length).padStart(2, "0") },
                { label: "Disciplines", value: String(DISCIPLINES.length).padStart(2, "0") },
                { label: "Established", value: "2026" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="mono-label text-faint">{stat.label}</dt>
                  <dd className="mt-2 font-serif text-2xl leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Technical visual */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-square w-full max-lg:mx-auto max-lg:max-w-md lg:aspect-[5/4]">
              <HeroVisual />
              <span className="mono-label pointer-events-none absolute bottom-0 left-0 text-faint">
                Fig. 00 — Orbital index
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
