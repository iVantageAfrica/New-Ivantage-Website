import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.page-enter', { y: 24, opacity: 0, duration: .85, stagger: .09, ease: 'power3.out', clearProps: 'all' });
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el =>
          gsap.from(el, { y: 28, opacity: 0, duration: .8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 96%', once: true } }));
        gsap.utils.toArray<HTMLElement>('.reveal-stagger').forEach(group =>
          gsap.from(group.children, { y: 26, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: group, start: 'top 92%', once: true } }));
        gsap.from('.editorial-art', { scale: 1.035, duration: 1.8, ease: 'power2.out', clearProps: 'transform' });
        gsap.utils.toArray<HTMLElement>('.parallax-art').forEach(el =>
          gsap.to(el, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }));
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}
