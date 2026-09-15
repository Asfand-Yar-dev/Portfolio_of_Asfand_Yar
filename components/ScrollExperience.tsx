"use client";

import { useEffect } from "react";

/** Fade only the pixels crossing viewport edges, never an entire content card. */
export default function ScrollExperience() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".hero-copy, .hero-bottom, .discipline-strip, .section-heading, .about-profile > div, .about-copy > p, .about-focus, .experience-row, .featured-project, .client-work > .eyebrow, .client-project, .library-heading, .archive-list article, #projects > .text-link, .stack-row, .service-columns article, .contact-grid > div:first-child > *, .contact-links > *, .footer",
      ),
    );
    const visible = new Set<HTMLElement>();
    const pending = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    const header = document.querySelector(".site-header");
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const paint = () => {
      frame = 0;
      if (preference.matches || document.hidden) return;
      const topEdge = header?.getBoundingClientRect().bottom ?? 0;
      const band = innerWidth <= 600 ? 24 : 36;
      const viewport = window.visualViewport;
      const viewportBottom =
        (viewport?.offsetTop ?? 0) + (viewport?.height ?? innerHeight);
      const bottomBand = innerWidth <= 600 ? 0 : 72;
      const remaining = Math.max(
        0,
        document.documentElement.scrollHeight - scrollY - viewportBottom,
      );
      // Let the last content become fully readable gradually, without an end-of-page switch.
      const bottomEdge = viewportBottom + Math.max(0, bottomBand - remaining);
      // Batch measurements before writes; only intersecting content is processed.
      const updates = [...visible].map((element) => {
        const rect = element.getBoundingClientRect();
        if (
          rect.top >= topEdge + band &&
          rect.bottom <= bottomEdge - bottomBand
        )
          return { element, mask: "" };
        const top = Math.max(0, topEdge - rect.top);
        const topEnd =
          rect.top < topEdge + band
            ? Math.max(0, topEdge + band - rect.top)
            : 0;
        const topMid = top + (topEnd - top) * 0.45;
        const bottomStart = Math.max(
          topEnd,
          bottomEdge - bottomBand - rect.top,
        );
        const bottomEnd = Math.max(bottomStart, bottomEdge - rect.top);
        const fadeWidth = bottomEnd - bottomStart;
        const mask = `linear-gradient(to bottom, transparent ${top}px, rgba(0,0,0,.65) ${topMid}px, black ${topEnd}px, black ${bottomStart}px, rgba(0,0,0,.9) ${bottomStart + fadeWidth * 0.25}px, rgba(0,0,0,.5) ${bottomStart + fadeWidth * 0.6}px, rgba(0,0,0,.12) ${bottomStart + fadeWidth * 0.85}px, transparent ${bottomEnd}px)`;
        return { element, mask };
      });
      updates.forEach(({ element, mask }) => {
        element.style.maskImage = mask;
      });
      // Keep the edge mask aligned during the brief entrance movement only.
      if (animations.size) frame = requestAnimationFrame(paint);
    };
    const schedule = () => {
      if (!frame && !preference.matches) frame = requestAnimationFrame(paint);
    };
    const reset = () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      frame = 0;
      visible.clear();
      pending.clear();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      elements.forEach((element) => {
        element.style.maskImage = "";
        element.classList.remove("edge-fade");
      });
    };
    const setup = () => {
      reset();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              visible.add(element);
              if (pending.delete(element)) {
                const distance = innerWidth <= 600 ? 10 : 16;
                const animation = element.animate(
                  [{ translate: `0 ${distance}px` }, { translate: "0 0" }],
                  { duration: 420, easing: "cubic-bezier(.22,.68,.25,1)" },
                );
                animations.add(animation);
                animation.onfinish = () => {
                  animations.delete(animation);
                  schedule();
                };
                animation.oncancel = () => animations.delete(animation);
              }
            } else {
              visible.delete(element);
              element.style.maskImage = "";
            }
          });
          schedule();
        },
        { rootMargin: "160px 0px 0px 0px" },
      );
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top >= innerHeight)
          pending.add(element);
        element.classList.add("edge-fade");
        observer?.observe(element);
      });
    };
    setup();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    document.addEventListener("visibilitychange", schedule);
    preference.addEventListener("change", setup);
    return () => {
      reset();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
      preference.removeEventListener("change", setup);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
