import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    index: "01",
    title: "Build",
    body: "Start with a question or a thing you want to make. Members help narrow it until it is something you can actually finish.",
  },
  {
    index: "02",
    title: "Refine",
    body: "Work in the open. Progress gets reviewed while decisions are still reversible, not after the fact.",
  },
  {
    index: "03",
    title: "Publish",
    body: "Write it up in the Apollo format — abstract, method, results, and the resources behind it. A member reviews it before it goes out.",
  },
  {
    index: "04",
    title: "Share",
    body: "It lands in the archive with a permanent link, your name on it, and a page you can actually send to someone.",
  },
];

export function HowApolloWorks() {
  return (
    <section
      id="process"
      className="gutter scroll-mt-24 border-t border-hairline py-24 md:py-32"
    >
      <div className="shell-wide">
        <SectionHeading
          index="04"
          eyebrow="How Apollo Works"
          title={
            <>
              From an idea to{" "}
              <span className="font-serif italic text-paper-dim">
                something citable.
              </span>
            </>
          }
        />

        <ol className="relative mt-14 grid gap-12 md:mt-20 md:grid-cols-4 md:gap-8">
          {/* The thread that runs through the sequence */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-hairline max-md:block md:left-0 md:top-[7px] md:h-px md:w-full md:block"
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 0.08}>
              <div className="relative pl-8 md:pl-0 md:pt-8">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 size-[15px] border border-hairline-strong bg-void md:top-0"
                >
                  <span className="absolute inset-[3px] bg-signal" />
                </span>
                <p className="mono-label text-signal-text">{step.index}</p>
                <h3 className="mt-4 font-serif text-[1.6rem] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-paper-dim">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
