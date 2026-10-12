import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { findService } from '@/content/services';
import { ConversationBand } from '@/components/portfolio-parts';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/services/$service')({loader:({params})=>{const service=findService(params.service);if(!service)throw notFound();return service;},head:({loaderData})=>pageHead(loaderData?.name??'Service unavailable',loaderData?.copy??'Service unavailable.'),component:ServicePage});
function ServicePage(){const service=Route.useLoaderData();return <main><section className="section"><div className="container"><Link to="/services">← All services</Link><div className="section-head"><div><div className="eyebrow">{service.shortName}</div><h2>{service.name}</h2></div><service.icon className="service-icon" size={48}/></div><h2>{service.intro}</h2><p className="contact-copy">{service.details}</p><ul className="principles">{service.focus.map(item=><li key={item}>{item}</li>)}</ul></div></section><ConversationBand/></main>}
