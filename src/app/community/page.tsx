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
    body: "Work alongside other members. Most useful questions get answered here, before they turn into a week of lost effort.",
  },
  {
    index: "02",
    title: "Project review",
    cadence: "Biweekly",
    body: "One member presents work in progress and the group pushes on scope, method, and evidence.",
  },
  {
    index: "03",
    title: "Mentor sessions",
    cadence: "Monthly",
    body: "Scheduled time with someone who has done this work professionally, booked around what projects need.",
  },
  {
    index: "04",
    title: "Publication review",
    cadence: "As needed",
    body: "A dedicated read of a finished draft. The reviewer is named on the published project.",
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
            <span className="text-paper-dim">not a mailing list.</span>
          </>
        }
        lede="Apollo runs on people showing up and doing the work in view of each other. Here is the rhythm, the review, and how a project reaches the archive."
      />

      <Prose
        index="01"
        label="Membership"
        title="You join by starting a project, not by applying."
        lead="There is no application essay and no selection round. Members join by beginning work and doing it where others can see it."
        points={[
          {
            term: "Finish what you start",
            detail: "The one real expectation. Scope a term, not a career.",
          },
          {
            term: "Narrow, don't abandon",
            detail: "A project that turns out too large gets cut down.",
          },
          {
            term: "Review others",
            detail: "Reviewing is how the standard holds — and it is the fastest way to improve your own writing.",
          },
        ]}
      />

      <section className="gutter border-b border-hairline py-14 md:py-20">
        <div className="shell-wide grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <p className="mono-label flex gap-3 text-muted lg:sticky lg:top-28">
              <span className="text-signal-text">02</span>
              <span>The rhythm</span>
            </p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="t-section max-w-[22ch] text-paper">
              What a term actually looks like.
            </h2>
            <p className="t-lead mt-5 max-w-[50ch] text-paper-dim">
              Four recurring commitments. Everything else is you and the work.
            </p>

            <ul className="mt-10 border-t border-hairline">
              {RHYTHM.map((item, i) => (
                <Reveal as="li" key={item.index} delay={i * 0.05}>
                  <div className="grid gap-x-8 gap-y-2.5 border-b border-hairline py-6 md:grid-cols-12 md:items-baseline">
                    <span className="mono-label text-signal-text md:col-span-1">
                      {item.index}
                    </span>
                    <h3 className="t-sub md:col-span-4">{item.title}</h3>
                    <span className="mono-label text-faint md:col-span-2">
                      {item.cadence}
                    </span>
                    <p className="t-body-sm max-w-[46ch] text-muted md:col-span-5">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Prose
        index="03"
        label="Collaboration"
        title="Credit goes to the person who did the work."
        lead="Projects can be solo or shared, decided by what the work needs rather than by who wants to join."
      >
        <p>
          Every contributor is credited by name and by what they actually did —
          fabrication, analysis, firmware, writing.{" "}
          <strong>Vague group authorship helps no one</strong>, least of all the
          person who did the most.
        </p>
      </Prose>

      <Prose
        index="04"
        label="Mentorship"
        title="Small, specific commitments from people who have done it."
        lead="Mentors are researchers, engineers, and graduate students who agree to read a draft, sit in on a review, or unstick a methods question."
      >
        <p>
          The point is not to hand a project to an expert. It is to shorten the
          distance between a student making an avoidable mistake and someone
          telling them so.
        </p>
      </Prose>

      <Prose
        index="05"
        label="Publishing"
        title="Finished work goes into the archive and stays there."
        lead="A project is written up in the Apollo format: abstract, the sections the work calls for, figures with real captions, and links to code, data, or hardware files."
        points={[
          {
            term: "Permanent URL",
            detail: "With an author line and a date.",
          },
          {
            term: "Revisions, not deletions",
            detail: "Updates carry a revision note. Published work is not quietly removed.",
          },
        ]}
      />

      <section className="gutter section">
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12">
              <p className="mono-label text-muted lg:col-span-3 lg:pt-3">
                <span className="text-signal-text">◆</span>
                <span className="ml-3">Join</span>
              </p>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="t-section max-w-[18ch] text-paper">
                  Bring the thing you{" "}
                  <span className="text-paper-dim">never finished.</span>
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
