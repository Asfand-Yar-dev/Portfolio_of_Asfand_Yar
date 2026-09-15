import AnimatedDetails from "./AnimatedDetails";
import { projects } from "@/lib/content";
import { site } from "@/lib/site";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import ProjectDiagram from "./ProjectDiagram";
import FinalYearProject from "./FinalYearProject";
export default function Projects() {
  return (
    <section
      id="projects"
      tabIndex={-1}
      className="section container"
      aria-label="Projects"
    >
      <SectionHeading
        number="03"
        label="SELECTED WORK"
        title="Ideas, engineered into systems."
        description="A closer look at the applications, pipelines, and tools I’ve built."
      />
      <FinalYearProject />
      <div className="featured-projects">
        {projects.slice(0, 2).map((project, index) => (
          <article className="featured-project" key={project.title}>
            <ProjectDiagram variant={index === 0 ? "voice" : "evaluation"} />
            <div className="project-body">
              <p className="eyebrow">
                <span>0{index + 1}</span> /{" "}
                {index === 0
                  ? "VOICE · RETRIEVAL · LOCAL AI"
                  : "LLMS · EVALUATION · BACKEND"}
              </p>
              <h3>{project.title}</h3>
              <p>
                {index === 0
                  ? "Context-aware conversation without a cloud dependency. A voice agent that retrieves relevant information and generates responses with a local language model."
                  : "A framework for making prompt iteration measurable, with automated evaluations and performance tracking across model versions."}
              </p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <AnimatedDetails>
                <summary>
                  Explore the technical approach <Icon name="plus" />
                </summary>
                <div>
                  <dl>
                    <dt>What I built</dt>
                    <dd>
                      {index === 0
                        ? "A conversational voice agent that connects speech processing, retrieval, and local LLM generation."
                        : "A prompt optimization framework with automated evaluation pipelines and few-shot template generation."}
                    </dd>
                    <dt>Technical approach</dt>
                    <dd>{project.description}</dd>
                    <dt>
                      {index === 0 ? "Retrieval & model" : "Backend & data"}
                    </dt>
                    <dd>
                      {index === 0
                        ? "LangChain, a vector store, and a local LLM served through LM Studio."
                        : "Python, FastAPI, the OpenAI API, and PostgreSQL."}
                    </dd>
                    <dt>Engineering focus</dt>
                    <dd>
                      {index === 0
                        ? "Connecting retrieved context with speech-driven queries while keeping the application offline-capable."
                        : "Comparing prompt strategies and tracking language model performance across versions."}
                    </dd>
                  </dl>
                </div>
              </AnimatedDetails>
            </div>
          </article>
        ))}
      </div>
      <div className="client-work">
        <p className="eyebrow">CLIENT APPLICATIONS</p>
        {projects.slice(3, 5).map((project) => (
          <article className="client-project" key={project.title}>
            <span className="client-icon">
              <Icon name="code" />
            </span>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="technology-line">{project.tech.join(" · ")}</p>
            </div>
            <a
              className="icon-button"
              href={project.live!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
            >
              <Icon name="external" />
            </a>
          </article>
        ))}
      </div>
      <div className="project-library">
        <div className="library-heading">
          <span>
            More things I’ve built{" "}
            <span className="mono archive-count">05 PROJECTS</span>
          </span>
        </div>
        <div className="archive-list">
          {projects
            .filter((_, i) => [2, 5, 6, 7, 8].includes(i))
            .map((project) => (
              <article key={project.title}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div>
                  <p className="technology-line">{project.tech.join(" · ")}</p>
                </div>
              </article>
            ))}
        </div>
      </div>
      <a
        className="text-link"
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        Find me on GitHub <Icon name="external" />
      </a>
    </section>
  );
}
