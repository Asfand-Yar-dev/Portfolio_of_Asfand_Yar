import { site } from "@/lib/site";
import Icon from "./Icon";
import ComputeCore from "./ComputeCore";
import RotatingRoles from "./RotatingRoles";

export default function Hero() {
  return (
    <section
      id="home"
      tabIndex={-1}
      className="hero container"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-identity">
            <div>
              <p className="eyebrow">SOFTWARE · BACKEND · AI</p>
              <h1 id="hero-title">
                Asfand Yar<span className="accent"></span>
              </h1>
            </div>
          </div>
          <RotatingRoles />
          <p className="hero-description">
            I build backend services, APIs, and AI-powered applications —
            connecting LLMs, RAG pipelines, and agents with the software that
            makes them useful.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="button button-primary">
              View projects <Icon name="arrow" />
            </a>
            <a
              href={site.resume}
              className="button button-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume <Icon name="external" />
            </a>
          </div>
          <div className="hero-social">
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              <Icon name="github" /> GitHub <Icon name="external" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <Icon name="external" />
            </a>
            <span className="social-divider" />
            <a href="#contact">
              Get in touch <Icon name="external" />
            </a>
          </div>
        </div>
        <ComputeCore />
      </div>
      <div className="hero-bottom">
        <p>
          <span className="status-dot" /> Open to opportunities{" "}
          <span className="muted">/</span>{" "}
          <span className="location">Islamabad, Pakistan</span>
        </p>
        <a href="#about" className="mono">
          EXPLORE THE PORTFOLIO <Icon name="down" />
        </a>
      </div>
      <div className="discipline-strip" aria-label="Engineering focus">
        <span>BACKEND SYSTEMS</span>
        <i>+</i>
        <span>GENERATIVE AI</span>
        <i>+</i>
        <span>RAG & AGENTS</span>
        <i>+</i>
        <span>PRODUCTION SOFTWARE</span>
      </div>
    </section>
  );
}
