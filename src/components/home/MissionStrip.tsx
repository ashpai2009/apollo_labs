/**
 * Statement left, explanation and principles right. Asymmetric on purpose —
 * the claim carries the weight, the right column supports it.
 */
const PRINCIPLES = [
  { term: "Build", detail: "Scoped so it can actually finish." },
  { term: "Review", detail: "Read by a member before it publishes." },
  { term: "Publish", detail: "A permanent, citable page." },
];

export function MissionStrip() {
  return (
    <section className="gutter border-y border-hairline bg-surface">
      <div className="shell-wide grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <p className="mono-label text-signal-text">Mission</p>
          <h2 className="t-section mt-6 max-w-[16ch] text-paper">
            Most student work disappears when the class ends.
          </h2>
        </div>

        <div className="lg:col-span-5 lg:pt-16">
          <p className="t-body max-w-[42ch] text-paper-dim">
            It sits in a shared drive, gets shown once, and is never read again.
            Apollo gives that work a standard to meet and somewhere to stay.
          </p>

          <dl className="mt-10 flex flex-col">
            {PRINCIPLES.map((p) => (
              <div
                key={p.term}
                className="flex items-baseline gap-6 border-t border-hairline py-5"
              >
                <dt className="t-sub w-32 shrink-0 text-paper">{p.term}</dt>
                <dd className="t-body text-paper-dim">{p.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
