import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X, Code2, Smartphone, Layers3, PenTool, Landmark, House, HardHat, TrainFront, Check, MoveUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/contact-form';
import logo from '@/assets/ivantage-logo.png.asset.json';
import hero from '@/assets/hero-products.jpg';
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
  <header className="header"><nav className="container nav" aria-label="Main navigation"><a href="#top" aria-label="iVantage home"><img className="logo" src={logo.url} width={200} height={48} alt="iVantage"/></a><div id="main-menu" className={`nav-links ${menu ? 'is-open' : ''}`}>{navigation.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => setMenu(false)}>{item.label}</a>)}<Button variant="charcoal" asChild className="nav-talk"><a href="#contact" onClick={() => setMenu(false)}>Let's Talk <ArrowUpRight/></a></Button></div><Button variant="ghost" size="icon" className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-controls="main-menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></nav></header>
  <main>
   <section className="hero" id="top"><img className="hero-art" src={hero} width={1536} height={1024} alt="Illustrative digital product interfaces across desktop and mobile" fetchPriority="high"/><div className="container"><div className="eyebrow hero-enter"><span className="status-dot"/>THOUGHTFUL TECHNOLOGY. REAL IMPACT.</div><h1 className="hero-enter">We build digital<br/>experiences that<br/><span>move businesses</span><br/><span>forward.</span></h1><p className="hero-copy hero-enter">We design and develop web applications, mobile products, and enterprise software that help businesses solve real problems and grow.</p><div className="hero-actions hero-enter"><Button variant="brand" size="lg" asChild><a href="#work">Explore Our Work <ArrowUpRight/></a></Button><Button variant="ghost" asChild className="text-cta"><a href="#contact">Let's Talk <ArrowUpRight/></a></Button></div><a href="#work" className="hero-bottom"><ArrowDown size={13}/> Built with purpose. Designed for people.</a></div><span className="visual-caption">Illustrative product concept</span></section>
   <section className="clients" aria-label="Our clients"><div className="container"><p className="clients-label">Working with businesses that move the world forward.</p><div className="client-row"><div className="client-name"><Landmark/><span>Imperial Homes<small>Mortgage Bank</small></span></div><div className="client-name"><House/><span>HomeCo<small>Development</small></span></div><div className="client-name"><HardHat/><span>BuildConnect</span></div><div className="client-name"><TrainFront/><span>Nigerian Railway<small>Corporation</small></span></div></div></div></section>
   <section className="section work" id="work"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>Our work speaks for itself.</h2></div><p>Different industries. Unique challenges.<br/>Thoughtfully crafted digital solutions.</p></div><div className="work-grid">{projects.map((project,i) => <article key={project.name} className="project reveal"><div className={`project-image ${project.cls}`}><img src={project.image} width={1280} height={896} loading="lazy" alt={project.alt}/></div><div className="project-info"><div><h3>{project.name}</h3><p>{project.category}</p></div><span className="project-number">0{i+1}</span></div><p className="project-description">{project.description}</p></article>)}</div><p className="work-note">Interface visuals are illustrative concepts, not screenshots of delivered client products.</p></div></section>
   <section className="section services" id="services"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">02 / WHAT WE DO</div><h2>Technology built around<br/>your business.</h2></div><p>From the first idea to the finished product,<br/>we bring design and engineering together.</p></div><div className="service-grid">{services.map(service => <article className="service reveal" key={service.name}><service.icon className="service-icon" size={28} strokeWidth={1.4}/><h3>{service.name}</h3><p>{service.copy}</p></article>)}</div></div></section>
   <section className="section about" id="about"><div className="container about-grid"><div className="reveal"><div className="eyebrow">03 / WHY IVANTAGE</div><h2>Good technology<br/>solves real problems.</h2><p className="about-copy">We are a software development and digital solutions company. We connect business understanding, thoughtful design, and sound engineering to build technology that matters.</p></div><ul className="principles reveal">{['Business-focused solutions','User-centered design','Maintainable and scalable engineering','Reliable collaboration','Continuous improvement'].map((principle,i) => <li key={principle}><span>0{i+1}</span>{principle}<Check/></li>)}</ul></div></section>
   <section className="section process"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">04 / OUR APPROACH</div><h2>A clear path from idea to impact.</h2></div><p>Collaborative by nature.<br/>Intentional at every step.</p></div><div className="process-grid">{steps.map((step,i) => <article className="step reveal" key={step.name}><span className="step-number">0{i+1} —</span><h3>{step.name}</h3><p>{step.copy}</p></article>)}</div></div></section>
   <section className="section contact" id="contact"><div className="container contact-grid"><div className="reveal"><div className="eyebrow">05 / LET'S BUILD SOMETHING</div><h2>Have a project<br/>in mind?</h2><p className="contact-copy">Let's discuss how technology can help your business move forward.</p><MoveUpRight className="contact-arrow" strokeWidth={1}/></div><ContactForm/></div></section>
  </main>
  <footer className="footer"><div className="container"><div className="footer-top"><div className="footer-brand"><a href="#top" aria-label="iVantage home"><img className="logo" src={logo.url} width={200} height={48} alt="iVantage" loading="lazy"/></a><p>Thoughtful software. Meaningful experiences.<br/>Technology that moves businesses forward.</p></div><div className="footer-links"><div><h3>Explore</h3>{navigation.map(item => <a href={`#${item.id}`} key={item.id}>{item.label}</a>)}</div><div><h3>Our expertise</h3><a href="#services">Web applications</a><a href="#services">Mobile applications</a><a href="#services">Enterprise software</a><a href="#services">UI/UX & product engineering</a></div><div><h3>Start a conversation</h3><a href="#contact">Tell us about your project ↗</a><p>Company contact details to be confirmed.</p></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} iVantage. All rights reserved.</span><span>Built with purpose.</span></div></div></footer>
 </div>;
}
