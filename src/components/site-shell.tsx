import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/ivantage-logo.png.asset.json';
import { services } from '@/content/services';
import { companies } from '@/content/portfolio';
import { contact } from '@/content/contact';
const nav = [{label:'Home',to:'/'},{label:'Projects',to:'/work'},{label:'Services',to:'/services'},{label:'About',to:'/about'},{label:'Contact',to:'/contact'}] as const;
export function SiteHeader() {
 const [menu,setMenu]=useState(false);
 const path=useLocation({select:l=>l.pathname});
 useEffect(()=>setMenu(false),[path]);
 return <header className="header"><nav className="container nav" aria-label="Main navigation"><Link to="/" aria-label="iVantage home"><img className="logo" src={logo.url} width={200} height={48} alt="iVantage"/></Link><div id="main-menu" className={`nav-links ${menu?'is-open':''}`}>{nav.map(n=>isWork(n.to)?(
   <div className="nav-item" key={n.to}>
     <Link to="/work" aria-current={path.startsWith('/work')?'page':undefined}>{n.label}<ChevronDown className="nav-caret" size={14} strokeWidth={1.8}/></Link>
     <div className="nav-dropdown">
       <Link to="/work" className="nav-dropdown-link nav-dropdown-head"><span>All companies</span><ArrowUpRight size={14}/></Link>
       {companies.map(c=><Link key={c.slug} to="/work/$company" params={{company:c.slug}} className="nav-dropdown-link"><span>{c.shortName}</span><small>{c.sector}</small></Link>)}
     </div>
   </div>
 ):(
   <Link key={n.to} to={n.to} aria-current={path.startsWith(n.to)?'page':undefined} onClick={()=>setMenu(false)}>{n.label}</Link>
 ))}<Button variant="charcoal" asChild className="nav-talk"><Link to="/contact">Let's Talk <ArrowUpRight/></Link></Button></div><Button variant="ghost" size="icon" className="menu-toggle" aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} aria-controls="main-menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</Button></nav></header>;
}
export function SiteFooter(){return <footer className="footer"><div className="container"><div className="footer-top"><div className="footer-brand"><Link to="/" aria-label="iVantage home"><img className="logo" src={logo.url} width={200} height={48} alt="iVantage" loading="lazy"/></Link><p>Thoughtful software. Meaningful experiences.<br/>Technology that moves businesses forward.</p></div><div className="footer-links"><div><h3>Explore</h3><Link to="/">Home</Link>{nav.map(n=><Link key={n.to} to={n.to}>{n.label}</Link>)}</div><div><h3>Clients</h3>{companies.map(c=><Link key={c.slug} to="/work/$company" params={{company:c.slug}}>{c.shortName}</Link>)}</div><div><h3>Our expertise</h3>{services.map(s=><Link key={s.slug} to="/services/$service" params={{service:s.slug}}>{s.shortName}</Link>)}</div><div><h3>Contact iVantage</h3><a href={contact.emailHref}>{contact.email}</a><Link to="/contact">Tell us about your project ↗</Link></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} iVantage. All rights reserved.</span><span>Design with intent. Build with purpose.</span></div></div></footer>}
