import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/explore", label: "Explore" },
      { href: "/#work", label: "Selected Work" },
      { href: "/#disciplines", label: "Disciplines" },
    ],
  },
  {
    title: "Organization",
    links: [
      { href: "/about", label: "About" },
      { href: "/community", label: "Community" },
      { href: "/#process", label: "How Apollo Works" },
    ],
  },
  {
    title: "Participate",
    links: [
      { href: "/join", label: "Join Apollo" },
      { href: "/signin", label: "Sign In" },
      { href: "/community", label: "Publish Your Work" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="shell-wide gutter py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo size={32} />
              <span className="flex items-baseline gap-[0.45em] text-sm font-medium uppercase leading-none tracking-[0.2em]">
                <span className="text-paper">Apollo</span>
                <span className="text-muted">Labs</span>
              </span>
            </Link>
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-muted">
              A student-led research community. We help students turn curiosity
              into finished, published work — and give that work somewhere
              permanent to live.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mono-label text-faint">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="link-reveal text-[0.875rem] text-paper-dim transition-colors duration-200 hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-faint">
            Apollo Labs · Est. 2026 · Student-Led Research
          </p>
          <p className="mono-label text-faint">
            <span className="text-signal">◆</span> Prototype build 0.1
          </p>
        </div>
      </div>
    </footer>
  );
}
