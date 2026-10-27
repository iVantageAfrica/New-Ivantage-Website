import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single motion engine for every route.
 *
 * Choreography lives here so pages stay declarative: add `.reveal`,
 * `.reveal-stagger`, `.mask-line`, `.parallax` or `.draw-line` and it animates.
 * Everything runs inside a gsap.context and only when the visitor allows motion.
 */
export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      const heroTitle = gsap.utils.toArray<HTMLElement>(
        ".hero-title .mask-line > span, .editorial-hero h1 .mask-line > span, .company-intro h1 .mask-line > span",
      );

      intro
        .from(".page-enter, .hero-badge, .editorial-hero .eyebrow", {
          y: 16,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
        })
        .from(
          heroTitle,
          { yPercent: 112, duration: 1.15, ease: "expo.out", stagger: 0.085 },
          "-=0.45",
        )
        .from(".hero-copy, .editorial-copy", { y: 18, opacity: 0, duration: 0.8 }, "-=0.75")
        .from(
          ".hero-actions > *, .editorial-actions > *",
          { y: 14, opacity: 0, duration: 0.6, stagger: 0.07 },
          "-=0.6",
        )
        .from(".hero-meta li", { y: 12, opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.5")
        .from(".hero-visual", { y: 34, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.95")
        .from(".hero-chip", { y: 16, opacity: 0, duration: 0.6 }, "-=0.55");

      // Scroll-linked depth: hero art drifts slower than the copy.
      gsap.utils.toArray<HTMLElement>(".hero-visual").forEach((el) => {
        gsap.to(el, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom top", scrub: 0.6 },
        });
      });
      gsap.utils.toArray<HTMLElement>(".hero-chip").forEach((el) => {
        gsap.to(el, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((group) => {
        gsap.from(group.children, {
          y: 30,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".draw-line").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
        const amount = Number(el.dataset["parallax"] ?? 8);
        gsap.to(el, {
          yPercent: -amount,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts) document.fonts.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
