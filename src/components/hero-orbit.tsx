import { useEffect, useState } from "react";

const phases = [
  { name: "Discover" },
  { name: "Design" },
  { name: "Build" },
  { name: "Ship" },
] as const;

export function HeroOrbit() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % phases.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-orbit">
      <span className="orbit-glow" aria-hidden="true" />
      <svg viewBox="0 0 520 520" fill="none" aria-hidden="true">
        <g className="orbit-ticks">
          <circle
            cx="260"
            cy="260"
            r="246"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray="1 15"
            opacity="0.28"
          />
        </g>

        <circle cx="260" cy="260" r="216" stroke="currentColor" strokeWidth="1" opacity="0.5" />

        <g className="orbit-sweep" style={{ transform: `rotate(${active * 90 - 112.5}deg)` }}>
          <circle
            cx="260"
            cy="260"
            r="216"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="170 1187"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>

        <g className="orbit-ring--mid">
          <circle
            cx="260"
            cy="260"
            r="170"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 10"
            opacity="0.55"
          />
        </g>

        <circle cx="260" cy="260" r="114" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        <g className="orbit-axes">
          <path d="M260 8v504M8 260h504" stroke="currentColor" strokeWidth="1" opacity="0.14" />
          <circle cx="260" cy="8" r="2.4" fill="currentColor" opacity="0.45" />
          <circle cx="260" cy="512" r="2.4" fill="currentColor" opacity="0.45" />
          <circle cx="8" cy="260" r="2.4" fill="currentColor" opacity="0.45" />
          <circle cx="512" cy="260" r="2.4" fill="currentColor" opacity="0.45" />
        </g>

        <g className="orbit-brackets" stroke="currentColor" strokeWidth="1" opacity="0.42">
          <path d="M54 92V54h38" />
          <path d="M428 54h38v38" />
          <path d="M466 428v38h-38" />
          <path d="M92 466H54v-38" />
        </g>

        <g
          className="orbit-traces"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        >
          <path d="M320 236h32v-96h28" />
          <path d="M284 320v32h96v28" />
          <path d="M200 284h-32v96h-28" />
          <path d="M236 200v-32h-96v-28" />
        </g>

        <g
          className="orbit-flow"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="trace trace--a" d="M320 236h32v-96h28" />
          <path className="trace trace--b" d="M284 320v32h96v28" />
          <path className="trace trace--c" d="M200 284h-32v96h-28" />
          <path className="trace trace--d" d="M236 200v-32h-96v-28" />
        </g>

        <g fill="currentColor">
          <circle cx="380" cy="140" r="8" opacity="0.18" />
          <circle cx="380" cy="380" r="8" opacity="0.18" />
          <circle cx="140" cy="380" r="8" opacity="0.18" />
          <circle cx="140" cy="140" r="8" opacity="0.18" />
          <circle cx="380" cy="140" r="3.4" />
          <circle cx="380" cy="380" r="3.4" />
          <circle cx="140" cy="380" r="3.4" />
          <circle cx="140" cy="140" r="3.4" />
        </g>

        <circle
          className="orbit-ping"
          cx="260"
          cy="260"
          r="84"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />

        <g className="orbit-chip">
          <g stroke="currentColor" strokeWidth="1.2" opacity="0.55">
            <path d="M236 212v-12M284 212v-12" />
            <path d="M236 308v12M284 308v12" />
            <path d="M212 236h-12M212 284h-12" />
            <path d="M308 236h12M308 284h12" />
          </g>
          <rect
            x="212"
            y="212"
            width="96"
            height="96"
            rx="18"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <rect
            x="234"
            y="234"
            width="52"
            height="52"
            rx="10"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M246 250l14 24 14-24"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <g className="orbit-node orbit-node--a">
          <circle cx="260" cy="44" r="9" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="260" cy="44" r="3.6" fill="currentColor" />
        </g>

        <g className="orbit-node orbit-node--b">
          <circle cx="430" cy="260" r="3" fill="currentColor" opacity="0.85" />
        </g>
      </svg>

      <ol className="orbit-phases" aria-label="How we work">
        {phases.map((phase, index) => (
          <li
            key={phase.name}
            className={`orbit-phase orbit-phase--${index}${index === active ? " is-active" : ""}`}
            aria-current={index === active ? "step" : undefined}
          >
            <span className="orbit-phase-index">0{index + 1}</span>
            <span className="orbit-phase-name">{phase.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
