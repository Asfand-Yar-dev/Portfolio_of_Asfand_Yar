"use client";

import { useEffect } from "react";

/** Progress follows scrolling in either direction, without intercepting native scroll. */
export default function ScrollExperience() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".hero-copy, .hero-bottom, .discipline-strip, .section-heading, .about-profile > div, .about-copy > p, .about-focus, .experience-row, .featured-project, .client-work > .eyebrow, .client-project, .library-heading, .archive-list article, #projects > .text-link, .stack-row, .service-columns article, .contact-grid > div:first-child > *, .contact-links > *, .footer",
      ),
    );
    let observer: IntersectionObserver | undefined;
    const animations = new Map<Element, Animation>();
    const reset = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      elements.forEach((element) => element.classList.remove("scroll-scene"));
    };
    const setup = () => {
      reset();
      if (preference.matches) return;
      if (CSS.supports("animation-timeline: view()")) {
        elements.forEach((element) => element.classList.add("scroll-scene"));
        return;
      }
      // Older browsers replay the entrance whenever an item returns to the viewport.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            animations.get(entry.target)?.cancel();
            if (!entry.isIntersecting) return;
            animations.set(
              entry.target,
              entry.target.animate(
                [
                  { opacity: 0.15, transform: "translateY(30px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 600, easing: "cubic-bezier(.2,.65,.3,1)" },
              ),
            );
          });
        },
        { threshold: 0, rootMargin: "-24px 0px -24px 0px" },
      );
      elements.forEach((element) => observer?.observe(element));
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      reset();
      preference.removeEventListener("change", setup);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
