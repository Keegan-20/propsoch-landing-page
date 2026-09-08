"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { SearchIcon } from "@/components/ui/icons";
import { searchListings } from "@/content/listings";
import { NAV_ACTIONS } from "@/content/site";

const { search: COPY } = NAV_ACTIONS;

/**
 * The search field and its results.
 *
 * Not an ARIA combobox: that pattern promises a listbox of selectable options
 * driven by arrow keys, and this is a list of links. It is a labelled search
 * field with results below, which is what it looks like and how it behaves —
 * so a screen reader gets an honest description rather than a broken widget.
 * The result count is announced politely as the query changes.
 */
export function SearchPanel({
  panelId,
  query,
  onQueryChange,
  onClose,
}: {
  panelId: string;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchListings(query);
  const isSearching = query.trim().length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div id={panelId} className="flex flex-col gap-3">
      <div className="relative">
        <label htmlFor={`${panelId}-input`} className="sr-only">
          {COPY.label}
        </label>
        <SearchIcon
          className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-secondary-text"
        />
        <input
          ref={inputRef}
          id={`${panelId}-input`}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={COPY.placeholder}
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-line-strong bg-background pl-11 pr-3 text-[0.9375rem] text-foreground placeholder:text-muted"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary-text">
          {isSearching ? COPY.resultsLabel : COPY.trendingLabel}
        </h2>
        
      </div>

      {results.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {results.map((listing) => (
            <li key={listing.id}>
              <Link
                href={listing.href}
                onClick={onClose}
                className="flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[0.9375rem] font-medium text-foreground">
                    {listing.name}
                  </span>
                  <span className="shrink-0 text-[0.8125rem] text-foreground">{listing.price}</span>
                </span>
                <span className="text-[0.8125rem] text-secondary-text">
                  {listing.locality}, {listing.city} · {listing.configuration}
                </span>
                <span className="text-[0.75rem] text-muted">{listing.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-3 py-4 text-[0.9375rem] text-secondary-text">{COPY.empty}</p>
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {isSearching
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for ${query}`
          : ""}
      </p>
    </div>
  );
}
