import { Arrow } from "@/components/ui/Button";
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About Apollo Labs", body: "Why it exists, how work gets reviewed, and who runs it." },
  { href: "/community", label: "Membership", body: "The weekly rhythm, mentorship, and how projects develop." },
];

export function CommunitySection() {
  return (
    <section className="gutter section">
      <div className="shell-wide grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-6">
          <p className="mono-label text-signal-text">The Organization</p>
          <h2 className="t-section mt-5 max-w-[16ch] text-paper">
            Built and run by students.
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-paper-dim">
            Everyone running Apollo is also publishing through it — small enough
            that scoping a project, getting a draft read, and finding a mentor
            all happen in the same room.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full flex-col gap-1.5 border border-hairline bg-card p-6 transition-colors duration-200 hover:border-hairline-strong"
              >
                <span className="t-body-sm flex items-center gap-2 font-medium">
                  {link.label}
                  <span className="text-signal-text">
                    <Arrow />
                  </span>
                </span>
                <span className="t-meta text-muted">
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
