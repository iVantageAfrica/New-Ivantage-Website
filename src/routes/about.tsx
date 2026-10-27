import { createFileRoute } from "@tanstack/react-router";
import { ConversationBand } from "@/components/portfolio-parts";
import { pageHead } from "@/lib/page-head";
import { PageMotion } from "@/components/page-motion";
import { EditorialHero, ProcessSection, TalkAction } from "@/components/inner-page";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About us",
      "Meet iVantage: thoughtful software development, user-centred design and maintainable engineering.",
    ),
  component: About,
});

const values = [
  { name: "Business-focused solutions", copy: "Start with the purpose, not the technology." },
  { name: "User-centered design", copy: "Keep the people using the product at the centre." },
  { name: "Maintainable engineering", copy: "Build foundations that can grow and evolve." },
  {
    name: "Reliable collaboration",
    copy: "Make space for clear conversations and shared decisions.",
  },
  { name: "Continuous improvement", copy: "Keep learning, refining, and moving forward." },
];

function About() {
  return (
    <PageMotion>
      <main>
        <EditorialHero
          eyebrow="About us"
          title={
            <>
              <span className="mask-line">
                <span>We are iVantage.</span>
              </span>
              <span className="mask-line">
                <span>
                  <em>Purpose in every pixel.</em>
                </span>
              </span>
            </>
          }
          copy="A software development and digital solutions company connecting business understanding, thoughtful design, and sound engineering."
        >
          <TalkAction />
        </EditorialHero>

        <section className="section about-story">
          <div className="container">
            <div className="eyebrow reveal">The thinking behind the technology</div>
            <div className="about-story-grid">
              <h2 className="reveal">
                Not just software.
                <br />
                A better way
                <br />
                to <em>move forward.</em>
              </h2>
              <div className="reveal">
                <p className="story-lead">
                  Good technology starts with understanding the real problem.
                </p>
                <p className="about-copy">
                  We bring product thinking, user-centred design, and practical engineering
                  together. Our focus is on digital experiences that make sense for the business and
                  feel natural to the people using them.
                </p>
                <div className="story-signature">
                  Business understanding <span>+</span> Design <span>+</span> Engineering
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <div>
                <div className="eyebrow">What guides us</div>
                <h2>
                  Our principles.
                  <br />
                  <em>In practice.</em>
                </h2>
              </div>
              <p>The things we keep coming back to, from first conversation to final detail.</p>
            </div>
            <div className="values-list reveal-stagger">
              {values.map((item, index) => (
                <article className="value-row" key={item.name}>
                  <span>0{index + 1}</span>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                  <ArrowUpRight strokeWidth={1} />
                </article>
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
