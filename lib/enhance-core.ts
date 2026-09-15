// Pointer input is event-driven; CSS handles the independent idle rotation.
export function enhanceCore(surface: HTMLElement) {
  const object = surface.querySelector<HTMLElement>("[data-core-object]");
  if (!object) return () => {};
  let frame = 0;
  let visible = false;
  let drag: { id: number; x: number; y: number } | null = null;
  const originalTouchAction = object.style.touchAction;
  object.style.touchAction = "none";
  const down = (event: PointerEvent) => {
    if (event.pointerType === "mouse") return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    object.setPointerCapture(event.pointerId);
  };
  const dragMove = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    const x = Math.max(-30, Math.min(30, (event.clientX - drag.x) * 0.3));
    const y = Math.max(-22, Math.min(22, (event.clientY - drag.y) * 0.3));
    object.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
  };
  const endDrag = () => {
    drag = null;
  };
  const scroll = () => {
    if (drag || frame || !visible || document.hidden || innerWidth >= 900)
      return;
    frame = requestAnimationFrame(() => {
      const bounds = surface.getBoundingClientRect();
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (innerHeight / 2 - bounds.top - bounds.height / 2) / innerHeight,
        ),
      );
      object.style.transform = `rotateX(${progress * 28}deg) rotateY(${progress * 36}deg)`;
      frame = 0;
    });
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || innerWidth < 900) return;
    if (frame || document.hidden) return;
    frame = requestAnimationFrame(() => {
      const bounds = surface.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      object.style.transform = `rotateX(${-y * 14}deg) rotateY(${x * 18}deg)`;
      frame = 0;
    });
  };
  const reset = () => {
    drag = null;
    cancelAnimationFrame(frame);
    frame = 0;
    object.style.transform = "";
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    surface.removeEventListener("pointermove", move);
    if (entry.isIntersecting)
      surface.addEventListener("pointermove", move, { passive: true });
    else reset();
    scroll();
  });
  observer.observe(surface);
  object.addEventListener("pointerdown", down);
  object.addEventListener("pointermove", dragMove);
  object.addEventListener("pointerup", endDrag);
  object.addEventListener("pointercancel", endDrag);
  object.addEventListener("lostpointercapture", endDrag);
  surface.addEventListener("pointerleave", reset);
  document.addEventListener("visibilitychange", reset);
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("resize", scroll, { passive: true });
  return () => {
    observer.disconnect();
    object.style.touchAction = originalTouchAction;
    object.removeEventListener("pointerdown", down);
    object.removeEventListener("pointermove", dragMove);
    object.removeEventListener("pointerup", endDrag);
    object.removeEventListener("pointercancel", endDrag);
    object.removeEventListener("lostpointercapture", endDrag);
    reset();
    surface.removeEventListener("pointermove", move);
    surface.removeEventListener("pointerleave", reset);
    document.removeEventListener("visibilitychange", reset);
    window.removeEventListener("scroll", scroll);
    window.removeEventListener("resize", scroll);
  };
}
