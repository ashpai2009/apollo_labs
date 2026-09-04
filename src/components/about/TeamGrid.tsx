import { TEAM, initials, type Member } from "@/lib/team";
import { Reveal } from "@/components/ui/Reveal";

function MemberRow({ member, index }: { member: Member; index: number }) {
  return (
    <li className="group border-b border-hairline">
      <div className="grid items-baseline gap-x-6 gap-y-3 py-7 sm:grid-cols-12">
        <span className="mono-label text-faint sm:col-span-1">
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-4 sm:col-span-4">
          <span
            aria-hidden="true"
            className="mono-label flex size-10 shrink-0 items-center justify-center border border-hairline text-paper-dim transition-colors duration-300 group-hover:border-signal group-hover:text-signal"
          >
            {initials(member.name)}
          </span>
          <span className="font-serif text-[1.35rem] leading-tight">
            {member.name}
          </span>
        </div>
        <span className="mono-label text-signal sm:col-span-3">{member.role}</span>
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
      className="gutter scroll-mt-24 border-b border-hairline py-20 md:py-28"
    >
      <div className="shell-wide">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="mono-label flex gap-3 text-muted lg:col-span-3">
              <span className="text-signal">04</span>
              <span>The Team</span>
            </p>
            <div className="lg:col-span-9">
              <h2 className="max-w-[18ch] text-[clamp(1.8rem,3.4vw,2.7rem)] font-normal leading-[1.08] tracking-[-0.02em]">
                Apollo Labs is run by the students who use it.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          <p className="mono-label text-faint">Founders</p>
          <ul className="mt-5 border-t border-hairline">
            {founders.map((member, i) => (
              <MemberRow key={member.name} member={member} index={i + 1} />
            ))}
          </ul>

          <p className="mono-label mt-14 text-faint">Engineering</p>
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
