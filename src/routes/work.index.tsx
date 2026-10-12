import { createFileRoute } from '@tanstack/react-router';
import { CompanyGrid, ConversationBand } from '@/components/portfolio-parts';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/work/')({head:()=>pageHead('Our work','Explore iVantage company portfolios across banking, property, construction and transportation.'),component:Work});
function Work(){return <main><section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">OUR WORK</div><h2>Businesses. Products. Possibilities.</h2></div><p>Explore each company's portfolio.</p></div><CompanyGrid/></div></section><ConversationBand/></main>}
