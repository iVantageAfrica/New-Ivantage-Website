import { createFileRoute } from "@tanstack/react-router";
import { CompanyGrid, ConversationBand } from "@/components/portfolio-parts";
import { EditorialHero } from "@/components/inner-page";
import { pageHead } from "@/lib/page-head";
import { PageMotion } from "@/components/page-motion";

export const Route = createFileRoute("/work/")({
  head: () =>
    pageHead(
      "Our work",
      "Explore iVantage company portfolios across banking, property, construction and transportation.",
    ),
  component: Work,
});

function Work() {
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
