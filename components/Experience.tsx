import { experience } from "@/lib/content";
import SectionHeading from "./SectionHeading";
export default function Experience() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section container"
      aria-label="Professional experience"
    >
      <SectionHeading
        number="02"
        label="EXPERIENCE"
        title="Applied in the real world."
        description="Industry experience across AI backends, model evaluation, and web development."
      />
      <div className="experience-list">
        {experience.map((role, index) => (
          <article className="experience-row" key={role.company}>
            <div className="experience-meta">
              <span className="mono">{role.period}</span>
              <h3>{role.company}</h3>
              <p>
                {role.location.replace("On-site ", "")}
                {role.type === "On-site" && <span> · On-site</span>}
              </p>
            </div>
            <div className="experience-body">
              <div className="role-title">
                <span className="role-marker" aria-hidden="true" />
                <h4>{role.role}</h4>
                {index === 0 && (
                  <span className="latest-label mono">MOST RECENT</span>
                )}
              </div>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="technology-line">{role.tags.join(" · ")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
