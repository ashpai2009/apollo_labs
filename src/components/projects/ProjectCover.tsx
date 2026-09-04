import type { CoverVariant } from "@/lib/types";

const W = 800;
const H = 600;

/** Deterministic PRNG so server and client render identical artwork. */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Trig differs in the last float digit between Node and the browser; fixing
 *  precision keeps server and client markup byte-identical. */
const q = (n: number) => Math.round(n * 100) / 100;

const LINE = "rgba(236,232,225,0.34)";
const LINE_SOFT = "rgba(236,232,225,0.19)";
const DOT = "rgba(236,232,225,0.55)";
const SIGNAL = "#e4572e";

/* ── Artificial Intelligence: node/link network ─────────────── */
function Network(seed: string) {
  const r = rng(seed);
  const nodes = Array.from({ length: 76 }, () => ({
    x: q(28 + r() * (W - 56)),
    y: q(24 + r() * (H - 48)),
    s: q(1.1 + r() * 2),
  }));
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 88) edges.push([i, j]);
    }
  }
  const hub = Math.floor(r() * nodes.length);
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={LINE_SOFT}
          strokeWidth="0.7"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === hub ? 5 : n.s}
          fill={i === hub ? SIGNAL : DOT}
        />
      ))}
      {i0(nodes[hub], nodes)}
    </g>
  );
}

function i0(hub: { x: number; y: number }, nodes: { x: number; y: number }[]) {
  return (
    <g>
      {nodes
        .filter((n) => Math.hypot(n.x - hub.x, n.y - hub.y) < 130)
        .map((n, i) => (
          <line
            key={i}
            x1={hub.x}
            y1={hub.y}
            x2={n.x}
            y2={n.y}
            stroke="rgba(228,87,46,0.35)"
            strokeWidth="0.7"
          />
        ))}
    </g>
  );
}

/* ── Computer Science: recursive subdivision ────────────────── */
function Lattice(seed: string) {
  const r = rng(seed);
  const rects: { x: number; y: number; w: number; h: number; d: number }[] = [];
  const split = (x: number, y: number, w: number, h: number, d: number) => {
    if (d > 5 || (w < 74 && h < 74) || (d > 2 && r() < 0.22)) {
      rects.push({ x, y, w, h, d });
      return;
    }
    if (w > h) {
      const cut = q(w * (0.34 + r() * 0.32));
      split(x, y, cut, h, d + 1);
      split(x + cut, y, w - cut, h, d + 1);
    } else {
      const cut = q(h * (0.34 + r() * 0.32));
      split(x, y, w, cut, d + 1);
      split(x, y + cut, w, h - cut, d + 1);
    }
  };
  split(34, 30, W - 68, H - 60, 0);
  const accent = Math.floor(r() * rects.length);
  return (
    <g>
      {rects.map((rc, i) => (
        <g key={i}>
          <rect
            x={rc.x}
            y={rc.y}
            width={rc.w}
            height={rc.h}
            fill={i === accent ? "rgba(228,87,46,0.14)" : "none"}
            stroke={i === accent ? SIGNAL : LINE_SOFT}
            strokeWidth={i === accent ? 1.3 : 0.8}
          />
          {rc.d >= 4 && (
            <line
              x1={rc.x}
              y1={rc.y}
              x2={rc.x + rc.w}
              y2={rc.y + rc.h}
              stroke={LINE_SOFT}
              strokeWidth="0.6"
            />
          )}
        </g>
      ))}
    </g>
  );
}

/* ── Engineering / Robotics: orthographic blueprint ─────────── */
function Blueprint(seed: string) {
  const r = rng(seed);
  const cx = q(W * (0.42 + r() * 0.1));
  const cy = H * 0.5;
  const base = q(104 + r() * 44);
  const sideRect = r() > 0.5;
  const spokes = 6 + Math.floor(r() * 5);
  return (
    <g>
      {Array.from({ length: 17 }, (_, i) => (
        <line key={`v${i}`} x1={40 + i * 45} y1={28} x2={40 + i * 45} y2={H - 28} stroke="rgba(236,232,225,0.06)" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={`h${i}`} x1={28} y1={44 + i * 52} x2={W - 28} y2={44 + i * 52} stroke="rgba(236,232,225,0.06)" strokeWidth="0.5" />
      ))}
      <circle cx={cx} cy={cy} r={base} stroke={LINE} strokeWidth="1" fill="none" />
      <circle cx={cx} cy={cy} r={q(base * 0.62)} stroke={LINE_SOFT} strokeWidth="0.8" fill="none" />
      <circle cx={cx} cy={cy} r={q(base * 0.24)} stroke={LINE} strokeWidth="1" fill="none" />
      {sideRect && (
        <rect
          x={q(cx + base + 40)}
          y={q(cy - base * 0.7)}
          width={q(base * 1.2)}
          height={q(base * 1.4)}
          stroke={LINE_SOFT}
          strokeWidth="0.8"
          fill="none"
        />
      )}
      {!sideRect && (
        <g>
          <circle cx={q(cx + base + 96)} cy={q(cy - base * 0.35)} r={q(base * 0.42)} stroke={LINE_SOFT} strokeWidth="0.8" fill="none" />
          <line x1={q(cx + base + 40)} y1={q(cy + base * 0.6)} x2={q(cx + base + 152)} y2={q(cy + base * 0.6)} stroke={LINE_SOFT} strokeWidth="0.8" />
          <line x1={q(cx + base + 40)} y1={q(cy + base * 0.6)} x2={q(cx + base + 40)} y2={q(cy - base * 0.35)} stroke={LINE_SOFT} strokeWidth="0.8" />
        </g>
      )}
      <line x1={q(cx - base - 46)} y1={cy} x2={q(cx + base + 46)} y2={cy} stroke={LINE_SOFT} strokeWidth="0.6" strokeDasharray="12 6 3 6" />
      <line x1={cx} y1={q(cy - base - 44)} x2={cx} y2={q(cy + base + 44)} stroke={LINE_SOFT} strokeWidth="0.6" strokeDasharray="12 6 3 6" />
      {Array.from({ length: spokes }, (_, i) => {
        const a = (i / spokes) * Math.PI * 2 + r() * 0.4;
        return (
          <line
            key={i}
            x1={q(cx + Math.cos(a) * base * 0.24)}
            y1={q(cy + Math.sin(a) * base * 0.24)}
            x2={q(cx + Math.cos(a) * base)}
            y2={q(cy + Math.sin(a) * base)}
            stroke={LINE_SOFT}
            strokeWidth="0.8"
          />
        );
      })}
      <line x1={q(cx - base)} y1={q(cy + base + 52)} x2={q(cx + base)} y2={q(cy + base + 52)} stroke={SIGNAL} strokeWidth="0.9" />
      <line x1={q(cx - base)} y1={q(cy + base + 45)} x2={q(cx - base)} y2={q(cy + base + 59)} stroke={SIGNAL} strokeWidth="0.9" />
      <line x1={q(cx + base)} y1={q(cy + base + 45)} x2={q(cx + base)} y2={q(cy + base + 59)} stroke={SIGNAL} strokeWidth="0.9" />
    </g>
  );
}

