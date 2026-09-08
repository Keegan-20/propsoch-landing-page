"use client";

/**
 * Client-side for two reasons only: the mobile disclosure menu, and the header
 * actions (see NavActions). Everything else here is a plain link.
 */

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { NavActions } from "@/components/layout/NavActions";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { NAV_LINKS, PRIMARY_CTA } from "@/content/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="flex min-h-11 items-center rounded-sm" aria-label="Propsoch home">
          <Wordmark className="text-[1.375rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-weak transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavActions variant="bar" />
          <Link href={PRIMARY_CTA.href} className={buttonStyles({ size: "md" })}>
            <span className="lg:hidden">Free call</span>
            <span className="hidden lg:inline">{PRIMARY_CTA.shortLabel}</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-foreground lg:hidden"
          >
            {isOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </Container>

      <div
        id={panelId}
        hidden={!isOpen}
        className="border-t border-line bg-background lg:hidden"
      >
        <Container className="py-2">
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col divide-y divide-line">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 items-center text-base text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Below `sm` the icon bar is dropped from the header — three icon
              buttons plus the CTA do not fit at 320px — so the same actions
              appear here with visible labels. */}
          <div className="border-t border-line pt-1 sm:hidden">
            <NavActions variant="menu" onNavigate={() => setIsOpen(false)} />
          </div>
        </Container>
      </div>
    </header>
  );
}
