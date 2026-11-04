import { ArrowUpRight, Code2, Mail, MessageSquare, PencilRuler } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { EditorialHero } from "@/components/inner-page";
import { PageMotion } from "@/components/page-motion";
import { SocialLinks } from "@/components/social-links";
import { contact } from "@/content/contact";
import { usePageMeta, pageTitle } from "@/lib/seo";

export function Contact() {
  usePageMeta(
    pageTitle("Contact us"),
    "Start a conversation with iVantage about your web application, mobile product or enterprise software project.",
  );

  return (
    <PageMotion>
      <main>
        <EditorialHero
          eyebrow="Contact iVantage"
          title={
            <>
              <span className="mask-line">
                <span>Let’s talk about</span>
              </span>
              <span className="mask-line">
                <span>
                  <em>your next project.</em>
                </span>
              </span>
            </>
          }
          copy="Tell us about your business, your goals, and the digital solution you have in mind."
          footRight="iVantage / Contact"
        />

        <section className="contact-page">
          <div className="container">
            <div className="contact-page-grid">
              <aside className="contact-side reveal">
                <h2>
                  Good work starts
                  <br />
                  with <em>a conversation.</em>
                </h2>
                <a className="contact-email" href={contact.emailHref}>
                  <Mail size={19} />
                  {contact.email}
                  <ArrowUpRight size={18} />
                </a>
                <div className="contact-topics">
                  <span>
                    <MessageSquare size={17} /> Business &amp; goals
                  </span>
                  <span>
                    <PencilRuler size={17} /> Design &amp; experience
                  </span>
                  <span>
                    <Code2 size={17} /> Development &amp; delivery
                  </span>
                </div>
                <div className="contact-socials">
                  <span className="contact-socials-label">Follow iVantage</span>
                  <SocialLinks />
                </div>
              </aside>

              <div className="form-card reveal">
                <div className="form-heading">
                  <span>Project inquiry</span>
                  <span>Let’s get acquainted</span>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageMotion>
  );
}
