const STEPS = [
  { index: "01", title: "Build", body: "Start something worth exploring, scoped so it can actually finish." },
  { index: "02", title: "Collaborate", body: "Work alongside students and mentors who have done it before." },
  { index: "03", title: "Review", body: "Refine in the open, before decisions become irreversible." },
  { index: "04", title: "Publish", body: "A permanent home with your name and a citable link." },
];

/** Four stages laid across the full width, joined by a single rule. */
export function HowApolloWorks() {
  return (
    <section id="process" className="gutter section scroll-mt-20">
      <div className="shell-wide">
        <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mono-label text-signal-text">How Apollo Works</p>
            <h2 className="t-section mt-6 max-w-[14ch] text-paper">
              From idea to publication.
            </h2>
          </div>
          <p className="t-body-sm max-w-[38ch] text-muted lg:col-span-4 lg:col-start-9 lg:pb-2">
            Four stages. Every published project has been through all of them.
          </p>
        </header>

        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-0 top-[6px] hidden h-px w-full bg-hairline lg:block"
          />
          {STEPS.map((step) => (
            <li key={step.index} className="relative lg:pt-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 hidden size-[13px] bg-signal lg:block"
              />
              <p className="mono-label text-signal-text lg:text-faint">{step.index}</p>
              <h3 className="t-sub mt-3">{step.title}</h3>
              <p className="t-body-sm mt-3 max-w-[30ch] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
