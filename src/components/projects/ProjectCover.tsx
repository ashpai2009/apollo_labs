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

const q = (n: number) => Math.round(n * 100) / 100;
const SIGNAL = "var(--apollo-signal)";

/**
 * Cover artwork is built from filled shapes rather than hairlines: each
 * discipline gets its own composition with real visual mass, so a wall of
 * cards does not read as one repeated wireframe. Tones come from CSS so both
 * themes work, and any project carrying `coverImageUrl` skips generation
 * entirely — that is the hook for uploaded images later.
 */

/* ── Artificial Intelligence: model activation matrix ────────── */
function Matrix(seed: string) {
  const r = rng(seed);
  const cols = 30;
  const rows = 22;
  // Two deliberate accents, chosen up front — a threshold would scatter them.
  const accentA = Math.floor(r() * cols * rows);
  const accentB = Math.floor(r() * cols * rows);
  const cw = W / cols;
  const ch = H / rows;
  const cells: React.ReactNode[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = r();
      // A diagonal band of high activation keeps it from looking like noise.
      const band = 1 - Math.abs((x / cols) * 0.85 + 0.1 - y / rows);
      const weight = v * 0.4 + band * 0.6;
      if (weight < 0.3) continue;
      const index = y * cols + x;
      const accent = index === accentA || index === accentB;
      cells.push(
        <rect
          key={`${x}-${y}`}
          x={q(x * cw + 1.5)}
          y={q(y * ch + 1.5)}
          width={q(cw - 3)}
          height={q(ch - 3)}
          fill={accent ? SIGNAL : "currentColor"}
          fillOpacity={accent ? 1 : q(0.04 + Math.pow(weight, 1.6) * 0.6)}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}

/* ── Computer Science: interface / code composition ──────────── */
function Interface(seed: string) {
  const r = rng(seed);
  const lines: React.ReactNode[] = [];
  let y = 108;
  let row = 0;
  while (y < H - 60) {
    const indent = 60 + Math.floor(r() * 3) * 46;
    const width = 120 + r() * (W - indent - 200);
    const accent = row === 3 || row === 11;
    lines.push(
      <rect
        key={row}
        x={q(indent)}
        y={q(y)}
        width={q(width)}
        height={11}
        rx={2}
        fill={accent ? SIGNAL : "currentColor"}
        fillOpacity={accent ? 0.95 : q(0.16 + r() * 0.3)}
      />,
    );
    y += 24;
    row += 1;
  }
  return (
    <g>
      <rect x="0" y="0" width={W} height="74" fill="currentColor" fillOpacity="0.1" />
      <circle cx="42" cy="37" r="8" fill="currentColor" fillOpacity="0.3" />
      <circle cx="70" cy="37" r="8" fill="currentColor" fillOpacity="0.22" />
      <circle cx="98" cy="37" r="8" fill="currentColor" fillOpacity="0.22" />
      <rect x="150" y="28" width="210" height="18" rx="3" fill="currentColor" fillOpacity="0.14" />
      {lines}
    </g>
  );
}

/* ── Biology: microscopy field ───────────────────────────────── */
function Cells(seed: string) {
  const r = rng(seed);
  const blobs: React.ReactNode[] = [];
  for (let i = 0; i < 46; i++) {
    const cx = 40 + r() * (W - 80);
    const cy = 40 + r() * (H - 80);
    const rad = 16 + r() * 62;
    const accent = i === 7 || i === 29;
    blobs.push(
      <g key={i}>
        <ellipse
          cx={q(cx)}
          cy={q(cy)}
          rx={q(rad)}
          ry={q(rad * (0.72 + r() * 0.3))}
          fill={accent ? SIGNAL : "currentColor"}
          fillOpacity={accent ? 0.75 : q(0.05 + r() * 0.16)}
        />
        <ellipse
          cx={q(cx + rad * 0.16)}
          cy={q(cy - rad * 0.12)}
          rx={q(rad * 0.3)}
          ry={q(rad * 0.26)}
          fill="currentColor"
          fillOpacity={q(0.16 + r() * 0.22)}
        />
      </g>,
    );
  }
  return <g>{blobs}</g>;
}

/* ── Engineering: extruded isometric solid ──────────────────── */
function Solid(seed: string) {
  const r = rng(seed);
  const plates = 1 + Math.floor(r() * 3);
  const cx = W / 2 + (r() - 0.5) * 90;
  const spread = 1.1 + r() * 0.5;
  const s0 = 96 + r() * 40;
  const depth = 34 + r() * 34;
  const gap = depth + 16;
  const cyBase = H / 2 + 70 - plates * 12;
  const layers: React.ReactNode[] = [];

  for (let i = plates - 1; i >= 0; i--) {
    const s = s0 * (1 - i * 0.12);
    const cy = cyBase - i * gap;
    const top = `${cx},${q(cy - s * 0.58)} ${q(cx + s * spread)},${cy} ${cx},${q(cy + s * 0.58)} ${q(cx - s * spread)},${cy}`;
    const left = `${q(cx - s * spread)},${cy} ${cx},${q(cy + s * 0.58)} ${cx},${q(cy + s * 0.58 + depth)} ${q(cx - s * spread)},${q(cy + depth)}`;
    const right = `${q(cx + s * spread)},${cy} ${cx},${q(cy + s * 0.58)} ${cx},${q(cy + s * 0.58 + depth)} ${q(cx + s * spread)},${q(cy + depth)}`;
    layers.push(
      <g key={i}>
        <polygon points={left} fill="currentColor" fillOpacity={q(0.34 + i * 0.06)} />
        <polygon points={right} fill="currentColor" fillOpacity={q(0.2 + i * 0.05)} />
        <polygon points={top} fill="currentColor" fillOpacity={q(0.55 + i * 0.08)} />
        {i === 0 && (
          <polygon
            points={`${cx},${q(cy - s * 0.26)} ${q(cx + s * spread * 0.44)},${cy} ${cx},${q(cy + s * 0.26)} ${q(cx - s * spread * 0.44)},${cy}`}
            fill={SIGNAL}
          />
        )}
      </g>,
    );
  }

  return (
    <g>
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={`f${i}`} x="0" y={q(H - 78 + i * 22)} width={W} height="2"
          fill="currentColor" fillOpacity="0.07" />
      ))}
      {layers}
    </g>
  );
}

