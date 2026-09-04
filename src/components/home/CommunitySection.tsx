import { Arrow } from "@/components/ui/Button";
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About Apollo Labs", body: "Why it exists, how work gets reviewed, and who runs it." },
  { href: "/community", label: "Membership", body: "The weekly rhythm, mentorship, and how projects develop." },
];

export function CommunitySection() {
  return (
    <section className="gutter section">
      <div className="shell-wide grid gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
        <div>
          <h2 className="mono-label text-signal-text">The Organization</h2>
          <p className="mt-4 max-w-[58ch] text-[1.0625rem] leading-[1.6] text-paper">
            Apollo is run by students who are also publishing through it —
            deliberately small enough that scoping a project, getting a draft
            read, and finding a mentor all happen in the same room.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 md:w-[27rem]">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full flex-col gap-1.5 border border-hairline bg-card p-4 transition-colors duration-200 hover:border-hairline-strong"
              >
                <span className="flex items-center gap-2 text-[0.9375rem] font-medium">
                  {link.label}
                  <span className="text-signal-text">
                    <Arrow />
                  </span>
                </span>
                <span className="text-[0.8125rem] leading-relaxed text-muted">
                  {link.body}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
