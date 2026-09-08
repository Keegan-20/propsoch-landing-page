import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import {
  BRAND,
  COMMUNITY_LINKS,
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  REGISTRATIONS,
} from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-foreground text-line-strong">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Wordmark tone="inverse" className="text-2xl" />
            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed">{BRAND.tagline}</p>
            <ul className="flex flex-col gap-2 pt-1">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-white underline decoration-border-dark underline-offset-4 transition-colors hover:decoration-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-1">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-10 items-center text-[0.9375rem] leading-snug transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-border-dark pt-8">
          <h2 className="sr-only">Legal and regulatory information</h2>
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGISTRATIONS.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
                  {item.label}
                </dt>
                <dd className="text-[0.875rem] break-words text-white">
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      className="inline-block max-w-full break-words py-1 underline decoration-border-dark underline-offset-4 transition-colors hover:decoration-brand"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.875rem]">
            © Copyright {BRAND.legalName.replace("Private Limited", "Pvt. Ltd.")} 2026
          </p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[0.875rem] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