/* ── Environmental Science: layered terrain ─────────────────── */
function Terrain(seed: string) {
  const r = rng(seed);
  const phase = r() * 6.283;
  const k1 = 1.2 + r() * 0.8;
  const k2 = 2.4 + r() * 1.6;
  const count = 7;
  const bands: React.ReactNode[] = [];
  // Back to front: each ridge overpaints the one behind it.
  for (let i = 0; i < count; i++) {
    const base = H * 0.3 + (i * H * 0.66) / count;
    const amp = 30 - i * 2.5;
    const pts: string[] = [];
    for (let x = 0; x <= W; x += 16) {
      const t = x / W;
      const y =
        base -
        Math.sin(t * k1 * 6.283 + phase + i * 0.4) * amp -
        Math.sin(t * k2 * 6.283 - phase) * amp * 0.35;
      pts.push(`${x},${q(y)}`);
    }
    const accent = i === 3;
    bands.push(
      <polygon
        key={i}
        points={`${pts.join(" ")} ${W},${H} 0,${H}`}
        fill={accent ? SIGNAL : "currentColor"}
        fillOpacity={accent ? 0.72 : q(0.1 + i * 0.07)}
      />,
    );
  }
  return <g>{bands}</g>;
}

/* ── Mathematics: plotted areas under curves ────────────────── */
function Curves(seed: string) {
  const r = rng(seed);
  const a = 1.3 + r() * 1.2;
  const b = 2.4 + r() * 1.8;
  const curve = (scale: number, shift: number) => {
    const pts: string[] = [];
    for (let x = 0; x <= W; x += 10) {
      const t = x / W;
      const y =
        H * 0.66 -
        Math.abs(Math.sin(t * a * 3.14 + shift)) * H * 0.34 * scale -
        Math.sin(t * b * 6.283 + shift) * H * 0.07 * scale;
      pts.push(`${x},${q(y)}`);
    }
    return pts.join(" ");
  };
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={`g${i}`} x={q(50 + i * 100)} y="0" width="1.5" height={H}
          fill="currentColor" fillOpacity="0.06" />
      ))}
      {[0.55, 0.78, 1].map((scale, i) => (
        <polygon
          key={i}
          points={`${curve(scale, i * 0.5)} ${W},${H} 0,${H}`}
          fill="currentColor"
          fillOpacity={q(0.1 + i * 0.11)}
        />
      ))}
      <polyline
        points={curve(1.18, -0.35)}
        fill="none"
        stroke={SIGNAL}
        strokeWidth="7"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ── Robotics: linkage mechanism ─────────────────────────────── */
function Mechanism(seed: string) {
  const r = rng(seed);
  const j = [
    { x: 170, y: 420 },
    { x: 330, y: q(240 + r() * 60) },
    { x: 520, y: q(330 + r() * 50) },
    { x: 660, y: 190 },
  ];
  return (
    <g>
      <rect x="90" y="470" width={W - 180} height="26" fill="currentColor" fillOpacity="0.28" />
      {j.slice(0, -1).map((p, i) => {
        const n = j[i + 1];
        const ang = (Math.atan2(n.y - p.y, n.x - p.x) * 180) / Math.PI;
        const len = Math.hypot(n.x - p.x, n.y - p.y);
        return (
          <rect
            key={i}
            x={q(p.x)}
            y={-13}
            width={q(len)}
            height="26"
            rx="13"
            fill="currentColor"
            fillOpacity={q(0.3 + i * 0.14)}
            transform={`translate(0 ${q(p.y)}) rotate(${q(ang)} ${q(p.x)} 0)`}
          />
        );
      })}
      {j.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="30" fill="currentColor" fillOpacity="0.5" />
          <circle
            cx={p.x}
            cy={p.y}
            r="13"
            fill={i === j.length - 1 ? SIGNAL : "var(--apollo-art-from)"}
          />
        </g>
      ))}
    </g>
  );
}

const RENDERERS: Record<CoverVariant, (seed: string) => React.ReactNode> = {
  matrix: Matrix,
  interface: Interface,
  cells: Cells,
  solid: Solid,
  terrain: Terrain,
  curves: Curves,
  mechanism: Mechanism,
};

export function ProjectCover({
  variant,
  seed,
  className,
  label,
  imageUrl,
}: {
  variant: CoverVariant;
  seed: string;
  className?: string;
  /** Screen-reader description; omit for decorative use alongside a title. */
  label?: string;
  /** When a project has real cover art, generation is skipped entirely. */
  imageUrl?: string;
}) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={label ?? ""}
        className={`size-full object-cover ${className ?? ""}`}
        loading="lazy"
      />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`size-full text-paper ${className ?? ""}`}
      role={label ? "img" : "presentation"}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <defs>
        <linearGradient id={`cv-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="art-from" />
          <stop offset="100%" className="art-to" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#cv-${seed})`} />
      {RENDERERS[variant](seed)}
    </svg>
  );
}
