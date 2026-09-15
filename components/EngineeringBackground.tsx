import MotionSurface from "./MotionSurface";

/** A single, texture-free architectural drawing shared by the entire page. */
export default function EngineeringBackground() {
  return (
    <MotionSurface>
      <div className="engineering-paper" />
      <svg
        className="engineering-field"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="field-ink" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="currentColor" stopOpacity=".08" />
            <stop offset=".65" stopColor="currentColor" stopOpacity=".8" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id="field-fade" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="white" stopOpacity=".8" />
            <stop offset=".2" stopColor="white" stopOpacity=".12" />
            <stop offset=".52" stopColor="white" stopOpacity=".08" />
            <stop offset=".77" stopColor="white" stopOpacity=".45" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <mask id="field-mask">
            <rect width="1440" height="1000" fill="url(#field-fade)" />
          </mask>
        </defs>
        <g mask="url(#field-mask)" stroke="url(#field-ink)" strokeWidth=".8">
          <g className="field-strata">
            {Array.from({ length: 17 }, (_, i) => (
              <path
                key={i}
                d={`M${720 + i * 27} -80 L${1050 + i * 27} 170 Q${1160 + i * 17} 254 ${1040 + i * 24} 388 L${730 + i * 30} 750 L${1180 + i * 24} 1100`}
              />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <path
                key={`cross-${i}`}
                d={`M${829 + i * 21} ${15 + i * 69} l440 275`}
              />
            ))}
          </g>
          <g className="field-contours">
            {Array.from({ length: 13 }, (_, i) => (
              <path
                key={i}
                d={`M-100 ${410 + i * 25} C${200 + i * 13} ${370 + i * 24} ${280 + i * 19} ${670 + i * 16} ${120 + i * 23} ${875 + i * 19} S${80 + i * 23} 1100 430 1150`}
              />
            ))}
          </g>
          <path
            className="field-rail"
            d="M48 0v275l24 24v358l-24 24v319M1392 0v385l-24 24v321l24 24v246"
          />
          <path d="M24 125h48m-24-24v48m1320 675h48m-24-24v48M1200 48h48m-24-24v48" />
          <g className="field-nodes">
            {[
              [48, 275],
              [72, 299],
              [72, 657],
              [48, 681],
              [1392, 385],
              [1368, 409],
              [1368, 730],
              [1392, 754],
              [1108, 274],
              [1181, 568],
              [1295, 731],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
            ))}
          </g>
        </g>
      </svg>
      <div className="field-signal field-signal-left" />
      <div className="field-signal field-signal-right" />
    </MotionSurface>
  );
}

