import { createFileRoute, Link } from '@tanstack/react-router';
import { services } from '@/content/services';
import { ConversationBand } from '@/components/portfolio-parts';
import { pageHead } from '@/lib/page-head';
import { PageMotion } from '@/components/page-motion';
import { EditorialHero, ProcessSection, TalkAction } from '@/components/inner-page';
import { ArrowUpRight } from 'lucide-react';
export const Route=createFileRoute('/services/')({head:()=>pageHead('Services','Web applications, mobile applications, enterprise software and digital product design from iVantage.'),component:Services});
function Services(){return <PageMotion><main><EditorialHero eyebrow="OUR EXPERTISE" title={<>Design. Develop.<br/><span>Move forward.</span></>} copy="Thoughtful design and sound engineering. Digital solutions built around your business, not the other way around."><TalkAction/></EditorialHero><section className="section expertise-section"><div className="container"><div className="section-head reveal"><div><div className="eyebrow">WHAT WE BRING TO THE TABLE</div><h2>One partner. Connected expertise.</h2></div><p>From a first idea to a working product,<br/>we connect the pieces that matter.</p></div><div className="expertise-list">{services.map((service,i)=><Link className="expertise-row reveal" key={service.slug} to="/services/$service" params={{service:service.slug}}><span className="expertise-number">0{i+1}</span><div className="expertise-name"><service.icon strokeWidth={1.3}/><h3>{service.name}</h3></div><p>{service.copy}</p><span className="expertise-arrow"><ArrowUpRight/></span></Link>)}</div></div></section><ProcessSection/><ConversationBand/></main></PageMotion>}
