import SectionHeading from "./SectionHeading";
export default function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="section container"
      aria-label="About Asfand Yar"
    >
      <SectionHeading
        number="01"
        label="ABOUT"
        title="Built on engineering. Driven by possibility."
      />
      <div className="about-grid">
        <dl className="about-profile">
          <div>
            <dt>BACKGROUND</dt>
            <dd>
              Computer Science<span>BUITEMS · Expected Dec 2026</span>
            </dd>
          </div>
          <div>
            <dt>FOCUS</dt>
            <dd>
              Backend & generative AI<span>APIs, retrieval, and agents</span>
            </dd>
          </div>
          <div>
            <dt>BASED IN</dt>
            <dd>Islamabad, Pakistan</dd>
          </div>
        </dl>
        <div className="about-copy">
          <p className="large-copy">
            My work sits at the intersection of{" "}
            <strong>backend engineering</strong> and{" "}
            <strong>generative AI.</strong>
          </p>
          <p>
            I build Python and FastAPI backends, integrate language models, and
            develop retrieval pipelines that give AI applications the context
            they need. My experience spans enterprise AI features, model
            evaluation, data processing, and client web applications.
          </p>
          <p>
            I’m studying Computer Science at BUITEMS, with graduation expected
            in December 2026. I’m interested in the complete path from data to a
            useful product: how an API behaves, where context comes from, and
            how the pieces work together in production.
          </p>
          <div className="about-focus">
            <span>Reliable backends</span>
            <span>Context-aware AI</span>
            <span>Practical software</span>
          </div>
        </div>
      </div>
    </section>
  );
}
