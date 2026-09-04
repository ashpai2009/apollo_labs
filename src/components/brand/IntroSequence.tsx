"use client";

import { useEffect } from "react";

const DURATION = 1530;

/**
 * First-visit intro. The decision to play happens in a blocking inline script
 * (see `IntroGate`) so repeat visits never flash the overlay, and the motion
 * itself is pure CSS so it starts at parse time rather than after hydration.
 */
export function IntroSequence() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.apolloIntro !== "play") return;
    const timer = window.setTimeout(() => {
      delete root.dataset.apolloIntro;
    }, DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div id="apollo-intro" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="intro-mark" fill="none">
        <g className="intro-points">
          <circle cx="3.2" cy="14.5" r="0.9" fill="currentColor" />
          <circle cx="16" cy="27.6" r="0.9" fill="currentColor" />
          <circle cx="28.8" cy="21.5" r="0.9" fill="currentColor" />
          <circle cx="9" cy="8.4" r="0.9" fill="currentColor" />
        </g>
        <ellipse
          className="intro-orbit"
          cx="16"
          cy="18"
          rx="13.5"
          ry="6.5"
          transform="rotate(-22 16 18)"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path
          className="intro-a"
          d="M6.6 26.4 L16 5.4 L25.4 26.4"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="square"
        />
        <path
          className="intro-bar"
          d="M11.1 19.6 H20.9"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="square"
        />
        <circle className="intro-node" cx="28.5" cy="12.9" r="2.1" fill="var(--color-signal)" />
      </svg>

      <span className="intro-word">
        <span>Apollo</span>
        <span className="intro-word-dim">Labs</span>
      </span>
    </div>
  );
}

/** Runs before first paint; must stay dependency-free and tiny. */
export function IntroGate() {
  const script =
    "try{if(!sessionStorage.getItem('apollo-intro-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.apolloIntro='play';sessionStorage.setItem('apollo-intro-seen','1')}}catch(e){}";
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
