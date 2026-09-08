"use client";

import { useEffect, useRef } from "react";

/**
 * Cycles the lens chooser until the visitor takes over.
 *
 * The tabs read as a control now, but nothing tells a first-time visitor that
 * four different readings sit behind them. Advancing on its own demonstrates
 * the section's whole claim — same property, four analyses — without asking
 * anyone to read an instruction first.
 *
 * It defers to the person completely: the first hover, focus, keypress or
 * click anywhere in the card hands over for good, it never starts under
 * prefers-reduced-motion, and it pauses whenever the card is off screen.
 *
 * The radios stay the source of truth — this only checks the next one and lets
 * the `:has()` CSS do the rest, so the card still works with JS disabled. It is
 * a separate island rather than making HeroVisual a client component, so the
 * overlay markup stays on the server and only this timer ships.
 */

/** Any of these means the visitor is driving; we stop for the rest of the session. */
const HANDOVER = ["pointerenter", "pointerdown", "focusin", "keydown"] as const;

/* Long enough to read the finding before it moves on. */
const INTERVAL_MS = 4500;

export function LensAutoplay() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fieldset = anchorRef.current?.closest("fieldset");
    if (!fieldset) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    let stopped = false;

    const advance = () => {
      const radios = Array.from(
        fieldset.querySelectorAll<HTMLInputElement>('input[name="hero-lens"]'),
      );
      if (radios.length === 0) return;

      const current = radios.findIndex((radio) => radio.checked);
      radios[(current + 1) % radios.length].checked = true;
    };

    const pause = () => {
      clearInterval(timer);
      timer = undefined;
    };

    const start = () => {
      if (stopped || timer) return;
      timer = setInterval(advance, INTERVAL_MS);
    };

    /* Only run while the card is actually on screen. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else pause();
      },
      { threshold: 0.4 },
    );

    const stop = () => {
      stopped = true;
      pause();
      observer.disconnect();
      HANDOVER.forEach((event) => fieldset.removeEventListener(event, stop));
    };

    HANDOVER.forEach((event) => fieldset.addEventListener(event, stop));
    observer.observe(fieldset);

    return () => {
      pause();
      observer.disconnect();
      HANDOVER.forEach((event) => fieldset.removeEventListener(event, stop));
    };
  }, []);

  return <span ref={anchorRef} hidden />;
}
