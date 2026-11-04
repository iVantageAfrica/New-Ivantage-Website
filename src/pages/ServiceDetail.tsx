import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ConversationBand } from "@/components/portfolio-parts";
import { EditorialHero, ProcessSection, TalkAction } from "@/components/inner-page";
import { PageMotion } from "@/components/page-motion";
import { findService, services } from "@/content/services";
import { usePageMeta, pageTitle } from "@/lib/seo";
import { NotFound } from "./NotFound";

export function ServiceDetail() {
  const { service: slug } = useParams<{ service: string }>();
  const service = slug ? findService(slug) : undefined;

  usePageMeta(
    pageTitle(service?.name ?? "Service unavailable"),
    service?.copy ?? "Service unavailable.",
  );

  if (!service) return <NotFound />;

  return (
    <PageMotion key={service.slug}>
      <main>
        <EditorialHero
          eyebrow="iVantage / Expertise"
          title={
            <span className="mask-line">
              <span>{service.name}</span>
            </span>
          }
          copy={service.copy}
          footLeft={service.shortName}
          footRight="Service / Digital product engineering"
        >
          <TalkAction />
        </EditorialHero>

        <section className="section">
          <div className="container">
            <div className="service-detail-intro reveal">
              <div className="detail-icon">
                <service.icon size={40} strokeWidth={1.1} />
              </div>
              <div>
                <div className="eyebrow">Built with purpose</div>
                <h2>{service.intro}</h2>
                <p>{service.details}</p>
              </div>
            </div>
            <div className="focus-grid reveal-stagger">
              {service.focus.map((item, index) => (
                <article className="focus-item" key={item}>
                  <span>0{index + 1}</span>
                  <h3>{item}</h3>
                  <ArrowUpRight size={20} strokeWidth={1.3} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />

        <section className="section section--tight">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">Connected expertise</div>
                <h2>
                  Explore more <em>services.</em>
                </h2>
              </div>
            </div>
            <div className="related-links reveal-stagger">
              {services
                .filter((item) => item.slug !== service.slug)
                .map((item) => (
                  <Link key={item.slug} to={`/services/${item.slug}`}>
                    {item.shortName}
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <ConversationBand />
      </main>
    </PageMotion>
  );
}
