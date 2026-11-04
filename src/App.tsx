import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { About } from "@/pages/About";
import { CompanyPortfolio } from "@/pages/CompanyPortfolio";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { ServiceDetail } from "@/pages/ServiceDetail";
import { Services } from "@/pages/Services";
import { Work } from "@/pages/Work";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (hash) return;
    const html = document.documentElement;
    html.classList.add("scroll-jump");
    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0));
    const timer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      html.classList.remove("scroll-jump");
    }, 120);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      html.classList.remove("scroll-jump");
    };
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:company" element={<CompanyPortfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
