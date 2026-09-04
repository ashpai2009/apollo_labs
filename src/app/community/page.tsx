import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/ui/PageHeader";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Community",
  description:
    "What membership looks like at Apollo Labs: how projects develop, how review works, mentorship, meetings, and how work gets published.",
};

const RHYTHM = [
  {
    index: "01",
    title: "Open studio",
    cadence: "Weekly",
    body: "Members work in the same room on their own projects. Most useful questions get answered here, before they turn into a week of lost effort.",
  },
  {
    index: "02",
    title: "Project review",
    cadence: "Biweekly",
    body: "One member presents work in progress and the group pushes on it — scope, method, and whether the claims match the evidence.",
  },
  {
    index: "03",
    title: "Mentor sessions",
    cadence: "Monthly",
    body: "Scheduled time with someone who has done this work professionally. Booked around what projects actually need that month.",
  },
  {
    index: "04",
    title: "Publication review",
    cadence: "As needed",
    body: "A dedicated read of a finished draft before it goes into the archive. The reviewer is named on the published project.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Community"
        title={
          <>
            Membership is a working group,{" "}
            <span className="font-serif italic">not a mailing list.</span>
          </>
        }
        lede="Apollo runs on people showing up and doing the work in view of each other. Here is what that actually involves — the rhythm, the review, and how a project gets from an idea to the archive."
      />

      <Prose index="01" heading="What membership looks like">
        <p>
          There is no application essay and no selection round. Members join by
          starting a project and working on it where others can see it.
        </p>
        <p>
          <strong>The one real expectation is that you finish.</strong> Projects
          are scoped at the start so that finishing is realistic — a term, not a
          career. A project that turns out to be too large gets narrowed rather
          than abandoned.
        </p>
        <p>
          Members are expected to review other people&apos;s work too. Reviewing
          is how the standard holds, and it is the fastest way to get better at
          your own writing.
        </p>
      </Prose>

      <section className="gutter border-b border-hairline py-16 md:py-24">
        <div className="shell-wide grid gap-10 lg:grid-cols-12">
          <p className="mono-label flex gap-3 text-muted lg:col-span-3">
            <span className="text-signal">02</span>
            <span>The rhythm</span>
          </p>
          <div className="lg:col-span-9">
            <ul className="border-t border-hairline">
              {RHYTHM.map((item, i) => (
                <Reveal as="li" key={item.index} delay={i * 0.05}>
                  <div className="group grid gap-x-8 gap-y-3 border-b border-hairline py-8 md:grid-cols-12 md:items-baseline">
                    <span className="mono-label text-signal md:col-span-1">
                      {item.index}
                    </span>
                    <h2 className="font-serif text-[1.5rem] leading-tight md:col-span-4">
                      {item.title}
                    </h2>
                    <span className="mono-label text-faint md:col-span-2">
                      {item.cadence}
                    </span>
                    <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-paper-dim md:col-span-5">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Prose index="03" heading="Collaboration">
        <p>
          Projects can be solo or shared, and the split is usually decided by
          what the work needs rather than by who wants to join. A field study
          with thirty deployment sites needs more hands than a proof does.
        </p>
        <p>
          Every contributor is credited by name and by what they actually did —
          fabrication, analysis, firmware, writing. Vague group authorship helps
          no one, least of all the person who did the most.
        </p>
      </Prose>

      <Prose index="04" heading="Mentorship">
        <p>
          Mentors are researchers, engineers, and graduate students who agree to
          a small, specific commitment: read a draft, sit in on a review, or
          answer a methods question that has a project stuck.
        </p>
        <p>
          The point is not to hand a project to an expert. It is to shorten the
          distance between a student making an avoidable mistake and someone
          telling them so.
        </p>
      </Prose>

      <Prose index="05" heading="Publishing your work">
        <p>
          When a project is finished, it gets written up in the Apollo
          publication format: abstract, the sections the work actually calls for,
          figures with real captions, and links to code, data, or hardware files
          where they exist.
        </p>
        <p>
          After review, it goes into the archive with a permanent URL, an author
          line, and a date. It stays there. Projects can be updated with a
          revision note, but published work is not quietly deleted.
        </p>
      </Prose>

      <section className="gutter py-24 md:py-32">
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <p className="mono-label text-muted lg:col-span-3 lg:pt-3">
                <span className="text-signal">◆</span>
                <span className="ml-3">Join</span>
              </p>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="max-w-[15ch] text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.06] tracking-[-0.025em]">
                  Bring the thing you{" "}
                  <span className="font-serif italic">never finished.</span>
                </h2>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/join" className="group">
                    Join Apollo <Arrow />
                  </ButtonLink>
                  <ButtonLink href="/about" variant="secondary">
                    About the Organization
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
