export default function ProjectDiagram({
  variant,
}: {
  variant: "voice" | "evaluation";
}) {
  const voice = variant === "voice";
  return (
    <figure className="project-diagram">
      <div className="diagram-caption mono">
        <span>
          {voice ? "CONTEXT-AWARE CONVERSATION" : "PROMPT EVALUATION WORKFLOW"}
        </span>
        <span>{voice ? "01" : "02"}</span>
      </div>
      <svg
        viewBox="0 0 540 220"
        role="img"
        aria-label={
          voice
            ? "Conceptual flow: speech input, context retrieval from a vector store, local language model, response"
            : "Conceptual flow: prompt templates, model evaluation, and performance tracking"
        }
      >
        <g className="diagram-wires" fill="none" stroke="currentColor">
          <path d="M98 110h45m112 0h37m112 0h40" />
          {voice ? (
            <path d="M199 80V43h93v37" strokeDasharray="4 4" />
          ) : (
            <path d="M348 141v43H199v-43" strokeDasharray="4 4" />
          )}
        </g>
        {[42, 143, 292, 444].map((x, i) => (
          <rect
            key={x}
            x={x}
            y="80"
            width={i === 1 || i === 2 ? 112 : 54}
            height="61"
            rx="3"
            className={i === 2 ? "diagram-box-accent" : "diagram-box"}
          />
        ))}
        <g className="diagram-text" textAnchor="middle">
          <text x="69" y="106">
            {voice ? "SPEECH" : "INPUT"}
          </text>
          <text x="69" y="122">
            {voice ? "INPUT" : "PROMPT"}
          </text>
          <text x="199" y="106">
            {voice ? "CONTEXT" : "FEW-SHOT"}
          </text>
          <text x="199" y="122">
            {voice ? "RETRIEVAL" : "TEMPLATES"}
          </text>
          <text x="348" y="106">
            {voice ? "LOCAL LLM" : "MODEL"}
          </text>
          <text x="348" y="122">
            {voice ? "LM STUDIO" : "EVALUATION"}
          </text>
          <text x="471" y="114">
            {voice ? "REPLY" : "RESULT"}
          </text>
          <text x={voice ? 246 : 273} y={voice ? 32 : 207}>
            {voice ? "VECTOR STORE" : "PERFORMANCE TRACKING"}
          </text>
        </g>
        <g className="diagram-points">
          <circle cx="119" cy="110" r="3" />
          <circle cx="274" cy="110" r="3" />
          <circle cx="424" cy="110" r="3" />
        </g>
      </svg>
      <figcaption className="mono">
        {voice
          ? "Speech → retrieval → generation"
          : "Templates → evaluation → iteration"}
        <span>CONCEPTUAL FLOW</span>
      </figcaption>
    </figure>
  );
}
