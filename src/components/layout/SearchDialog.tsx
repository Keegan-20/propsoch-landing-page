"use client";

import { useCallback, useEffect, useRef } from "react";

import { SearchPanel } from "@/components/layout/SearchPanel";
import { CloseIcon } from "@/components/ui/icons";
import { NAV_ACTIONS } from "@/content/site";

/**
 * Search as a modal over the whole page.
 *
 * A native <dialog> opened with showModal(), rather than a hand-rolled overlay:
 * the browser then owns the focus trap, makes the rest of the page inert to
 * both pointer and assistive tech, closes on Escape, and restores focus to the
 * trigger afterwards — none of which a div with a high z-index gets for free.
 * It also renders in the top layer, so it sits above the sticky header without
 * a z-index race, and it exposes ::backdrop, which is what carries the blur.
 *
 * The scrim is blurred and the panel is only translucent: frosted glass reads
 * as depth behind the modal, but search results still have to be legible, so
 * the panel keeps most of its opacity.
 */
export function SearchDialog({
  open,
  onClose,
  panelId,
  query,
  onQueryChange,
}: {
  open: boolean;
  onClose: () => void;
  panelId: string;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  /* showModal() makes the page inert but does not stop it scrolling behind. */
  useEffect(() => {
    if (!open) return;

    const { documentElement } = document;
    const previous = documentElement.style.overflow;
    documentElement.style.overflow = "hidden";

    return () => {
      documentElement.style.overflow = previous;
    };
  }, [open]);

  /* Only a click on the dialog box itself — the area around the panel — counts
     as outside. Clicks that land on the panel bubble up with a different target. */
  const onDialogClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={dialogRef}
      aria-label={NAV_ACTIONS.search.label}
      onClose={onClose}
      onClick={onDialogClick}
      className="m-0 h-full max-h-full w-full max-w-full border-0 bg-transparent p-4 backdrop:animate-fade-in backdrop:bg-foreground/25 backdrop:backdrop-blur-lg open:flex open:items-start open:justify-center sm:p-6"
    >
      {/* Mounted only while open, so the panel's autofocus fires on every open. */}
      {open ? (
        <div className="mt-[8vh] w-full max-w-xl animate-hero-rise rounded-2xl border border-white/60 bg-background/90 p-3 shadow-[0_28px_70px_-24px_rgba(10,10,10,0.45)] backdrop-blur-2xl sm:p-4">
          <div className="flex items-center justify-between gap-3 px-1 pb-3">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary-text">
              {NAV_ACTIONS.search.label}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1 inline-flex size-9 items-center justify-center rounded-full text-secondary-text transition-colors hover:bg-surface hover:text-foreground"
            >
              <CloseIcon className="size-5" />
              <span className="sr-only">{NAV_ACTIONS.search.close}</span>
            </button>
          </div>

          <SearchPanel
            panelId={panelId}
            query={query}
            onQueryChange={onQueryChange}
            onClose={onClose}
          />
        </div>
      ) : null}
    </dialog>
  );
}
