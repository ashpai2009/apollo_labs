import type { CoverVariant } from "@/lib/types";

const W = 1200;
const H = 800;

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

/** Rounded so Node and the browser serialise identical path data. */
const q = (n: number) => Math.round(n * 100) / 100;

/**
 * A placeholder for a figure that does not exist yet — not a piece of art.
 * A near-neutral ground, a measured grid, and the Apollo mark held small in
 * the corner. The discipline shifts the hue slightly and the seed shifts the
 * grid origin, so a wall of cards has variation without colour noise.
 *
 * Any project carrying `coverImageUrl` skips generation entirely.
 */
function Grid({ seed }: { seed: string }) {
  const r = rng(seed);
  const step = 60;
  const offset = q(r() * step);
  const lines: React.ReactNode[] = [];
  for (let x = offset; x < W; x += step) {
    lines.push(
      <line key={`v${x}`} x1={q(x)} y1={0} x2={q(x)} y2={H} strokeWidth="1" />,
    );
  }
  for (let y = offset; y < H; y += step) {
    lines.push(
      <line key={`h${y}`} x1={0} y1={q(y)} x2={W} y2={q(y)} strokeWidth="1" />,
    );
  }
  return (
    <g stroke="var(--cover-ink)" strokeOpacity="0.2">
      {lines}
    </g>
  );
}

/** The Apollo mark, authored on a 32×32 grid. */
function Mark({ scale, x, y }: { scale: number; x: number; y: number }) {
  return (
    <g
      transform={`translate(${q(x)} ${q(y)}) scale(${scale})`}
      stroke="var(--cover-ink)"
      fill="none"
    >
      <ellipse
        cx="16"
        cy="18"
        rx="13.5"
        ry="6.5"
        transform="rotate(-22 16 18)"
        strokeOpacity="0.3"
        strokeWidth="0.7"
      />
      <path
        d="M6.6 26.4 L16 5.4 L25.4 26.4"
        strokeOpacity="0.62"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M11.1 19.6 H20.9"
        strokeOpacity="0.62"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <circle
        cx="28.5"
        cy="12.9"
        r="2.1"
        fill="var(--apollo-signal)"
        fillOpacity="0.75"
        stroke="none"
      />
    </g>
  );
}

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

  const gid = `cv-${seed}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`size-full cover-${variant} ${className ?? ""}`}
      role={label ? "img" : "presentation"}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="var(--cover-a)" />
          <stop offset="100%" stopColor="var(--cover-b)" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${gid})`} />
      <Grid seed={seed} />
      <Mark scale={4.4} x={W - 232} y={H - 232} />
    </svg>
  );
}
