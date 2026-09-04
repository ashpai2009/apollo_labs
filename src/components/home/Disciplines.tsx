import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { DISCIPLINES } from "@/lib/disciplines";
import { disciplineCounts } from "@/lib/projects";

export function Disciplines() {
  const counts = disciplineCounts();

  return (
    <section
      id="disciplines"
      className="gutter scroll-mt-24 border-t border-hairline py-24 md:py-32"
    >
      <div className="shell-wide">
        <SectionHeading
          index="03"
          eyebrow="Disciplines"
          title={
            <>
              Seven fields,{" "}
              <span className="font-serif italic text-paper-dim">
                one standard.
              </span>
            </>
          }
          lede="Apollo does not privilege papers over builds. Pick a field to see what members have published in it."
        />

        <ul className="mt-14 border-t border-hairline md:mt-20">
          {DISCIPLINES.map((d, i) => (
            <Reveal as="li" key={d.name} delay={i * 0.03}>
              <Link
                href={`/explore?discipline=${encodeURIComponent(d.name)}`}
                className="group grid gap-x-8 gap-y-2 border-b border-hairline py-7 transition-[padding,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-paper/[0.02] hover:pl-4 md:grid-cols-12 md:items-baseline md:py-8"
              >
                <span className="mono-label text-faint md:col-span-1">
                  {d.code}
                </span>
                <h3 className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight md:col-span-4">
                  {d.name}
                </h3>
                <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted md:col-span-5">
                  {d.description}
                </p>
                <span className="flex items-center gap-4 md:col-span-2 md:justify-end">
                  <span className="mono-label text-paper-dim">
                    {String(counts.get(d.name) ?? 0).padStart(2, "0")}{" "}
                    {counts.get(d.name) === 1 ? "Project" : "Projects"}
                  </span>
                  <span className="text-signal-text opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Arrow />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