/* ── Biology / Environment: topographic contours ────────────── */
function Contour(seed: string) {
  const r = rng(seed);
  const cx = q(W * (0.36 + r() * 0.28));
  const cy = q(H * (0.4 + r() * 0.2));
  const phase = q(r() * Math.PI * 2);
  const k1 = 2 + Math.floor(r() * 3);
  const k2 = 4 + Math.floor(r() * 4);
  const ring = (scale: number) => {
    const pts: string[] = [];
    for (let a = 0; a <= 360; a += 3) {
      const t = (a * Math.PI) / 180;
      const rad =
        scale *
        (1 + 0.16 * Math.sin(k1 * t + phase) + 0.09 * Math.sin(k2 * t - phase));
      pts.push(`${(cx + Math.cos(t) * rad * 1.35).toFixed(1)},${(cy + Math.sin(t) * rad * 0.82).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const rings = Array.from({ length: 17 }, (_, i) => 26 + i * 15);
  return (
    <g>
      {rings.map((s, i) => (
        <polyline
          key={i}
          points={ring(s)}
          fill="none"
          stroke={i === 2 ? SIGNAL : LINE_SOFT}
          strokeWidth={i === 2 ? 1.4 : 0.8}
          opacity={i === 2 ? 0.85 : 1}
        />
      ))}
      <circle cx={cx} cy={cy} r="4" fill={SIGNAL} />
    </g>
  );
}

/* ── Mathematics: parametric curve family ───────────────────── */
function Curves(seed: string) {
  const r = rng(seed);
  const a = 2 + Math.floor(r() * 2);
  const b = 3 + Math.floor(r() * 3);
  const lines = Array.from({ length: 9 }, (_, i) => {
    const shift = (i / 9) * Math.PI * 0.55;
    const pts: string[] = [];
    for (let t = 0; t <= 1.0001; t += 0.006) {
      const u = t * Math.PI * 2;
      const x = W / 2 + Math.sin(a * u + shift) * (W * 0.4);
      const y = H / 2 + Math.sin(b * u) * (H * 0.34) * (1 - i / 22);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  });
  return (
    <g>
      <line x1={34} y1={H / 2} x2={W - 34} y2={H / 2} stroke="rgba(236,232,225,0.08)" strokeWidth="0.7" />
      <line x1={W / 2} y1={28} x2={W / 2} y2={H - 28} stroke="rgba(236,232,225,0.08)" strokeWidth="0.7" />
      {lines.map((p, i) => (
        <polyline
          key={i}
          points={p}
          fill="none"
          stroke={LINE_SOFT}
          strokeWidth="0.8"
          opacity={0.85 - i / 16}
        />
      ))}
      <circle cx={W / 2} cy={H / 2} r="5" fill={SIGNAL} />
      <line x1={W / 2 - 34} y1={H / 2} x2={W / 2 + 34} y2={H / 2} stroke={SIGNAL} strokeWidth="1.2" opacity="0.7" />
    </g>
  );
}

const RENDERERS: Record<CoverVariant, (seed: string) => React.ReactNode> = {
  network: Network,
  lattice: Lattice,
  blueprint: Blueprint,
  contour: Contour,
  curves: Curves,
};

export function ProjectCover({
  variant,
  seed,
  className,
  label,
}: {
  variant: CoverVariant;
  seed: string;
  className?: string;
  /** Screen-reader description; omit for decorative use alongside a title. */
  label?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`size-full ${className ?? ""}`}
      role={label ? "img" : "presentation"}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <defs>
        <linearGradient id={`cv-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16161a" />
          <stop offset="100%" stopColor="#0d0d0f" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#cv-${seed})`} />
      {RENDERERS[variant](seed)}
    </svg>
  );
}
