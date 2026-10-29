import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companies, type Company } from "@/content/portfolio";

export function BrowserFrame({
  src,
  alt,
  eager = false,
  caption,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  caption?: string;
}) {
  return (
    <div className="frame">
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dot" />
        <span className="frame-dot" />
        <span className="frame-dot" />
        <span className="frame-url" />
      </div>
      <div className="frame-body">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
        />
      </div>
      {caption && <span className="concept-label">{caption}</span>}
    </div>
  );
}

export function CompanyGrid() {
  return (
    <div className="work-grid reveal-stagger">
      {companies.map((company, index) => {
        const image = company.card ?? { url: company.cover, alt: company.coverAlt };

        return (
          <article className="project" key={company.slug}>
            <Link
              to="/work/$company"
              params={{ company: company.slug }}
              className="project-link"
              aria-label={`View ${company.name} portfolio`}
            >
              <div className="project-image">
                <img src={image.url} alt={image.alt} loading="lazy" decoding="async" />
                <span className="project-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <div className="project-info">
                <div>
                  <h3>{company.name}</h3>
                  <p className="project-sector">
                    <span>{company.sector}</span>
                    <span aria-hidden="true" className="sector-dot">
                      ·
                    </span>
                    <span>
                      {String(company.products.length).padStart(2, "0")} product
                      {company.products.length === 1 ? "" : "s"}
                    </span>
                  </p>
                </div>
                <span className="project-index">0{index + 1}</span>
              </div>
            </Link>
            <p className="project-description">{company.summary}</p>
          </article>
        );
      })}
    </div>
  );
}

export function ConversationBand() {
  return (
    <section className="conversation-band">
      <div className="container conversation-inner">
        <div>
          <div className="eyebrow">Your next chapter</div>
          <h2>
            Let’s build something
            <br />
            that <em>matters.</em>
          </h2>
        </div>
        <Button asChild variant="brand" size="lg" className="btn-icon-slide">
          <Link to="/contact">
            Start a conversation <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function ProductEmpty() {
  return (
    <div className="products-empty">
      <Layers3 size={30} strokeWidth={1.2} />
      <h3>Product stories are coming soon.</h3>
      <p>Published products, screenshots, and project details will appear here.</p>
    </div>
  );
}

export function NextCompany({ company }: { company: Company }) {
  return (
    <section className="next-company">
      <div className="container">
        <span className="eyebrow">Next company</span>
        <Link to="/work/$company" params={{ company: company.slug }}>
          <h2>{company.name}</h2>
          <ArrowRight strokeWidth={1} />
        </Link>
      </div>
    </section>
  );
}

export function CompanyLogoCard({ company }: { company: Company }) {
  return (
    <div className="company-logo-card">
      {company.logoUrl ? (
        <img src={company.logoUrl} alt={`${company.name} logo`} width={140} height={62} />
      ) : (
        <span className="company-logo-placeholder">
          <Layers3 size={22} strokeWidth={1.3} />
          {company.shortName}
        </span>
      )}
    </div>
  );
}
