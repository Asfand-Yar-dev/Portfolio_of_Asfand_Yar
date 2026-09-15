"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, site } from "@/lib/site";
import Icon from "./Icon";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [light, setLight] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const themeBusy = useRef(false);
  const menuAnimation = useRef<Animation | null>(null);
  const menuTarget = useRef(false);
  const animateMenu = useCallback((expanded: boolean) => {
    const details = menu.current;
    const panel = details?.querySelector("nav");
    if (!details || !panel) return;
    const style = getComputedStyle(panel);
    const from = details.open
      ? { opacity: style.opacity, transform: style.transform }
      : { opacity: "0", transform: "translateY(-12px)" };
    menuAnimation.current?.cancel();
    menuTarget.current = expanded;
    setOpen(expanded);
    const finish = () => {
      details.open = expanded;
      menuAnimation.current = null;
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    details.open = true;
    const animation = panel.animate(
      [
        from,
        {
          opacity: expanded ? "1" : "0",
          transform: expanded ? "translateY(0)" : "translateY(-12px)",
        },
      ],
      { duration: expanded ? 320 : 220, easing: "cubic-bezier(.22,.68,.25,1)" },
    );
    menuAnimation.current = animation;
    animation.onfinish = finish;
  }, []);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        animateMenu(false);
        menu.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(event.target as Node))
        animateMenu(false);
    };
    const wide = window.matchMedia("(min-width: 900px)");
    const closeWide = () => {
      if (wide.matches && menu.current) animateMenu(false);
    };
    wide.addEventListener("change", closeWide);
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      menuAnimation.current?.cancel();
      observer.disconnect();
      wide.removeEventListener("change", closeWide);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [animateMenu]);

  function toggleTheme() {
    if (themeBusy.current) return;
    const next = !light;
    const update = () => {
      document.documentElement.dataset.theme = next ? "light" : "dark";
      setLight(next);
      try {
        localStorage.setItem("portfolio-theme", next ? "light" : "dark");
      } catch {
        /* Theme still works when storage is unavailable. */
      }
    };
    if (
      document.startViewTransition &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      themeBusy.current = true;
      const transition = document.startViewTransition(update);
      void transition.finished
        .catch(() => {})
        .finally(() => {
          themeBusy.current = false;
        });
    } else update();
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="#home">
          <span className="brand-symbol" aria-hidden="true">
            a<span>y</span>
            <i />
          </span>
          <span>
            Asfand Yar<span className="brand-period">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.slice(1).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={
              light ? "Switch to dark theme" : "Switch to light theme"
            }
          >
            <Icon name={light ? "moon" : "sun"} />
          </button>
          <a
            className="header-resume"
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <Icon name="external" />
          </a>
          <details
            className="mobile-menu"
            ref={menu}
            onToggle={(event) => {
              if (!menuAnimation.current) {
                setOpen(event.currentTarget.open);
                menuTarget.current = event.currentTarget.open;
              }
            }}
          >
            <summary
              aria-label="Navigation"
              aria-controls="mobile-navigation"
              aria-expanded={open}
              onClick={(event) => {
                event.preventDefault();
                animateMenu(!menuTarget.current);
              }}
            >
              <Icon name={open ? "close" : "menu"} />
            </summary>
            <nav id="mobile-navigation" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={() => {
                    if (menu.current) animateMenu(false);
                    document
                      .getElementById(item.id)
                      ?.focus({ preventScroll: true });
                  }}
                >
                  {item.label}
                  <Icon name="external" />
                </a>
              ))}
              <a href={site.resume} target="_blank" rel="noopener noreferrer">
                View resume <Icon name="download" />
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
