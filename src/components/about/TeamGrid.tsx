import { TEAM, initials, type Member } from "@/lib/team";
import { Reveal } from "@/components/ui/Reveal";

function MemberRow({ member, index }: { member: Member; index: number }) {
  return (
    <li className="group border-b border-hairline">
      <div className="grid items-baseline gap-x-6 gap-y-2 py-5 sm:grid-cols-12">
        <span className="mono-label text-faint sm:col-span-1">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-4 sm:col-span-4">
          <span
            aria-hidden="true"
            className="mono-label flex size-10 shrink-0 items-center justify-center border border-hairline text-paper-dim transition-colors duration-300 group-hover:border-signal group-hover:text-signal-text"
          >
            {initials(member.name)}
          </span>
          <span className="text-[1.0625rem] font-medium tracking-[-0.01em]">
            {member.name}
          </span>
        </div>
        <span className="mono-label text-signal-text sm:col-span-3">{member.role}</span>
        <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted sm:col-span-4">
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
      className="gutter section scroll-mt-20 border-b border-hairline"
    >
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="mono-label flex gap-3 text-muted lg:col-span-3">
              <span className="text-signal-text">04</span>
              <span>The Team</span>
            </p>
            <div className="lg:col-span-9">
              <h2 className="max-w-[24ch] text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.12] tracking-[-0.025em]">
                Apollo Labs is run by the students who use it.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-8">
          <p className="mono-label text-faint">Founders</p>
          <ul className="mt-5 border-t border-hairline">
            {founders.map((member, i) => (
              <MemberRow key={member.name} member={member} index={i + 1} />
            ))}
          </ul>

          <p className="mono-label mt-10 text-faint">Engineering</p>
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
