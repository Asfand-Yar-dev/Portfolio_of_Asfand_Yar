"use client";

import { useEffect, useRef, useState } from "react";

const roles = [
  "AI First Software Developer",
  "Gen AI Engineer",
  "Prompt Engineer",
  "Python & LLM Engineer",
  "RAG Pipeline Builder",
  "Backend Developer",
  "Frontend Developer",
];

export default function RotatingRoles() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let resumePending = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => {
      clearInterval(timer);
      if (visible && !document.hidden && !preference.matches) {
        if (resumePending) {
          setActive((index) => (index + 1) % roles.length);
          resumePending = false;
        }
        timer = setInterval(
          () => setActive((index) => (index + 1) % roles.length),
          2000,
        );
      }
    };
    const onVisibilityChange = () => {
      if (document.hidden) resumePending = true;
      update();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    if (ref.current) observer.observe(ref.current);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);
  return (
    <p
      className="hero-headline rotating-roles"
      role="group"
      ref={ref}
      aria-label={roles.join(", ")}
    >
      {roles.map((role, index) => (
        <span
          key={role}
          aria-hidden="true"
          className={index === active ? "role-active" : ""}
        >
          {role}
        </span>
      ))}
    </p>
  );
}
