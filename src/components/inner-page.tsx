import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import art from '@/assets/digital-studio.jpg';

export function EditorialHero({ eyebrow, title, copy, children }: { eyebrow: string; title: ReactNode; copy: string; children?: ReactNode }) {
  return <section className="editorial-hero">
    <img className="editorial-art" src={art} alt="Illustrative digital design workspace with a product design canvas" width={1536} height={1024} fetchPriority="high"/>
    <div className="container"><div className="eyebrow page-enter"><span className="status-dot"/>{eyebrow}</div><h1 className="page-enter">{title}</h1><p className="editorial-copy page-enter">{copy}</p>{children && <div className="editorial-actions page-enter">{children}</div>}</div>
    <div className="editorial-foot container"><span>DESIGN WITH INTENT. BUILD WITH PURPOSE.</span><span>iVantage / Digital craftsmanship</span></div>
  </section>;
}

export function ProcessSection() {
  const steps = [{ name:'Discover', copy:'Understand the business, the people, and the problem.' }, { name:'Design', copy:'Shape the experience and define the right solution.' }, { name:'Build', copy:'Develop, test, and refine every important detail.' }, { name:'Deliver', copy:'Launch thoughtfully. Support and improve continuously.' }];
  return <section className="section approach-section"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">THE WAY WE WORK</div><h2>From a good question<br/>to the right solution.</h2></div><p>Clear thinking. Close collaboration.<br/>Care at every stage.</p></div><div className="process-grid">{steps.map((step,i)=><article className="step reveal" key={step.name}><span className="step-number">0{i+1} /</span><h3>{step.name}</h3><p>{step.copy}</p></article>)}</div></div></section>;
}

export function TalkAction() { return <Button variant="charcoal" size="lg" asChild><Link to="/contact">Let's talk <ArrowUpRight/></Link></Button>; }