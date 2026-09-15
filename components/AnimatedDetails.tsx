"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AnimatedDetails({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const details = ref.current;
    const summary = details?.querySelector("summary");
    if (!details || !summary) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    let expanded = details.open;
    const finish = () => {
      animation?.cancel();
      animation = undefined;
      details.open = expanded;
      details.style.height = "";
      details.style.overflow = "";
      details.dataset.expanded = String(expanded);
    };
    const click = (event: MouseEvent) => {
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      animation?.cancel();
      expanded = !expanded;
      details.dataset.expanded = String(expanded);
      if (reduced.matches) {
        finish();
        return;
      }
      details.style.height = "";
      details.open = true;
      const end = expanded
        ? details.getBoundingClientRect().height
        : summary.getBoundingClientRect().height;
      details.style.overflow = "hidden";
      animation = details.animate(
        [{ height: `${start}px` }, { height: `${end}px` }],
        { duration: 320, easing: "cubic-bezier(.22,.68,.25,1)" },
      );
      animation.onfinish = finish;
    };
    const preferenceChange = () => {
      if (reduced.matches) finish();
    };
    summary.addEventListener("click", click);
    reduced.addEventListener("change", preferenceChange);
    window.addEventListener("resize", finish);
    return () => {
      finish();
      summary.removeEventListener("click", click);
      reduced.removeEventListener("change", preferenceChange);
      window.removeEventListener("resize", finish);
    };
  }, []);
  return (
    <details className="project-details" ref={ref}>
      {children}
    </details>
  );
}
