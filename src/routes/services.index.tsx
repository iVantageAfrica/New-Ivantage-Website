import { createFileRoute, Link } from '@tanstack/react-router';
import { services } from '@/content/services';
import { ConversationBand } from '@/components/portfolio-parts';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/services/')({head:()=>pageHead('Services','Web applications, mobile applications, enterprise software and digital product design from iVantage.'),component:Services});
function Services(){return <main><section className="section services"><div className="container"><div className="eyebrow">OUR EXPERTISE</div><h2>Technology built around your business.</h2><div className="service-grid">{services.map(service=><article className="service" key={service.slug}><service.icon className="service-icon"/><h3>{service.name}</h3><p>{service.copy}</p><Link to="/services/$service" params={{service:service.slug}}>Explore service ↗</Link></article>)}</div></div></section><ConversationBand/></main>}
