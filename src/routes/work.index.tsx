import { createFileRoute } from '@tanstack/react-router';
import { CompanyGrid, ConversationBand } from '@/components/portfolio-parts';
import { pageHead } from '@/lib/page-head';
import { PageMotion } from '@/components/page-motion';
import { ArrowDownRight } from 'lucide-react';
export const Route=createFileRoute('/work/')({head:()=>pageHead('Our work','Explore iVantage company portfolios across banking, property, construction and transportation.'),component:Work});
function Work(){return <PageMotion><main><section className="work-intro"><div className="container"><div className="eyebrow page-enter"><span className="status-dot"/>OUR WORK / COMPANY PORTFOLIOS</div><div className="work-intro-title"><h1 className="page-enter">Different businesses.<br/><span>Shared ambition.</span></h1><ArrowDownRight className="page-enter" strokeWidth={1}/></div><div className="intro-bottom page-enter"><p>Banking. Property. Construction. Transportation.<br/>Explore the businesses behind our digital work.</p><span>IVANTAGE — WORK INDEX</span></div></div></section><section className="section work-directory"><div className="container"><CompanyGrid/><p className="work-note">Interface visuals are illustrative concepts, not screenshots of delivered client products.</p></div></section><ConversationBand/></main></PageMotion>}
