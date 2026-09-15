import type { CSSProperties } from "react";

const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  external: "M7 17 17 7M7 7h10v10",
  down: "M12 4v16m-6-6 6 6 6-6",
  download: "M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5",
  plus: "M12 5v14M5 12h14",
  sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  moon: "M20.5 13a8.5 8.5 0 0 1-9.5-9.5A8.5 8.5 0 1 0 20.5 13Z",
  menu: "M4 8h16M4 16h16",
  close: "m6 6 12 12M6 18 18 6",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
  mail: "M3 5h18v14H3ZM3 5l9 8 9-8",
  linkedin:
    "M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM6.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5 9v10h3V9Zm5 0v10h3v-5.5c0-2.3 3-2.5 3 0V19h3v-6.3c0-4.4-4.5-4.6-6-2.5V9Z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.65 15.02L2 22l5.12-1.34A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.18 15.25l-.3-.18-3.02.79.8-2.94-.2-.32A8.2 8.2 0 0 1 12 3.8Zm-3.28 3.4c-.2-.45-.4-.46-.6-.47h-.51c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.98 2.63 1.12 2.81c.14.18 1.93 2.94 4.68 4.12 2.29.98 2.75.79 3.24.74.5-.05 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32l-1.84-.87c-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.18-1.34-.81-.73-1.36-1.63-1.52-1.9-.16-.27-.02-.42.12-.55l.4-.48c.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48Z",
  document: "M14 3H5v18h14V8ZM14 3v5h5M8 12h8M8 16h6",
  location:
    "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  github:
    "M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3.3-.4 6.7-1.6 6.7-7A5.4 5.4 0 0 0 19.2 4a5 5 0 0 0-.1-3s-1.2-.4-4.1 1.6a14 14 0 0 0-7 0C5.1.6 3.9 1 3.9 1a5 5 0 0 0-.1 3 5.4 5.4 0 0 0-1.5 4c0 5.4 3.4 6.6 6.7 7a3.5 3.5 0 0 0-1 3v4",
};

export default function Icon({
  name = "arrow",
  style,
}: {
  name?: keyof typeof paths;
  style?: CSSProperties;
}) {
  return (
    <svg
      className="icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={name === "linkedin" || name === "whatsapp" ? "currentColor" : "none"}
      fillRule="evenodd"
      stroke={name === "linkedin" || name === "whatsapp" ? "none" : "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name]} />
    </svg>
  );
}
