"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAmbientMotion } from "@/lib/use-ambient-motion";

/** Keep the static scene markup on the server; hydrate only motion controls. */
export default function MotionSurface({
  children,
  core = false,
}: {
  children: ReactNode;
  core?: boolean;
}) {
  const surface = useRef<HTMLDivElement>(null);
  useAmbientMotion(surface, core);
  useEffect(() => {
    if (!core) return;
    const preference = matchMedia("(prefers-reduced-motion: no-preference)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const enable = async () => {
      cleanup?.();
      if (
        !preference.matches ||
        connection?.saveData ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)
      )
        return;
      try {
        const { enhanceCore } = await import("@/lib/enhance-core");
        if (!disposed && preference.matches && surface.current)
          cleanup = enhanceCore(surface.current);
      } catch {
        /* The dimensional CSS object remains available if enhancement cannot load. */
      }
    };
    void enable();
    preference.addEventListener("change", enable);
    return () => {
      disposed = true;
      preference.removeEventListener("change", enable);
      cleanup?.();
    };
  }, [core]);
  const Tag = core ? "figure" : "div";
  return (
    <Tag
      className={core ? "compute-core" : "engineering-background"}
      ref={surface}
      data-motion="paused"
      aria-labelledby={core ? "core-caption" : undefined}
      aria-hidden={core ? undefined : true}
    >
      {children}
    </Tag>
  );
}
