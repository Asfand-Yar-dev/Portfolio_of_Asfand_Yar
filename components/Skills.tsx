import { skills } from "@/lib/content";
import SectionHeading from "./SectionHeading";
const groups = [
  {
    name: "Backend engineering",
    detail: "Services, APIs & application logic",
    items: skills.Backend,
  },
  {
    name: "AI & generative systems",
    detail: "Retrieval, models & intelligent workflows",
    items: skills["AI & ML"]
      .filter((s) => !["Python", "FastAPI", "n8n"].includes(s))
      .concat(["LM Studio", "n8n"]),
  },
  {
    name: "Databases & storage",
    detail: "Relational, document & vector data",
    items: skills["Database & Cloud"],
  },
  {
    name: "Frontend",
    detail: "The interface to the system",
    items: skills.Frontend.filter((s) => s !== "UI Development"),
  },
  {
    name: "Infrastructure & tools",
    detail: "Building, testing & shipping",
    items: skills.Tools,
  },
];
export default function Skills() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      className="section container"
      aria-label="Technical skills"
    >
      <SectionHeading
        number="04"
        label="THE STACK"
        title="The right tools for the system."
        description="An engineering toolkit shaped by hands-on work, from the database to the interface."
      />
      <div className="stack-list">
        {groups.map((group, i) => (
          <div className="stack-row" key={group.name}>
            <span className="stack-index mono">0{i + 1}</span>
            <div>
              <h3>{group.name}</h3>
              <p>{group.detail}</p>
            </div>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
