"use client";

import { useEffect, useRef } from "react";

type Node = {
  ring: number;
  angle: number;
  speed: number;
  radius: number;
  accent: boolean;
};

const RINGS = [
  { rx: 0.46, ry: 0.2, tilt: -0.34 },
  { rx: 0.34, ry: 0.32, tilt: 0.42 },
  { rx: 0.42, ry: 0.14, tilt: 0.16 },
];

/**
 * Scientific-visualization hero: ~36 nodes on three inclined orbits with
 * proximity linking. One rAF loop, paused offscreen, static when reduced.
 */
export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let accent = "#e4572e";

    let seed = 20260418;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const nodes: Node[] = Array.from({ length: 36 }, (_, i) => ({
      ring: i % RINGS.length,
      angle: rand() * Math.PI * 2,
      speed: (0.00006 + rand() * 0.00009) * (i % 2 ? 1 : -1),
      radius: 0.9 + rand() * 1.7,
      accent: i === 5 || i === 22,
    }));

    // Ink is read from CSS so the visual follows the active theme.
    let ink = "236,232,225";
    let alpha = 1;
    const readInk = () => {
      const parsed = getComputedStyle(canvas)
        .color.match(/-?\d+(\.\d+)?/g)
        ?.slice(0, 3);
      if (parsed) ink = parsed.map((n) => Math.round(Number(n))).join(",");
      accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--apollo-signal")
          .trim() || accent;
      alpha =
        document.documentElement.dataset.theme === "light" ? 1.9 : 1;
    };

    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let frame = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readInk();
    };

    const positionOf = (node: Node, t: number) => {
      const ring = RINGS[node.ring];
      const a = node.angle + t * node.speed;
      const rx = ring.rx * Math.min(width, height * 1.5);
      const ry = ring.ry * Math.min(width, height * 1.5);
      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;
      const cos = Math.cos(ring.tilt);
      const sin = Math.sin(ring.tilt);
      return {
        x: width / 2 + (x * cos - y * sin) + parallaxX,
        y: height / 2 + (x * sin + y * cos) + parallaxY,
      };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      parallaxX += (pointerX * 10 - parallaxX) * 0.045;
      parallaxY += (pointerY * 8 - parallaxY) * 0.045;

      // Orbit paths
      ctx.lineWidth = 1;
      for (const ring of RINGS) {
        ctx.beginPath();
        ctx.ellipse(
          width / 2 + parallaxX * 0.6,
          height / 2 + parallaxY * 0.6,
          ring.rx * Math.min(width, height * 1.5),
          ring.ry * Math.min(width, height * 1.5),
          ring.tilt,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = `rgba(${ink},${0.09 * alpha})`;
        ctx.stroke();
      }

      const points = nodes.map((n) => positionOf(n, t));

      // Proximity links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 96) {
            ctx.strokeStyle = `rgba(${ink},${(1 - d / 96) * 0.16 * alpha})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      points.forEach((p, i) => {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, node.accent ? 3.2 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.accent
          ? accent
          : `rgba(${ink},${Math.min(1, (0.34 + node.radius * 0.16) * alpha)})`;
        ctx.fill();
      });
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    resize();

    if (reduced) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    window.addEventListener("resize", onResize);

    const onPointer = (event: PointerEvent) => {
      if (reduced) return;
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    // Stop the loop whenever the visual leaves the viewport.
    const themeObserver = new MutationObserver(() => {
      readInk();
      draw(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="size-full"
    />
  );
}
