import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

function HeroMotif() {
  return (
    <svg className="hero-motif" viewBox="0 0 660 660" fill="none" aria-hidden="true">
      <circle cx="380" cy="330" r="118" stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
      <circle cx="380" cy="330" r="216" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="380" cy="330" r="320" stroke="currentColor" strokeWidth="1" opacity="0.26" />
      <path d="M380 0v660M40 330h680" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path
        d="M172 148 588 512"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
        strokeDasharray="3 7"
      />
      <circle cx="380" cy="330" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="272" cy="222" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="488" cy="438" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function EditorialHero({
  eyebrow,
  title,
  copy,
  children,
  footLeft = "Design with intent. Build with purpose.",
  footRight = "iVantage / Digital craftsmanship",
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  children?: ReactNode;
  footLeft?: string;
  footRight?: string;
}) {
  return (
    <section className="editorial-hero">
      <HeroMotif />
      <div className="container">
        <div className="eyebrow">
          <span className="status-dot" />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p className="editorial-copy">{copy}</p>
        {children && <div className="editorial-actions">{children}</div>}
      </div>
      <div className="editorial-foot container">
        <span>{footLeft}</span>
        <span>{footRight}</span>
      </div>
    </section>
  );
}

const processSteps = [
  { name: "Discover", copy: "Understand the business, the people, and the problem worth solving." },
  { name: "Design", copy: "Shape the experience and define the right solution with you." },
  { name: "Build", copy: "Develop, test, and refine every detail that matters." },
  { name: "Deliver", copy: "Launch with confidence. Support and improve continuously." },
];

export function ProcessSection() {
  return (
    <section className="section process">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">The way we work</div>
            <h2>
              From a good question
              <br />
              to the <em>right solution.</em>
            </h2>
          </div>
          <p>Clear thinking. Close collaboration. Care at every stage.</p>
        </div>
        <div className="process-grid reveal-stagger">
          <span className="process-line draw-line" aria-hidden="true" />
          {processSteps.map((step, index) => (
            <article className="step" key={step.name}>
              <span className="step-number">0{index + 1} —</span>
              <h3>{step.name}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TalkAction() {
  return (
    <Button variant="brand" size="lg" asChild>
      <Link to="/contact">
        Let’s talk <ArrowUpRight />
      </Link>
    </Button>
  );
}
