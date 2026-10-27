import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { findService, services } from "@/content/services";
import { ConversationBand } from "@/components/portfolio-parts";
import { pageHead } from "@/lib/page-head";
import { PageMotion } from "@/components/page-motion";
import { EditorialHero, ProcessSection, TalkAction } from "@/components/inner-page";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services/$service")({
  beforeLoad: ({ params }) => {
    if (!findService(params.service)) throw notFound();
  },
  head: ({ params }) => {
    const service = findService(params.service);
    return pageHead(
      service?.name ?? "Service unavailable",
      service?.copy ?? "Service unavailable.",
    );
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: slug } = Route.useParams();
  const service = findService(slug);
  if (!service) throw notFound();

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
                  <Link key={item.slug} to="/services/$service" params={{ service: item.slug }}>
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
