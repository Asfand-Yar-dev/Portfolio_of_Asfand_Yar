"use client";

import { useEffect, type RefObject } from "react";

/** CSS performs the animation; observers only control when it is allowed to run. */
export function useAmbientMotion(
  ref: RefObject<HTMLElement | null>,
  mobile = false,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = matchMedia(
      mobile
        ? "(prefers-reduced-motion: no-preference)"
        : "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & { saveData?: boolean };
      }
    ).connection;
    const bounds = element.getBoundingClientRect();
    let visible = bounds.bottom > 0 && bounds.top < innerHeight;
    const update = () => {
      const capable =
        !navigator.hardwareConcurrency || navigator.hardwareConcurrency > 2;
      element.dataset.motion =
        visible &&
        !document.hidden &&
        preference.matches &&
        capable &&
        !connection?.saveData
          ? "running"
          : "paused";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const recheck = () => {
      const rect = element.getBoundingClientRect();
      visible = rect.bottom > 0 && rect.top < innerHeight;
      update();
    };
    update();
    observer.observe(element);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", recheck);
    window.addEventListener("pageshow", recheck);
    connection?.addEventListener("change", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", recheck);
      window.removeEventListener("pageshow", recheck);
      connection?.removeEventListener("change", update);
      element.dataset.motion = "paused";
    };
  }, [ref, mobile]);
}
