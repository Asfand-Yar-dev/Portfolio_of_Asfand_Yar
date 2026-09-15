import Icon from "./Icon";

// Only verified matches belong here. Similar repository names are not enough.
const repositories: Record<string, string> = {
  Intervexa: "https://github.com/Asfand-Yar-dev/Intervexa",
  "Developer Portfolio":
    "https://github.com/Asfand-Yar-dev/Portfolio_of_Asfand_Yar",
  "Snake Game Arcade":
    "https://github.com/Asfand-Yar-dev/Snake-Game-Arcade-in-Python",
};
export default function ProjectLinks({
  title,
  live,
}: {
  title: string;
  live?: string | null;
}) {
  const repository = repositories[title];
  if (!repository && !live) return null;
  return (
    <div className="project-links">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live site: ${title}`}
        >
          Live site <Icon name="external" />
        </a>
      )}
      {repository && (
        <a
          href={repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View code: ${title}`}
        >
          <Icon name="github" /> View code <Icon name="external" />
        </a>
      )}
    </div>
  );
}
