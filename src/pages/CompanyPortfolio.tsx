import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BrowserFrame,
  CompanyLogoCard,
  ConversationBand,
  NextCompany,
  ProductEmpty,
} from "@/components/portfolio-parts";
import { PageMotion } from "@/components/page-motion";
import { companies, findCompany } from "@/content/portfolio";
import { usePageMeta, pageTitle } from "@/lib/seo";
import { NotFound } from "./NotFound";

export function CompanyPortfolio() {
  const { company: slug } = useParams<{ company: string }>();
  const company = slug ? findCompany(slug) : undefined;

  usePageMeta(
    pageTitle(company?.name ?? "Portfolio unavailable"),
    company?.summary ?? "Company portfolio unavailable.",
  );

  if (!company) return <NotFound />;

  const index = companies.findIndex((item) => item.slug === company.slug);
  const next = companies[(index + 1) % companies.length];

  return (
    <PageMotion key={company.slug}>
      <main>
        <section className="company-intro">
          <div className="container">
            <Button variant="link" asChild className="back-link">
              <Link to="/work">
                <ArrowLeft /> All companies
              </Link>
            </Button>
            <div className="company-title-row">
              <div>
                <div className="eyebrow reveal">{company.sector}</div>
                <h1 className="reveal">{company.name}</h1>
                <p className="editorial-copy reveal">{company.summary}</p>
              </div>
              <div className="reveal">
                <CompanyLogoCard company={company} />
              </div>
            </div>
            <div className="company-meta">
              <span>Company portfolio</span>
              <span>Design / Technology / Digital experiences</span>
              <span>
                0{index + 1} / {String(companies.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </section>

        <section className="company-cover" aria-label={`${company.shortName} portfolio visual`}>
          <div className="container">
            <div className="company-cover-frame reveal">
              <BrowserFrame src={company.cover} alt={company.coverAlt} eager />
            </div>
          </div>
        </section>

        <section className="section product-section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">The portfolio</div>
                <h2>
                  Products &amp; projects
                  <span className="project-count">
                    {String(company.products.length).padStart(2, "0")}
                  </span>
                </h2>
              </div>
              <p>Digital work for {company.shortName}.</p>
            </div>

            {company.products.length === 0 ? (
              <ProductEmpty />
            ) : (
              <div className="product-list">
                {company.products.map((product) => (
                  <article className="product-feature reveal" key={product.slug}>
                    <BrowserFrame
                      src={product.screenshots[0]?.url ?? company.cover}
                      alt={product.screenshots[0]?.alt ?? product.name}
                    />
                    <div className="product-copy">
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p>{product.summary}</p>
                      {product.features.length > 0 && (
                        <ul>
                          {product.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      )}
                      {product.liveUrl && (
                        <Button variant="link" asChild>
                          <a href={product.liveUrl} target="_blank" rel="noopener noreferrer">
                            Visit product <ArrowUpRight />
                          </a>
                        </Button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {next && <NextCompany company={next} />}
        <ConversationBand />
      </main>
    </PageMotion>
  );
}
