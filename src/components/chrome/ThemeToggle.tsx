"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "apollo-theme";

/** The document element is the source of truth; the store follows it. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const getServerSnapshot = (): Theme => "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice simply will not persist */
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "light"}
      className={`flex size-9 items-center justify-center border border-transparent text-muted transition-colors duration-200 hover:border-hairline hover:text-paper ${className ?? ""}`}
    >
      <span className="sr-only">
        Switch to {theme === "dark" ? "light" : "dark"} theme
      </span>
      {/* A single mark with a terminator line — the fill flips with the theme. */}
      <svg viewBox="0 0 20 20" className="size-[1.05rem]" aria-hidden="true" fill="none">
        <circle cx="10" cy="10" r="5.6" stroke="currentColor" strokeWidth="1.3" />
        <path
          d={
            theme === "dark"
              ? "M10 4.4a5.6 5.6 0 0 0 0 11.2Z"
              : "M10 4.4a5.6 5.6 0 0 1 0 11.2Z"
          }
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

/** Runs before first paint so the stored theme never flashes. */
export function ThemeGate() {
  const script = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
