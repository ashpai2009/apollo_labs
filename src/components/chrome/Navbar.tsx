"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        scrolled || open
          ? "border-b border-hairline bg-void/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell-wide gutter flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          href="/"
          className="rounded-sm transition-opacity duration-200 hover:opacity-80"
          aria-label="Apollo Labs — home"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative py-2 text-[0.8125rem] transition-colors duration-200 ${
                      active ? "text-paper" : "text-paper-dim hover:text-paper"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-signal transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100 ${
                        active ? "origin-left scale-x-100" : ""
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle className="mr-1" />
          <Link
            href="/signin"
            className="link-reveal px-1 text-[0.8125rem] text-paper-dim transition-colors duration-200 hover:text-paper"
          >
            Sign In
          </Link>
          <ButtonLink href="/join" size="sm" className="ml-3">
            Join Apollo
          </ButtonLink>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
        <button
          type="button"
          className="-mr-2 flex size-10 items-center justify-center"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-full bg-paper transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-paper transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
        </div>
      </div>

      {/* Mobile navigation — a full editorial sheet, not a cramped dropdown */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="gutter h-[calc(100dvh-4rem)] overflow-y-auto border-t border-hairline bg-void pb-10 pt-8 md:hidden"
      >
        <ul className="flex flex-col">
          {NAV.map((item, i) => (
            <li key={item.href} className="border-b border-hairline">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5"
              >
                <span
                  className={`text-2xl tracking-[-0.01em] ${
                    isActive(item.href) ? "text-signal-text" : "text-paper"
                  }`}
                >
                  {item.label}
                </span>
                <span className="mono-label text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-3">
          <ButtonLink href="/join" onClick={() => setOpen(false)} className="w-full">
            Join Apollo
          </ButtonLink>
          <ButtonLink
            href="/signin"
            onClick={() => setOpen(false)}
            variant="secondary"
            className="w-full"
          >
            Sign In
          </ButtonLink>
        </div>
        <p className="mono-label mt-12 text-faint">
          Apollo Labs · Student-Led Research
        </p>
      </div>
    </header>
  );
}
