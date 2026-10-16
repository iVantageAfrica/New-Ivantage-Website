import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X, Code2, Smartphone, Layers3, PenTool, Landmark, House, HardHat, TrainFront, Check, MoveUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/contact-form';
import { CompanyGrid } from '@/components/portfolio-parts';
import hero from '@/assets/digital-studio.jpg';
import { contact } from '@/content/contact';
import { services as serviceContent } from '@/content/services';
import { companies } from '@/content/portfolio';
const clientIcons: Record<string, typeof Landmark> = { 'imperial-homes': Landmark, homeco: House, buildconnect: HardHat, 'nigerian-railway': TrainFront };

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'iVantage — Thoughtful Technology. Real Impact.' },
    { name: 'description', content: 'iVantage designs and develops web applications, mobile products and enterprise software for businesses and institutions. Explore our work and start a conversation.' },
    { property: 'og:title', content: 'iVantage — Thoughtful Technology. Real Impact.' },
    { property: 'og:description', content: 'Digital product engineering built around your business. Discover iVantage’s work, services and approach.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
const services = [
  { icon: Code2, name: 'Web Application Development', copy: 'Scalable, responsive web applications designed around real business needs.' },
  { icon: Smartphone, name: 'Mobile Application Development', copy: 'Modern mobile experiences for customers, teams, and businesses.' },
  { icon: Layers3, name: 'Enterprise Software Solutions', copy: 'Software systems that improve workflows, operations, and business efficiency.' },
  { icon: PenTool, name: 'UI/UX & Digital Product Engineering', copy: 'Intuitive interfaces and thoughtful product experiences built for real users.' },
];
const steps = [{name:'Discover',copy:'Understand the business, users, and problem.'},{name:'Design',copy:'Plan the experience and define the right solution.'},{name:'Build',copy:'Develop, test, and refine the product.'},{name:'Deliver',copy:'Launch, support, and improve the solution.'}];
function Index() {
 const [menu, setMenu] = useState(false);
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => {
   gsap.registerPlugin(ScrollTrigger);
   const media = gsap.matchMedia();
   media.add('(prefers-reduced-motion: no-preference)', () => {
     const ctx = gsap.context(() => {
       const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
       tl.from('.home-hero-badge', { y: 18, opacity: 0, duration: .55, clearProps: 'all' })
         .from('.home-hero h1', { y: 36, opacity: 0, duration: .95, clearProps: 'all' }, '-=.25')
         .from('.home-hero-text > p', { y: 22, opacity: 0, duration: .7, clearProps: 'all' }, '-=.55')
         .from('.home-hero-actions', { y: 20, opacity: 0, duration: .65, clearProps: 'all' }, '-=.45')
         .from('.home-hero-points li', { y: 16, opacity: 0, duration: .5, stagger: .08, clearProps: 'all' }, '-=.4')
         .from('.home-hero-media', { y: 44, opacity: 0, scale: .96, duration: 1, clearProps: 'all' }, '-=.75')
         .from('.home-hero-media-glow', { opacity: 0, scale: .9, duration: 1.1, clearProps: 'all' }, '-=.9')
         .from('.home-hero-float', { y: 22, opacity: 0, duration: .6, clearProps: 'all' }, '-=.55');
       gsap.to('.home-hero-media-frame img', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: true } });
       gsap.to('.home-hero-glow-a', { yPercent: 26, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: true } });
       gsap.to('.home-hero-glow-b', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.home-hero', start: 'top top', end: 'bottom top', scrub: true } });
       gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => { gsap.from(el, { y: 30, opacity: 0, duration: .8, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }); });
       gsap.utils.toArray<HTMLElement>('.service-grid, .process-grid, .principles, .client-row').forEach(group => {
         gsap.from(group.children, { y: 34, opacity: 0, duration: .75, stagger: .1, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: group, start: 'top 90%', once: true } });
       });
       gsap.utils.toArray<HTMLElement>('.step-number').forEach(el => {
         gsap.from(el, { x: -18, opacity: 0, duration: .7, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
       });
     }, root);
     return () => ctx.revert();
   });
   return () => media.revert();
 }, []);
 return <div ref={root}>
  <main>
    <section className="home-hero" id="top"><div className="home-hero-bg" aria-hidden="true"><span className="home-hero-glow home-hero-glow-a"/><span className="home-hero-glow home-hero-glow-b"/><span className="home-hero-grid-lines"/></div><div className="container home-hero-grid"><div className="home-hero-text"><div className="home-hero-badge"><span className="status-dot"/>Software development &amp; digital solutions</div><h1>Software built for <span>your business.</span></h1><p>We bring design and engineering together to create web applications, mobile products, and enterprise software that move your business forward.</p><div className="home-hero-actions"><Button variant="brand" size="lg" asChild><Link to="/work">Explore our work <ArrowUpRight/></Link></Button><Button variant="outline" size="lg" asChild><Link to="/contact">Let's talk</Link></Button></div><ul className="home-hero-points">{['Web applications','Mobile products','Enterprise software'].map(t=><li key={t}><Check size={14}/>{t}</li>)}</ul></div><div className="home-hero-media"><span className="home-hero-media-glow" aria-hidden="true"/><div className="home-hero-media-frame"><img src={hero} width={1536} height={1024} alt="Modern digital product design workspace" fetchPriority="high"/></div><div className="home-hero-float"><span className="home-hero-float-icon"><Sparkles size={17}/></span><div><strong>Shipped &amp; live</strong><small>Digital products in production</small></div></div></div></div></section>
    <section className="clients" id="clients" aria-label="Our clients"><div className="container"><p className="clients-label">Working with businesses that move the world forward.</p><div className="client-row">{companies.map((c) => { const Icon = clientIcons[c.slug] ?? Landmark; return <Link key={c.slug} to="/work/$company" params={{ company: c.slug }} className="client-logo-card">{c.logoUrl ? <img src={c.logoUrl} alt={`${c.name} logo`} className="client-logo-img"/> : <span className="client-logo-slot" title="Logo space"><Icon/></span>}<span className="client-logo-name">{c.shortName}<small>{c.sector}</small></span></Link>; })}</div></div></section>
   <section className="section work" id="work"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Our work speaks for itself.</h2></div><p>Different industries. Unique challenges.<br/>Thoughtfully crafted digital solutions.</p></div><CompanyGrid/></div></section>
   <section className="section services" id="services"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">02 / WHAT WE DO</div><h2>Technology built around<br/>your business.</h2></div><p>From the first idea to the finished product,<br/>we bring design and engineering together.</p></div><div className="service-grid">{services.map(service => <Link className="service reveal" key={service.name} to="/services/$service" params={{service:serviceContent.find(item=>item.name===service.name)?.slug??'web-applications'}}><service.icon className="service-icon" size={28} strokeWidth={1.4}/><h3>{service.name}</h3><p>{service.copy}</p><span className="portfolio-link">Explore service <ArrowUpRight size={14}/></span></Link>)}</div></div></section>
   <section className="section about" id="about"><div className="container about-grid"><div className="reveal"><div className="eyebrow">03 / WHY IVANTAGE</div><h2>Good technology<br/>solves real problems.</h2><p className="about-copy">We are a software development and digital solutions company. We connect business understanding, thoughtful design, and sound engineering to build technology that matters.</p></div><ul className="principles reveal">{['Business-focused solutions','User-centered design','Maintainable and scalable engineering','Reliable collaboration','Continuous improvement'].map((principle,i) => <li key={principle}><span>0{i+1}</span>{principle}<Check/></li>)}</ul></div></section>
   <section className="section process"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">04 / OUR APPROACH</div><h2>A clear path from idea to impact.</h2></div><p>Collaborative by nature.<br/>Intentional at every step.</p></div><div className="process-grid">{steps.map((step,i) => <article className="step reveal" key={step.name}><span className="step-number">0{i+1} —</span><h3>{step.name}</h3><p>{step.copy}</p></article>)}</div></div></section>
    <section className="section contact" id="contact"><div className="container contact-grid"><div className="reveal"><div className="eyebrow">05 / LET'S BUILD SOMETHING</div><h2>Have a project<br/>in mind?</h2><p className="contact-copy">Let's discuss how technology can help your business move forward.</p><Button variant="link" asChild className="company-email"><a href={contact.emailHref}>{contact.email}<ArrowUpRight/></a></Button><MoveUpRight className="contact-arrow" strokeWidth={1}/></div><ContactForm/></div></section>
  </main>

 </div>;
}
