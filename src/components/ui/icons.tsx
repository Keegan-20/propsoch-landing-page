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

/* Journey stops. One glyph per signboard, drawn on the same 20×20 grid and the
   same 1.75 stroke as the set above so a sign never looks like it borrowed its
   icon from somewhere else. */

export const PhoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7.1 2.9 4.9 3.7a1.7 1.7 0 0 0-1.1 2c.6 2.9 2 5.3 4 7.3s4.4 3.4 7.3 4a1.7 1.7 0 0 0 2-1.1l.8-2.2a1 1 0 0 0-.5-1.2l-2.6-1.2a1 1 0 0 0-1.2.3l-.8 1a10.6 10.6 0 0 1-4.3-4.3l1-.8a1 1 0 0 0 .3-1.2L8.3 3.4a1 1 0 0 0-1.2-.5Z" />
  </Icon>
);

export const ClipboardIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7.5 4H6a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 6 17h8a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 14 4h-1.5" />
    <path d="M8.5 2.5h3a1 1 0 0 1 1 1v1.5h-5V3.5a1 1 0 0 1 1-1Z" />
    <path d="M7.5 9.5h5M7.5 12.5h3" />
  </Icon>
);

export const ListIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 5.5h8M8 10h8M8 14.5h8" />
    <path d="M4.5 5.5h.01M4.5 10h.01M4.5 14.5h.01" />
  </Icon>
);

export const PinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10 17.5s5.5-4.9 5.5-8.6a5.5 5.5 0 1 0-11 0c0 3.7 5.5 8.6 5.5 8.6Z" />
    <circle cx="10" cy="8.8" r="2" />
  </Icon>
);

export const KeyIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="7" cy="13" r="3.2" />
    <path d="m9.3 10.7 6-6M13.1 6.9l1.5 1.5M15.3 4.7l1.5 1.5" />
  </Icon>
);

/**
 * The marker that travels the journey road, and the only glyph in this file
 * drawn for one specific job: it renders at 16px, reversed out of a filled
 * brand disc, and it has to still read as a house at that size. So it carries
 * three strokes and no more — gable, walls, door — and the door is arched
 * rather than square, which is the one detail that survives the size and stops
 * the silhouette reading as a plain pentagon. The stroke is trimmed to 1.6
 * because a white line on saturated orange optically thickens.
 */
/**
 * The phase marker on the mobile journey rail: a filled four-point sparkle
 * rather than a plain dot, so a phase heading is distinguishable at a glance
 * from the hairline rail it sits on. Solid, so it overrides `Icon`'s stroked
 * default rather than inheriting it.
 */
export const PhaseMarkerIcon = (props: IconProps) => (
  <Icon fill="currentColor" stroke="none" {...props}>
    <path d="M10 1.5Q11 9 18.5 10Q11 11 10 18.5Q9 11 1.5 10Q9 9 10 1.5Z" />
  </Icon>
);

export const HouseMarkerIcon = (props: IconProps) => (
  <Icon strokeWidth="1.6" {...props}>
    <path d="M2.9 9.4 10 3.6l7.1 5.8" />
    <path d="M4.7 8.1v8.3h10.6V8.1" />
    <path d="M8.2 16.4v-3.9a1.8 1.8 0 0 1 3.6 0v3.9" />
  </Icon>
);
