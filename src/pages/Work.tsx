import { CompanyGrid, ConversationBand } from "@/components/portfolio-parts";
import { EditorialHero } from "@/components/inner-page";
import { PageMotion } from "@/components/page-motion";
import { usePageMeta, pageTitle } from "@/lib/seo";

export function Work() {
  usePageMeta(
    pageTitle("Our work"),
    "Explore iVantage company portfolios across banking, property, construction and transportation.",
  );

  return (
    <PageMotion>
      <main>
        <EditorialHero
          eyebrow="Our work / Company portfolios"
          title={
            <>
              <span className="mask-line">
                <span>Different businesses.</span>
              </span>
              <span className="mask-line">
                <span>
                  <em>Shared ambition.</em>
                </span>
              </span>
            </>
          }
          copy="Banking. Property. Construction. Transportation. Explore the businesses behind our digital work."
          footRight="iVantage — Work index"
        />

        <section className="section work-directory">
          <div className="container">
            <CompanyGrid />
          </div>
        </section>

        <ConversationBand />
      </main>
    </PageMotion>
  );
}
