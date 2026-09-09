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
 * It defers to the person completely: choosing a lens hands over for the rest
 * of the session, hovering pauses while they read, it never starts under
 * prefers-reduced-motion, and it pauses whenever the card is off screen.
 *
 * The radios stay the source of truth — this only checks the next one and lets
 * the `:has()` CSS do the rest, so the card still works with JS disabled. It is
 * a separate island rather than making HeroVisual a client component, so the
 * overlay markup stays on the server and only this timer ships.
 */

/**
 * A real choice — the visitor is driving, so we stop for good.
 *
 * Deliberately not `pointerenter`/`pointerdown`. Merely being under the cursor
 * is not a decision, and treating it as one is why the cycle looked broken at
 * narrow widths: the card spans most of the viewport there, so the pointer sits
 * on it by default and killed the timer before a single tab advanced. On touch
 * it was worse — the finger that starts a scroll fires both. Hover now pauses
 * instead (see below), and only these mean hands off.
 *
 * `advance()` sets `checked` directly, which fires no `change`, so the timer
 * never hands over to itself.
 */
const HANDOVER = ["change", "focusin", "keydown"] as const;

/**
 * Hovering is reading, not choosing: hold while the pointer rests on the card,
 * and pick up again when it leaves.
 *
 * Not gated on `(hover: hover)` — headless Chrome and some touchscreen laptops
 * report `hover: none` and would lose the pause entirely. A touch pointer does
 * fire enter on tap, so `pointercancel` is listened for alongside `pointerleave`:
 * a gesture the browser takes over (a scroll) ends in cancel, not leave, and
 * without it one swipe would leave the card paused for good.
 */
const PAUSE = ["pointerenter", "pointerleave", "pointercancel"] as const;

/* Long enough to read the finding before it moves on. */
const INTERVAL_MS = 3500;

/**
 * The first hand-off is short on purpose.
 *
 * At rest the card looks static, so a visitor who glances away in the first
 * couple of seconds never learns the tabs move at all. Moving sunlight ->
 * ventilation quickly proves the control is live while they are still looking
 * at it; every advance after that runs at the reading pace above. Applies to
 * the one HeroVisual, so both the mobile and desktop layouts get it.
 */
const FIRST_INTERVAL_MS = 1500;

export function LensAutoplay() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fieldset = anchorRef.current?.closest("fieldset");
    if (!fieldset) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    let onScreen = false;
    let hovered = false;
    let advancedOnce = false;

    const advance = () => {
      const radios = Array.from(
        fieldset.querySelectorAll<HTMLInputElement>('input[name="hero-lens"]'),
      );
      if (radios.length === 0) return;

      const current = radios.findIndex((radio) => radio.checked);
      radios[(current + 1) % radios.length].checked = true;
    };

    /**
     * Chained timeouts rather than one interval, because the first gap differs
     * from the rest. Pausing still drops the partial wait, exactly as
     * clearInterval did.
     */
    const schedule = () => {
      timer = setTimeout(() => {
        advance();
        advancedOnce = true;
        schedule();
      }, advancedOnce ? INTERVAL_MS : FIRST_INTERVAL_MS);
    };

    /* One place decides whether the timer should be running right now. */
    const sync = () => {
      const running = !stopped && onScreen && !hovered;
      if (running && !timer) schedule();
      else if (!running && timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };

    const onHover = (event: Event) => {
      hovered = event.type === "pointerenter";
      sync();
    };

    /* Only run while the card is actually on screen. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );

    const teardown = () => {
      observer.disconnect();
      HANDOVER.forEach((event) => fieldset.removeEventListener(event, stop));
      PAUSE.forEach((event) => fieldset.removeEventListener(event, onHover));
    };

    const stop = () => {
      stopped = true;
      sync();
      teardown();
    };

    HANDOVER.forEach((event) => fieldset.addEventListener(event, stop));
    PAUSE.forEach((event) => fieldset.addEventListener(event, onHover));
    observer.observe(fieldset);

    return () => {
      stopped = true;
      sync();
      teardown();
    };
  }, []);

  return <span ref={anchorRef} hidden />;
}
