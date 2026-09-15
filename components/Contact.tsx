import { site } from "@/lib/site";
import Icon from "./Icon";
export default function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">
            <span>06</span> / CONTACT
          </p>
          <h2 id="contact-title">
            Have something
            <br />
            worth building<span className="accent">?</span>
          </h2>
          <p className="contact-description">
            I’m open to software engineering roles and freelance projects. Get
            in touch to discuss the work.
          </p>
          <a className="contact-email" href={`mailto:${site.email}`}>
            <Icon name="mail" />
            {site.email}
            <Icon name="external" />
          </a>
          <p className="contact-location">
            <Icon name="location" /> Based in Islamabad, Pakistan
          </p>
        </div>
        <div className="contact-links">
          <span className="mono">START A CONVERSATION</span>
          <a href={`mailto:${site.email}`}>
            <span className="contact-link-label">
              <Icon name="mail" /> Email
            </span>{" "}
            <Icon name="external" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="contact-link-label">
              <Icon name="linkedin" /> LinkedIn
            </span>{" "}
            <Icon name="external" />
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            <span className="contact-link-label">
              <Icon name="github" /> GitHub
            </span>{" "}
            <Icon name="external" />
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="contact-link-label">
              <Icon name="whatsapp" /> WhatsApp
            </span>{" "}
            <Icon name="external" />
          </a>
          <a href={site.resume} download>
            <span className="contact-link-label">
              <Icon name="document" /> Download resume
            </span>{" "}
            <Icon name="download" />
          </a>
        </div>
      </div>
    </section>
  );
}
