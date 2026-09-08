import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Hand-rolled icons instead of an icon package: five glyphs are not worth a
 * dependency, and inline SVG keeps them out of the JavaScript bundle.
 * All are decorative — meaning is always carried by adjacent text.
 */
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
  </Icon>
);

export const ReportIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11.5 2.5H6A1.5 1.5 0 0 0 4.5 4v12A1.5 1.5 0 0 0 6 17.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5Z" />
    <path d="M11.5 2.5v4h4" />
    <path d="M7.5 10.5h5M7.5 13.5h3" />
  </Icon>
);

export const CrossIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </Icon>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="9" cy="9" r="5.25" />
    <path d="m12.9 12.9 3.6 3.6" />
  </Icon>
);

export const ShareIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="14.75" cy="4.75" r="2.25" />
    <circle cx="14.75" cy="15.25" r="2.25" />
    <circle cx="5.25" cy="10" r="2.25" />
    <path d="m7.2 8.9 5.6-2.9M7.2 11.1l5.6 2.9" />
  </Icon>
);

export const HeartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10 16.4 4.2 10.6a3.6 3.6 0 0 1 5.1-5.1l.7.7.7-.7a3.6 3.6 0 1 1 5.1 5.1L10 16.4Z" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 6h14M3 10h14M3 14h14" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 5l10 10M15 5L5 15" />
  </Icon>
);
