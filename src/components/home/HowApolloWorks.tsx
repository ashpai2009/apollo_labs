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
        <header className="flex flex-col gap-3 border-b border-hairline pb-6">
          <p className="mono-label text-signal-text">How Apollo Works</p>
          <h2 className="t-section max-w-[18ch] text-paper">
            From idea to publication.
          </h2>
        </header>

        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
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
              <h3 className="t-sub mt-2.5">{step.title}</h3>
              <p className="t-body-sm mt-2 max-w-[32ch] text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
