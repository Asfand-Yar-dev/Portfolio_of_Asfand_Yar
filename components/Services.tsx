import SectionHeading from "./SectionHeading";
export default function Services() {
  return (
    <section
      id="services"
      tabIndex={-1}
      className="section container services-section"
      aria-label="Services"
    >
      <SectionHeading
        number="05"
        label="HOW I CAN HELP"
        title="From a backend to an AI workflow."
      />
      <div className="service-columns">
        <article>
          <span className="mono">01 / SOFTWARE</span>
          <h3>Backend & web development</h3>
          <p>
            Python and FastAPI services, API integrations, and responsive client
            applications built with React and Next.js.
          </p>
        </article>
        <article>
          <span className="mono">02 / INTELLIGENCE</span>
          <h3>AI systems & integrations</h3>
          <p>
            RAG pipelines, AI agents, voice interfaces, prompt engineering, and
            local or cloud LLM integration.
          </p>
        </article>
        <article>
          <span className="mono">03 / WORKFLOWS</span>
          <h3>Data & automation</h3>
          <p>
            ETL and data processing, model benchmarking, n8n workflows, and
            Docker-based application deployment.
          </p>
        </article>
      </div>
    </section>
  );
}
