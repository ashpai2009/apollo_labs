/**
 * Compact credibility band: three claims and a short paragraph on one row.
 * Replaces the full-screen mission statement.
 */
const CLAIMS = [
  "Student-led research.",
  "Built collaboratively.",
  "Published publicly.",
];

export function MissionStrip() {
  return (
    <section className="gutter border-y border-hairline bg-surface">
      <div className="shell-wide grid gap-6 py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
        <ul className="flex flex-col gap-1.5">
          {CLAIMS.map((claim) => (
            <li
              key={claim}
              className="text-[1.0625rem] font-medium leading-snug tracking-[-0.015em]"
            >
              {claim}
            </li>
          ))}
        </ul>
        <p className="max-w-[68ch] text-[0.9375rem] leading-relaxed text-paper-dim md:justify-self-end">
          Apollo Labs gives student work somewhere permanent to live and a
          standard worth meeting on the way there. Members scope projects with
          people who have finished one before, review each other&apos;s drafts
          in the open, and publish to an archive that stays put.
        </p>
      </div>
    </section>
  );
}
