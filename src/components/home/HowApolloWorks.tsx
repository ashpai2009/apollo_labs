const STEPS = [
  { index: "01", title: "Build", body: "Start something worth exploring, scoped so it can actually finish." },
  { index: "02", title: "Collaborate", body: "Work alongside other students and mentors who have done it before." },
  { index: "03", title: "Review", body: "Refine the work in the open, before decisions become irreversible." },
  { index: "04", title: "Publish", body: "Give it a permanent home with your name and a citable link." },
];

export function HowApolloWorks() {
  return (
    <section id="process" className="gutter section scroll-mt-20">
      <div className="shell-wide">
        <h2 className="mono-label text-signal-text">How Apollo Works</h2>

        <ol className="relative mt-7 grid gap-8 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[5px] hidden h-px w-full bg-hairline md:block"
          />
          {STEPS.map((step) => (
            <li key={step.index} className="relative md:pt-6">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 hidden size-[11px] bg-signal md:block"
              />
              <p className="mono-label text-faint">{step.index}</p>
              <h3 className="mt-2 text-[1.0625rem] font-medium tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="mt-1.5 max-w-[34ch] text-[0.875rem] leading-relaxed text-paper-dim">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
