import MotionSurface from "./MotionSurface";

const layers = [
  { name: "DATA", className: "core-data" },
  { name: "AI", className: "core-intelligence" },
  { name: "API", className: "core-application" },
];

export default function ComputeCore() {
  return (
    <MotionSurface core>
      <div className="figure-top mono">
        <span>
          <i className="status-dot" /> THE ANATOMY OF A SYSTEM
        </span>
        <span>FIG. 01</span>
      </div>
      <div
        className="core-stage"
        role="img"
        aria-label="A slowly rotating, three-dimensional stack of solid computational layers: data, intelligence and applications"
      >
        <div className="core-ground" aria-hidden="true" />
        <div className="core-pointer" data-core-object="" aria-hidden="true">
          <div className="core-assembly">
            {layers.map((layer, index) => (
              <div className={`core-layer ${layer.className}`} key={layer.name}>
                <div className="core-face core-face-top">
                  <svg
                    className="core-traces"
                    viewBox="0 0 220 220"
                    fill="none"
                  >
                    <g stroke="currentColor" strokeWidth="1">
                      <path d="M0 45h43l32 32m-75 7h48l28 22m-76 34h48l26-17M220 45h-43l-32 32m75 7h-48l-28 22m76 34h-48l-26-17M45 0v43l32 32m7-75v48l22 28M45 220v-43l32-32m7 75v-48l22-28M140 0v48l-17 26m17 146v-48l-17-26" />
                      <rect
                        x="17"
                        y="17"
                        width="186"
                        height="186"
                        rx="7"
                        strokeDasharray="2 8"
                      />
                    </g>
                  </svg>
                  <div className="core-die">
                    <span>{layer.name}</span>
                    <i />
                  </div>
                  <span className="core-serial">
                    0{index + 1} /{" "}
                    {index === 0
                      ? "STORAGE"
                      : index === 1
                        ? "INFERENCE"
                        : "INTERFACE"}
                  </span>
                  <span className="core-fastener pin-one" />
                  <span className="core-fastener pin-two" />
                  <span className="core-fastener pin-three" />
                  <span className="core-fastener pin-four" />
                </div>
                <div className="core-face core-face-bottom" />
                <div className="core-edge core-edge-front" />
                <div className="core-edge core-edge-back" />
                <div className="core-edge core-edge-left" />
                <div className="core-edge core-edge-right" />
              </div>
            ))}
          </div>
        </div>
        <div className="core-coordinate mono" aria-hidden="true">
          <span>Y</span>
          <i />
          <span>X</span>
        </div>
      </div>
      <figcaption id="core-caption" className="core-caption">
        <span>
          <i /> Data
        </span>
        <b>→</b>
        <span>
          <i /> Intelligence
        </span>
        <b>→</b>
        <span>
          <i /> Application
        </span>
      </figcaption>
    </MotionSurface>
  );
}

