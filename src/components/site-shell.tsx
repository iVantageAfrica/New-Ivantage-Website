import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand, BrandLogo } from "@/components/brand";
import { SocialLinks } from "@/components/social-links";
import { services } from "@/content/services";
import { companies } from "@/content/portfolio";
import { contact } from "@/content/contact";

const nav = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const path = useLocation({ select: (l) => l.pathname });

  useEffect(() => setMenu(false), [path]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="container nav" aria-label="Main navigation">
          <Brand />
          <div className="nav-links">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link"
                aria-current={isActive(path, item.to) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="charcoal" size="sm" asChild className="nav-cta">
              <Link to="/contact">
                Start a project <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="menu-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="menu-panel"
            onClick={() => setMenu((open) => !open)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </nav>
        <span className="scroll-progress" ref={progress} aria-hidden="true" />
      </header>

      <div
        id="menu-panel"
        className={`menu-panel ${menu ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menu}
      >
        <div className="menu-head">
          <Link to="/" className="brand menu-brand" aria-label="iVantage home">
            <BrandLogo />
          </Link>
          <button
            type="button"
            className="menu-close"
            onClick={() => setMenu(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {nav.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="menu-link"
              style={{ "--i": index } as CSSProperties}
              aria-current={isActive(path, item.to) ? "page" : undefined}
              onClick={() => setMenu(false)}
            >
              <span>{item.label}</span>
              <span>0{index + 1}</span>
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <div className="menu-foot-row">
            <a href={contact.emailHref}>{contact.email}</a>
            <span>Lagos, Nigeria</span>
          </div>
          <SocialLinks tone="dark" />
        </div>
      </div>
    </>
  );
}

function isActive(path: string, to: string) {
  return to === "/" ? path === "/" : path.startsWith(to);
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              Thoughtful software. Meaningful experiences. Technology that moves businesses forward.
            </p>
            <SocialLinks />
          </div>
          <div className="footer-links">
            <div>
              <h3>Explore</h3>
              {nav.slice(1).map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <h3>Clients</h3>
              {companies.map((company) => (
                <Link key={company.slug} to="/work/$company" params={{ company: company.slug }}>
                  {company.shortName}
                </Link>
              ))}
            </div>
            <div>
              <h3>Expertise</h3>
              {services.map((service) => (
                <Link key={service.slug} to="/services/$service" params={{ service: service.slug }}>
                  {service.shortName}
                </Link>
              ))}
            </div>
            <div>
              <h3>Get in touch</h3>
              <a href={contact.emailHref}>{contact.email}</a>
              <Link to="/contact">Tell us about your project</Link>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>
        <div className="footer-watermark" aria-hidden="true">
          ivantage
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} iVantage. All rights reserved.</span>
          <a
            href="#top"
            className="to-top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
