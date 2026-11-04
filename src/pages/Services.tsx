import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ConversationBand } from "@/components/portfolio-parts";
import { EditorialHero, ProcessSection, TalkAction } from "@/components/inner-page";
import { PageMotion } from "@/components/page-motion";
import { services } from "@/content/services";
import { usePageMeta, pageTitle } from "@/lib/seo";

export function Services() {
  usePageMeta(
    pageTitle("Services"),
    "Web applications, mobile applications, enterprise software and digital product design from iVantage.",
  );

  return (
    <PageMotion>
      <main>
        <EditorialHero
          eyebrow="Our expertise"
          title={
            <>
              <span className="mask-line">
                <span>Design. Develop.</span>
              </span>
              <span className="mask-line">
                <span>
                  <em>Move forward.</em>
                </span>
              </span>
            </>
          }
          copy="Thoughtful design and sound engineering. Digital solutions built around your business, not the other way around."
        >
          <TalkAction />
        </EditorialHero>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">What we bring to the table</div>
                <h2>
                  One partner.
                  <br />
                  <em>Connected expertise.</em>
                </h2>
              </div>
              <p>From a first idea to a working product, we connect the pieces that matter.</p>
            </div>
            <div className="expertise-list reveal-stagger">
              {services.map((service, index) => (
                <Link className="expertise-row" key={service.slug} to={`/services/${service.slug}`}>
                  <span className="expertise-number">0{index + 1}</span>
                  <div className="expertise-name">
                    <service.icon strokeWidth={1.3} />
                    <h3>{service.name}</h3>
                  </div>
                  <p>{service.copy}</p>
                  <span className="expertise-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />
        <ConversationBand />
      </main>
    </PageMotion>
  );
}
