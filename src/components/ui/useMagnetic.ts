"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * A very small magnetic pull toward the cursor — a few pixels at most.
 * Writes transforms directly rather than through state, and stays inert for
 * touch input and reduced-motion users.
 */
export function useMagnetic<T extends HTMLElement>(strength = 4) {
  const ref = useRef<T>(null);

  const enabled = useCallback(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const el = ref.current;
      if (!el || !enabled()) return;
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      el.style.transform = `translate3d(${(dx * strength).toFixed(2)}px, ${(dy * strength * 0.6).toFixed(2)}px, 0)`;
    },
    [enabled, strength],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  /** Spread onto the element: `<button {...useMagnetic()} />` */
  return { ref, onPointerMove, onPointerLeave };
}
