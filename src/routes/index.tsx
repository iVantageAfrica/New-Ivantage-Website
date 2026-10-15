import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X, Code2, Smartphone, Layers3, PenTool, Landmark, House, HardHat, TrainFront, Check, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/contact-form';
import { CompanyGrid } from '@/components/portfolio-parts';
import logo from '@/assets/ivantage-logo.png.asset.json';
import hero from '@/assets/digital-studio.jpg';
import { contact } from '@/content/contact';
import { services as serviceContent } from '@/content/services';
import property from '@/assets/property-project.jpg';
import construction from '@/assets/construction-project.jpg';
import rail from '@/assets/rail-project.jpg';

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
const navigation = [{ label: 'Work', id: 'work' }, { label: 'Services', id: 'services' }, { label: 'About', id: 'about' }, { label: 'Contact', id: 'contact' }];
const projects = [
  { name: 'Imperial Homes Mortgage Bank', category: 'BANKING & FINANCIAL TECHNOLOGY', description: 'Digital solutions for the mortgage and banking sector.', image: hero, cls: 'project-banking', alt: 'Illustrative financial interface on desktop and mobile devices' },
  { name: 'HomeCo Development', category: 'REAL ESTATE & PROPERTY TECHNOLOGY', description: 'A digital presence for a new perspective on property.', image: property, cls: '', alt: 'Illustrative property website concept featuring contemporary architecture' },
  { name: 'BuildConnect', category: 'CONSTRUCTION TECHNOLOGY & MARKETPLACE', description: 'Digital experiences for the construction ecosystem.', image: construction, cls: '', alt: 'Illustrative construction marketplace interface concept' },
  { name: 'Nigerian Railway Corporation', category: 'DIGITAL SOLUTIONS & ENTERPRISE TECHNOLOGY', description: 'Technology for an essential transportation institution.', image: rail, cls: '', alt: 'Illustrative railway digital platform concept' },
];
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
       gsap.from('.hero-enter', { y: 25, opacity: 0, duration: .85, stagger: .12, ease: 'power3.out', clearProps: 'all' });
       gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => { gsap.from(el, { y: 30, opacity: 0, duration: .8, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }); });
     }, root);
     return () => ctx.revert();
   });
   return () => media.revert();
 }, []);
 return <div ref={root}>
  <main>
    <section className="hero" id="top"><div className="hero-glow" aria-hidden="true"/><img className="hero-art" src={hero} width={1536} height={1024} alt="Illustrative digital design workspace with a product design canvas" fetchPriority="high"/><div className="container"><div className="eyebrow hero-badge hero-enter"><span className="status-dot"/>IVANTAGE / DIGITAL SOLUTIONS</div><h1 className="hero-enter">Software built<br/>for <span>your business.</span></h1><p className="hero-copy hero-enter">We bring design and engineering together to create web applications, mobile products, and enterprise software that move your business forward.</p><div className="hero-actions hero-enter"><Button variant="brand" size="lg" asChild><Link to="/work">Explore Our Work <ArrowUpRight/></Link></Button><Button variant="ghost" asChild className="text-cta"><Link to="/contact">Let's Talk <ArrowUpRight/></Link></Button></div><a href="#work" className="hero-bottom hero-enter"><ArrowDown size={13}/> Thoughtful technology. Real impact.</a></div></section>
   <section className="clients" aria-label="Our clients"><div className="container"><p className="clients-label">Working with businesses that move the world forward.</p><div className="client-row"><div className="client-name"><Landmark/><span>Imperial Homes<small>Mortgage Bank</small></span></div><div className="client-name"><House/><span>HomeCo<small>Development</small></span></div><div className="client-name"><HardHat/><span>BuildConnect</span></div><div className="client-name"><TrainFront/><span>Nigerian Railway<small>Corporation</small></span></div></div></div></section>
   <section className="section work" id="work"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Our work speaks for itself.</h2></div><p>Different industries. Unique challenges.<br/>Thoughtfully crafted digital solutions.</p></div><CompanyGrid/><p className="work-note">Interface visuals are illustrative concepts, not screenshots of delivered client products.</p></div></section>
   <section className="section services" id="services"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">02 / WHAT WE DO</div><h2>Technology built around<br/>your business.</h2></div><p>From the first idea to the finished product,<br/>we bring design and engineering together.</p></div><div className="service-grid">{services.map(service => <Link className="service reveal" key={service.name} to="/services/$service" params={{service:serviceContent.find(item=>item.name===service.name)?.slug??'web-applications'}}><service.icon className="service-icon" size={28} strokeWidth={1.4}/><h3>{service.name}</h3><p>{service.copy}</p><span className="portfolio-link">Explore service <ArrowUpRight size={14}/></span></Link>)}</div></div></section>
   <section className="section about" id="about"><div className="container about-grid"><div className="reveal"><div className="eyebrow">03 / WHY IVANTAGE</div><h2>Good technology<br/>solves real problems.</h2><p className="about-copy">We are a software development and digital solutions company. We connect business understanding, thoughtful design, and sound engineering to build technology that matters.</p></div><ul className="principles reveal">{['Business-focused solutions','User-centered design','Maintainable and scalable engineering','Reliable collaboration','Continuous improvement'].map((principle,i) => <li key={principle}><span>0{i+1}</span>{principle}<Check/></li>)}</ul></div></section>
   <section className="section process"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">04 / OUR APPROACH</div><h2>A clear path from idea to impact.</h2></div><p>Collaborative by nature.<br/>Intentional at every step.</p></div><div className="process-grid">{steps.map((step,i) => <article className="step reveal" key={step.name}><span className="step-number">0{i+1} —</span><h3>{step.name}</h3><p>{step.copy}</p></article>)}</div></div></section>
    <section className="section contact" id="contact"><div className="container contact-grid"><div className="reveal"><div className="eyebrow">05 / LET'S BUILD SOMETHING</div><h2>Have a project<br/>in mind?</h2><p className="contact-copy">Let's discuss how technology can help your business move forward.</p><Button variant="link" asChild className="company-email"><a href={contact.emailHref}>{contact.email}<ArrowUpRight/></a></Button><MoveUpRight className="contact-arrow" strokeWidth={1}/></div><ContactForm/></div></section>
  </main>

 </div>;
}
