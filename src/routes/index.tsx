import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Code2, Mail, MessageSquare, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { CompanyGrid } from "@/components/portfolio-parts";
import { HeroOrbit } from "@/components/hero-orbit";
import { PageMotion } from "@/components/page-motion";
import { ProcessSection } from "@/components/inner-page";
import { services } from "@/content/services";
import { companies } from "@/content/portfolio";
import { contact } from "@/content/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iVantage — Thoughtful Technology. Real Impact." },
      {
        name: "description",
        content:
          "iVantage designs and develops web applications, mobile products and enterprise software for businesses and institutions. Explore our work and start a conversation.",
      },
      { property: "og:title", content: "iVantage — Thoughtful Technology. Real Impact." },
      {
        property: "og:description",
        content:
          "Digital product engineering built around your business. Discover iVantage’s work, services and approach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const principles = [
  "Business-focused solutions",
  "User-centered design",
  "Maintainable and scalable engineering",
  "Reliable collaboration",
  "Continuous improvement",
];

function Clients() {
  const items = companies.map((company) => (
    <Link
      key={company.slug}
      to="/work/$company"
      params={{ company: company.slug }}
      className={`client-logo${company.logoKind === "mark" ? " client-logo--mark" : ""}`}
      aria-label={`${company.name} — ${company.sector}`}
      title={company.name}
    >
      {company.logoUrl && <img src={company.logoUrl} alt="" loading="lazy" decoding="async" />}
    </Link>
  ));

  return (
    <section className="clients" aria-label="Selected clients">
      <div className="container">
        <p className="clients-label">Working with businesses that move the world forward</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">{items}</div>
        <div className="marquee-track" aria-hidden="true">
          {items}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <PageMotion>
      <main id="top">
        <section className="hero">
          <span className="hero-grid-lines" aria-hidden="true" />
          <span className="hero-glow hero-glow--a" aria-hidden="true" />
          <span className="hero-glow hero-glow--b" aria-hidden="true" />
          <div className="container hero-inner">
            <div>
              <div className="hero-badge">
                <span className="status-dot" />
                Software development &amp; digital solutions
              </div>
              <h1 className="hero-title">
                <span className="mask-line">
                  <span>Software built for</span>
                </span>
                <span className="mask-line">
                  <span>
                    <em>your business.</em>
                  </span>
                </span>
              </h1>
              <p className="hero-copy">
                We bring design and engineering together to create web applications, mobile
                products, and enterprise software that move your business forward.
              </p>
              <div className="hero-actions">
                <Button variant="brand" size="lg" asChild>
                  <Link to="/work">
                    Explore our work <ArrowUpRight />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Let’s talk</Link>
                </Button>
              </div>
              <ul className="hero-meta">
                {["Web applications", "Mobile products", "Enterprise software"].map((item) => (
                  <li key={item}>
                    <Check size={14} strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-visual">
              <HeroOrbit />
            </div>
          </div>
        </section>

        <Clients />

        <section className="section" id="work">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">01 / Selected work</div>
                <h2>
                  Work that earns
                  <br />
                  <em>trust.</em>
                </h2>
              </div>
              <p>
                Different industries. Unique challenges.
                <br />
                Thoughtfully crafted digital solutions.
              </p>
            </div>
            <CompanyGrid />
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">02 / What we do</div>
                <h2>
                  Technology built around
                  <br />
                  <em>your business.</em>
                </h2>
              </div>
              <p>
                From the first idea to the finished product, we bring design and engineering
                together.
              </p>
            </div>
            <div className="service-list reveal-stagger">
              {services.map((service, index) => (
                <Link
                  className="service"
                  key={service.slug}
                  to="/services/$service"
                  params={{ service: service.slug }}
                >
                  <span className="service-number">0{index + 1}</span>
                  <div className="service-name">
                    <service.icon strokeWidth={1.3} />
                    <h3>{service.name}</h3>
                  </div>
                  <p className="service-copy">{service.copy}</p>
                  <span className="service-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section band-dark" id="about">
          <div className="container about-grid">
            <div className="reveal">
              <div className="eyebrow">03 / Why iVantage</div>
              <h2>
                Good technology
                <br />
                solves <em>real problems.</em>
              </h2>
              <p className="about-copy">
                We are a software development and digital solutions company. We connect business
                understanding, thoughtful design, and sound engineering to build technology that
                matters.
              </p>
            </div>
            <ul className="principles reveal-stagger">
              {principles.map((principle, index) => (
                <li key={principle}>
                  <span>0{index + 1}</span>
                  {principle}
                  <Check />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProcessSection />

        <section className="section section--tight" id="contact">
          <div className="container contact-grid">
            <div className="contact-side reveal">
              <div className="eyebrow">04 / Let’s build something</div>
              <h2>
                Have a project
                <br />
                <em>in mind?</em>
              </h2>
              <p className="lead">
                Let’s discuss how technology can help your business move forward.
              </p>
              <a className="contact-email" href={contact.emailHref}>
                <Mail size={18} />
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
            </div>
            <div className="form-card reveal">
              <div className="form-heading">
                <span>Project inquiry</span>
                <span>Let’s get acquainted</span>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </PageMotion>
  );
}
