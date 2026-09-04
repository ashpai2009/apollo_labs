import { Reveal } from "@/components/ui/Reveal";

export function MissionStrip() {
  return (
    <section className="gutter border-b border-hairline py-20 md:py-28">
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="mono-label pt-3 text-muted lg:col-span-3">
              <span className="text-signal">01</span>
              <span className="ml-3">Mission</span>
            </p>
            <p className="max-w-[24ch] text-balance font-serif text-[clamp(1.75rem,3.6vw,2.9rem)] font-normal leading-[1.18] tracking-[-0.015em] lg:col-span-9 lg:max-w-[26ch]">
              A student-led space for turning curiosity into work worth
              publishing.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
