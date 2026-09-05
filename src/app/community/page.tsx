import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Community",
  description:
    "What membership looks like at Apollo Labs: how projects develop, how review works, mentorship, meetings, and how work gets published.",
};

const SECTIONS = [
  {
    index: "01",
    label: "Membership",
    href: "#membership",
    detail: "How to start",
  },
  {
    index: "02",
    label: "Rhythm",
    href: "#rhythm",
    detail: "When we meet",
  },
  {
    index: "03",
    label: "Collaboration",
    href: "#collaboration",
    detail: "How credit works",
  },
  {
    index: "04",
    label: "Mentorship",
    href: "#mentorship",
    detail: "Who helps",
  },
  {
    index: "05",
    label: "Publishing",
    href: "#publishing",
    detail: "What ships",
  },
];

const EXPECTATIONS = [
  {
    term: "Finish what you start",
    detail: "Scope a term, not a career. A small finished project beats a giant abandoned one.",
  },
  {
    term: "Narrow, don't abandon",
    detail: "When the project grows, cut the question down until the work becomes finishable again.",
  },
  {
    term: "Review other work",
    detail: "Review holds the standard and is the fastest way to improve your own research writing.",
  },
];

const RHYTHM = [
  {
    index: "01",
    title: "Open studio",
    cadence: "Weekly",
    body: "Work beside other members and solve useful questions before they become a week of lost effort.",
  },
  {
    index: "02",
    title: "Project review",
    cadence: "Biweekly",
    body: "One member presents work in progress. The group pushes on scope, method, and evidence.",
  },
  {
    index: "03",
    title: "Mentor sessions",
    cadence: "Monthly",
    body: "Focused time with someone who has done the work professionally, scheduled around project needs.",
  },
  {
    index: "04",
    title: "Publication review",
    cadence: "As needed",
    body: "A dedicated reading of a finished draft. The reviewer is credited on the published project.",
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
        lede="Apollo runs on people showing up and doing the work in view of each other. This page is the map: how to begin, where feedback happens, and how a project reaches the archive."
        aside={
          <nav
            aria-label="Community sections"
            className="mt-14 border-y border-hairline bg-surface/35 md:mt-18"
          >
            <ul className="grid sm:grid-cols-2 lg:grid-cols-5">
              {SECTIONS.map((section) => (
                <li
                  key={section.href}
                  className="border-b border-hairline last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <Link
                    href={section.href}
                    className="group flex min-h-28 flex-col justify-between gap-6 p-5 transition-colors duration-300 hover:bg-paper/[0.035] md:min-h-32 md:p-6"
                  >
                    <span className="mono-label text-signal-text">{section.index}</span>
                    <span>
                      <span className="block text-sm font-medium text-paper">
                        {section.label}
                      </span>
                      <span className="mt-1 block text-xs text-faint">
                        {section.detail}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <section
        id="membership"
        className="gutter scroll-mt-20 border-b border-hairline py-20 md:py-28"
      >
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="mono-label flex gap-3 text-muted">
                  <span className="text-signal-text">01</span>
                  <span>Membership</span>
                </p>
                <h2 className="t-section mt-6 max-w-[15ch] text-paper">
                  You join by starting a project, not by applying.
                </h2>
                <p className="t-body mt-6 max-w-[40ch] text-paper-dim">
                  There is no application essay and no selection round. Begin the
                  work where other members can see it, question it, and help it move.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
                {EXPECTATIONS.map((item, index) => (
                  <article
                    key={item.term}
                    className="flex min-h-64 flex-col border border-hairline bg-card p-6 transition-colors duration-300 hover:border-hairline-strong hover:bg-card-hover"
                  >
                    <span className="mono-label text-signal-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="t-sub mt-10 text-paper">{item.term}</h3>
                    <p className="t-body-sm mt-4 text-paper-dim">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="rhythm"
        className="gutter scroll-mt-20 border-b border-hairline bg-surface/35 py-20 md:py-28"
      >
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="mono-label flex gap-3 text-muted">
                  <span className="text-signal-text">02</span>
                  <span>The rhythm</span>
                </p>
                <h2 className="t-section mt-6 max-w-[14ch] text-paper">
                  Four commitments keep a term moving.
                </h2>
              </div>
              <p className="t-lead max-w-[40ch] text-paper-dim lg:col-span-6 lg:col-start-7 lg:mt-11">
                A predictable cadence makes it easier to ask for help early and
                harder for good work to disappear in private folders.
              </p>
            </div>
          </Reveal>

          <ol className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-4">
            {RHYTHM.map((item, index) => (
              <Reveal as="li" key={item.index} delay={index * 0.05}>
                <article className="flex h-full min-h-72 flex-col bg-base p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="mono-label text-signal-text">{item.index}</span>
                    <span className="mono-label border border-hairline px-2.5 py-1.5 text-faint">
                      {item.cadence}
                    </span>
                  </div>
                  <h3 className="t-sub mt-12 text-paper">{item.title}</h3>
                  <p className="t-body-sm mt-4 text-paper-dim">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="gutter border-b border-hairline py-20 md:py-28">
        <div className="shell-wide grid gap-5 lg:grid-cols-2">
          <Reveal as="section">
            <article
              id="collaboration"
              className="flex h-full scroll-mt-20 flex-col border border-hairline bg-card p-7 md:p-10"
            >
              <p className="mono-label flex gap-3 text-muted">
                <span className="text-signal-text">03</span>
                <span>Collaboration</span>
              </p>
              <h2 className="t-section mt-8 max-w-[14ch] text-paper">
                Credit goes to the person who did the work.
              </h2>
              <p className="t-lead mt-6 max-w-[39ch] text-paper-dim">
                Projects can be solo or shared. The work decides the team—not the
                other way around.
              </p>
              <p className="t-body mt-8 max-w-[52ch] text-muted">
                Every contributor is credited by name and by what they actually did:
                fabrication, analysis, firmware, writing, or review. Vague group
                authorship helps no one.
              </p>
            </article>
          </Reveal>

          <Reveal as="section" delay={0.06}>
            <article
              id="mentorship"
              className="flex h-full scroll-mt-20 flex-col border border-hairline bg-surface/55 p-7 md:p-10"
            >
              <p className="mono-label flex gap-3 text-muted">
                <span className="text-signal-text">04</span>
                <span>Mentorship</span>
              </p>
              <h2 className="t-section mt-8 max-w-[15ch] text-paper">
                Small commitments from people who have done it.
              </h2>
              <p className="t-lead mt-6 max-w-[40ch] text-paper-dim">
                Mentors read a draft, sit in on a review, or unstick one specific
                methods question.
              </p>
              <p className="t-body mt-8 max-w-[52ch] text-muted">
                The goal is not to hand a project to an expert. It is to shorten
                the distance between an avoidable mistake and useful, timely advice.
              </p>
            </article>
          </Reveal>
        </div>
      </div>

      <section
        id="publishing"
        className="gutter scroll-mt-20 border-b border-hairline py-20 md:py-28"
      >
        <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="mono-label flex gap-3 text-muted">
              <span className="text-signal-text">05</span>
              <span>Publishing</span>
            </p>
            <h2 className="t-section mt-6 max-w-[15ch] text-paper">
              Finished work goes into the archive and stays there.
            </h2>
            <p className="t-lead mt-6 max-w-[42ch] text-paper-dim">
              Every project gets a permanent page with the context needed to
              understand, reproduce, and build on it.
            </p>
            <div className="mt-10">
              <ButtonLink href="/explore" size="lg" className="group">
                Browse the Archive <Arrow />
              </ButtonLink>
            </div>
          </Reveal>

          <dl className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:col-span-6">
            {[
              ["Permanent URL", "A stable author line, date, and home for the complete project."],
              ["Real methods", "Enough detail for someone else to understand how the work was done."],
              ["Named review", "The member who reviewed the project is credited beside its authors."],
              ["Visible revisions", "Updates carry revision notes. Published work is not quietly replaced."],
            ].map(([term, detail]) => (
              <div key={term} className="min-h-48 bg-base p-6 md:p-7">
                <dt className="t-sub text-paper">{term}</dt>
                <dd className="t-body-sm mt-4 text-paper-dim">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="gutter section-lg">
        <div className="shell-wide grid gap-5 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col border border-hairline bg-surface/45 p-7 md:p-10">
              <p className="mono-label text-muted">
                <span className="text-signal-text">◆</span>
                <span className="ml-3">The people</span>
              </p>
              <h2 className="t-section mt-6 max-w-[14ch] text-paper">
                Know who is responsible for the work.
              </h2>
              <p className="t-body mt-5 max-w-[42ch] text-paper-dim">
                The team now has its own directory, organized by role and focus.
              </p>
              <div className="mt-10">
                <ButtonLink href="/team" size="lg" className="group">
                  Meet the Team <Arrow />
                </ButtonLink>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <article className="flex h-full flex-col border border-signal/35 bg-signal/[0.055] p-7 md:p-10">
              <p className="mono-label text-muted">
                <span className="text-signal-text">◆</span>
                <span className="ml-3">Start here</span>
              </p>
              <h2 className="t-section mt-6 max-w-[14ch] text-paper">
                Bring the thing you never finished.
              </h2>
              <p className="t-body mt-5 max-w-[42ch] text-paper-dim">
                Join with an interest or a rough idea. We will help turn it into a
                project with a real end.
              </p>
              <div className="mt-10">
                <ButtonLink href="/join" size="lg" className="group">
                  Join Apollo <Arrow />
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
