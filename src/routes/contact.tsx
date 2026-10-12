import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '@/components/contact-form';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/contact')({head:()=>pageHead('Contact us','Start a conversation with iVantage about your web application, mobile product or enterprise software project.'),component:Contact});
function Contact(){return <main><section className="section contact"><div className="container contact-grid"><div><div className="eyebrow">LET'S BUILD SOMETHING</div><h2>Have a project in mind?</h2><p className="contact-copy">Let's discuss how technology can help your business move forward.</p></div><ContactForm/></div></section></main>}
