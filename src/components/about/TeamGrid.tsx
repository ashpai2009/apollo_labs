import { TEAM, initials, type Member } from "@/lib/team";
import { Reveal } from "@/components/ui/Reveal";

function MemberRow({ member, index }: { member: Member; index: number }) {
  return (
    <li className="group border-b border-hairline">
      <div className="grid items-baseline gap-x-10 gap-y-3 py-7 sm:grid-cols-12">
        <span className="mono-label text-faint sm:col-span-1">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-5 sm:col-span-4">
          <span
            aria-hidden="true"
            className="mono-label flex size-12 shrink-0 items-center justify-center border border-hairline text-paper-dim transition-colors duration-300 group-hover:border-signal group-hover:text-signal-text"
          >
            {initials(member.name)}
          </span>
          <span className="t-sub">{member.name}</span>
        </div>
        <span className="mono-label text-faint sm:col-span-3">{member.role}</span>
        <p className="t-body-sm max-w-[48ch] text-muted sm:col-span-4">
          {member.focus}
        </p>
      </div>
    </li>
  );
}

export function TeamGrid() {
  const founders = TEAM.filter((m) => m.group === "Founders");
  const engineering = TEAM.filter((m) => m.group === "Engineering");

  return (
    <section
      id="team"
      className="gutter section-lg scroll-mt-20 border-b border-hairline"
    >
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mono-label flex gap-3 text-muted">
                <span className="text-signal-text">04</span>
                <span>The Team</span>
              </p>
              <h2 className="t-section mt-6 max-w-[15ch] text-paper">
                Apollo Labs is run by the students who use it.
              </h2>
            </div>
            <p className="t-lead max-w-[40ch] text-paper-dim lg:col-span-6 lg:col-start-7 lg:mt-11">
              Everyone below is publishing through Apollo, not just
              administering it.
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          <h3 className="mono-label text-signal-text">Founders</h3>
          <ul className="mt-5 border-t border-hairline">
            {founders.map((member, i) => (
              <MemberRow key={member.name} member={member} index={i + 1} />
            ))}
          </ul>

          <h3 className="mono-label mt-14 text-signal-text">Engineering</h3>
          <ul className="mt-5 border-t border-hairline">
            {engineering.map((member, i) => (
              <MemberRow
                key={member.name}
                member={member}
                index={founders.length + i + 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
