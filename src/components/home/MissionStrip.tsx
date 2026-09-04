/**
 * The mission band. One large statement carries the idea; the paragraph and
 * the three principles support it rather than competing with it.
 */
const PRINCIPLES = [
  {
    term: "Student-led",
    detail: "Scoped and run by the people doing the work.",
  },
  {
    term: "Reviewed",
    detail: "Read by a member before anything publishes.",
  },
  {
    term: "Published",
    detail: "A permanent, citable page in a public archive.",
  },
];

export function MissionStrip() {
  return (
    <section className="gutter border-y border-hairline bg-surface">
      <div className="shell-wide py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="mono-label text-signal-text">Mission</p>
            <h2 className="t-section mt-5 max-w-[19ch] text-paper">
              Student work should not disappear after it is finished.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-11">
            <p className="t-body max-w-[46ch] text-paper-dim">
              Apollo Labs gives that work somewhere permanent to live, and a
              standard worth meeting on the way there.
            </p>
          </div>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.term}>
              <dt className="t-sub text-paper">{p.term}</dt>
              <dd className="t-meta mt-2 max-w-[30ch] text-muted">{p.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
