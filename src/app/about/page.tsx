import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/ui/PageHeader";
import { TeamGrid } from "@/components/about/TeamGrid";
import { ButtonLink, Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Apollo Labs exists, how students participate, how work gets reviewed and published, and who runs it.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="01"
        eyebrow="About"
        title={
          <>
            A place for student work to be{" "}
            <span className="font-serif italic">finished, not just started.</span>
          </>
        }
        lede="Apollo Labs is a student-led research community. We help members take a project from a rough idea through to something written up, reviewed, and permanently published — and we keep the archive that holds it."
      />

      <Prose index="01" heading="Mission">
        <p>
          Most student work disappears. It lives in a shared drive, gets shown
          once, and is never read again. The effort was real; the record of it
          was not.
        </p>
        <p>
          <strong>
            Apollo Labs exists to give serious student work somewhere permanent
            to live, and a standard worth meeting on the way there.
          </strong>{" "}
          That means two commitments. Projects get finished — scoped so they can
          end, and reviewed before they publish. And once published, they stay:
          a citable page with an author, a date, and the reasoning intact.
        </p>
        <p>
          We are deliberately not a showcase for polished summaries. A project
          page carries the methodology and the results that did not work
          alongside the ones that did, because that is what makes it useful to
          the next person.
        </p>
      </Prose>

      <Prose index="02" heading="Why we exist">
        <p>
          Students who want to do research usually hit the same three walls:
          they cannot tell whether an idea is the right size, they have no one
          to check the work who is not grading it, and there is nowhere credible
          to put the result.
        </p>
        <p>
          Apollo addresses each one directly. Scoping happens in conversation
          with people who have finished projects before. Review happens in the
          open, from other members, before anything is published. And the
          archive gives the finished work a permanent home that is not a
          slideshow or a folder.
        </p>
        <p>
          We take applied and engineering work as seriously as papers. A
          well-documented build with real testing is a research contribution,
          and the publication format is designed to hold both.
        </p>
      </Prose>

      <Prose index="03" heading="How students participate">
        <p>
          Members join with an interest, not a finished proposal. The first step
          is usually a conversation that turns a broad curiosity into a question
          narrow enough to answer in a term.
        </p>
        <p>
          From there, work runs in the open. Members share progress, get
          feedback while decisions are still reversible, and pull in mentors when
          a project needs expertise the group does not have. Projects can be
          solo or collaborative; both are common.
        </p>
        <p>
          Nothing publishes without review. A member reads the draft, checks the
          claims against what the work actually shows, and sends it back if the
          two do not match. The reviewer is credited on the project.
        </p>
      </Prose>

      <TeamGrid />

      <section className="gutter py-24 md:py-32">
        <div className="shell-wide">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12">
              <p className="mono-label text-muted lg:col-span-3 lg:pt-3">
                <span className="text-signal">◆</span>
                <span className="ml-3">Next</span>
              </p>
              <div className="lg:col-span-8 lg:col-start-4">
                <h2 className="max-w-[16ch] text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.06] tracking-[-0.025em]">
                  See what members have{" "}
                  <span className="font-serif italic">already published.</span>
                </h2>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/explore" className="group">
                    Browse the Archive <Arrow />
                  </ButtonLink>
                  <ButtonLink href="/community" variant="secondary">
                    How Membership Works
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
