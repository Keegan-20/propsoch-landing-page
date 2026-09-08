"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { SearchDialog } from "@/components/layout/SearchDialog";
import { HeartIcon, SearchIcon, ShareIcon } from "@/components/ui/icons";
import { NAV_ACTIONS } from "@/content/site";
import { cn } from "@/lib/cn";

type Variant = "bar" | "menu";

const BAR_BUTTON =
  "inline-flex size-11 items-center justify-center rounded-xl bg-surface text-foreground transition-colors hover:bg-line";
const BAR_BUTTON_OPEN = "bg-foreground text-background hover:bg-foreground";
const MENU_ROW = "flex min-h-12 w-full items-center gap-3 text-base text-foreground";

/**
 * The tooltip duplicates the control's aria-label word for word, so it is
 * hidden from assistive tech — screen readers already announce the name, and
 * exposing it again via aria-describedby would just say it twice.
 *
 * Shown on hover *and* keyboard focus, so it is not mouse-only. `:focus-visible`
 * rather than `:focus` keeps it from flashing on click.
 */
const TOOLTIP =
  "pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-[0.75rem] font-medium text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100";

/**
 * Saved navigates, so it is a link. Search and Share act on the page in place,
 * so they are buttons — the element matches the behaviour, not the styling.
 *
 * Every control is icon-only in the bar, so each gets an explicit aria-label.
 * In the menu the same icons sit beside visible text, so the label would be
 * redundant and the icons are hidden from assistive tech instead.
 */
export function NavActions({ variant, onNavigate }: { variant: Variant; onNavigate?: () => void }) {
  const [message, setMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  /* WCAG 1.4.13: content shown on hover or focus must be dismissible without
     moving the pointer or focus. Escape hides the tooltips; leaving the group
     with the pointer or focus arms them again. */
  const [tooltipsDismissed, setTooltipsDismissed] = useState(false);

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => () => clearTimeout(timeout.current), []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setQuery("");
  }, []);

  /* Escape and outside-click are handled by the modal itself, and it restores
     focus to the trigger on close. This listener only dismisses the tooltips. */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTooltipsDismissed(true);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const announce = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setMessage(""), 4000);
  }, []);

  const share = useCallback(async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      announce(NAV_ACTIONS.share.copied);
    } catch (error) {
      // Dismissing the OS share sheet rejects with AbortError; that is not a failure.
      if ((error as Error)?.name === "AbortError") return;
      announce(NAV_ACTIONS.share.failed);
    }
  }, [announce]);

  if (variant === "menu") {
    return (
      <ul className="flex flex-col divide-y divide-line">
        <li>
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-haspopup="dialog"
            className={MENU_ROW}
          >
            <SearchIcon className="size-5 shrink-0 text-secondary-text" />
            {NAV_ACTIONS.search.label}
          </button>
          <SearchDialog
            open={isSearchOpen}
            panelId={panelId}
            query={query}
            onQueryChange={setQuery}
            onClose={() => {
              closeSearch();
              onNavigate?.();
            }}
          />
        </li>
        <li>
          <Link href={NAV_ACTIONS.saved.href} onClick={onNavigate} className={MENU_ROW}>
            <HeartIcon className="size-5 shrink-0 text-secondary-text" />
            {NAV_ACTIONS.saved.label}
          </Link>
        </li>
        <li>
          <button type="button" onClick={share} className={MENU_ROW}>
            <ShareIcon className="size-5 shrink-0 text-secondary-text" />
            {NAV_ACTIONS.share.label}
          </button>
        </li>
        <li
          aria-live="polite"
          className={cn("text-[0.875rem] text-secondary-text", !message && "sr-only")}
        >
          {message ? <span className="flex min-h-10 items-center">{message}</span> : null}
        </li>
      </ul>
    );
  }

  const tooltip = (label: string, suppressed = false) =>
    tooltipsDismissed || suppressed ? null : (
      <span aria-hidden="true" className={TOOLTIP}>
        {label}
      </span>
    );

  return (
    <div
      ref={containerRef}
      className="relative hidden items-center gap-1.5 sm:flex"
      onPointerLeave={() => setTooltipsDismissed(false)}
      onBlur={() => setTooltipsDismissed(false)}
    >
      <span className="group relative">
        <button
          ref={searchTriggerRef}
          type="button"
          onClick={() => setIsSearchOpen(true)}
          aria-haspopup="dialog"
          aria-label={NAV_ACTIONS.search.label}
          className={cn(BAR_BUTTON, isSearchOpen && BAR_BUTTON_OPEN)}
        >
          <SearchIcon className="size-5" />
        </button>
        {tooltip(NAV_ACTIONS.search.label, isSearchOpen)}
      </span>

      <span className="group relative">
        <button type="button" onClick={share} aria-label={NAV_ACTIONS.share.label} className={BAR_BUTTON}>
          <ShareIcon className="size-5" />
        </button>
        {tooltip(NAV_ACTIONS.share.label)}
      </span>

      <span className="group relative">
        <Link href={NAV_ACTIONS.saved.href} aria-label={NAV_ACTIONS.saved.label} className={BAR_BUTTON}>
          <HeartIcon className="size-5" />
        </Link>
        {tooltip(NAV_ACTIONS.saved.label)}
      </span>

      <SearchDialog
        open={isSearchOpen}
        panelId={panelId}
        query={query}
        onQueryChange={setQuery}
        onClose={closeSearch}
      />

      {/* Announced to screen readers, and shown to everyone else. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg border border-line bg-background px-3 py-2 text-[0.8125rem] text-foreground shadow-[0_4px_16px_-6px_rgba(10,10,10,0.2)]",
          !message && "sr-only border-0 p-0 shadow-none",
        )}
      >
        {message}
      </p>
    </div>
  );
}
