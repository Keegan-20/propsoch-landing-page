/**
 * A city block in elevation, sitting on the hero's ground line.
 *
 * This is context, not ornament: the hero asks "Where are you buying?", and
 * this is what the answer looks like — the stock of buildings Propsoch reads.
 * So it is drawn the way an architect draws an elevation (outline plus floor
 * levels, orthographic, shallow parapets) rather than as pictogram houses.
 *
 * Kept deliberately faint. It should register as texture in the background and
 * never compete with the headline or the report card in front of it.
 */
type Block = {
  x: number;
  w: number;
  /** Roof line, measured down from the top of the viewBox. */
  top: number;
  floors: number;
  /** Rise of a shallow pitched roof. Omitted means a flat parapet. */
  pitch?: number;
};

/** Ground line. Every block stands on it. */
const BASE = 190;

const BLOCKS: readonly Block[] = [
  { x: 20, w: 130, top: 104, floors: 4 },
  { x: 150, w: 74, top: 70, floors: 6 },
  { x: 244, w: 160, top: 126, floors: 3 },
  { x: 424, w: 116, top: 84, floors: 5 },
  { x: 560, w: 140, top: 132, floors: 2, pitch: 20 },
  { x: 720, w: 168, top: 96, floors: 5 },
  { x: 908, w: 104, top: 134, floors: 3 },
  { x: 1032, w: 146, top: 74, floors: 6 },
  { x: 1198, w: 112, top: 122, floors: 3 },
  { x: 1330, w: 150, top: 104, floors: 4 },
  { x: 1500, w: 90, top: 140, floors: 2 },
];

/**
 * Outline and floor levels as a single path, so each building costs one DOM
 * node rather than one per storey.
 */
function elevation({ x, w, top, floors, pitch = 0 }: Block) {
  const eaves = top + pitch;
  let d = pitch
    ? `M${x} ${BASE}V${eaves}L${x + w / 2} ${top}L${x + w} ${eaves}V${BASE}`
    : `M${x} ${BASE}V${top}H${x + w}V${BASE}`;

  const gap = (BASE - eaves) / (floors + 1);
  for (let i = 1; i <= floors; i += 1) {
    d += `M${x} ${Number((BASE - i * gap).toFixed(1))}H${x + w}`;
  }

  return d;
}

export function HeroSkyline() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 overflow-hidden lg:h-[160px]"
    >
      {/*
        `slice` keeps the buildings at a consistent apparent size and crops the
        row at narrow widths, instead of shrinking the whole city to fit.
      */}
      <svg
        viewBox="0 0 1600 200"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
        focusable="false"
        className="size-full"
      >
        <g className="stroke-brand" strokeWidth={1.5} strokeLinecap="square">
          <path d={`M0 ${BASE}H1600`} className="opacity-30" />
          {BLOCKS.map((block) => (
            <path key={block.x} d={elevation(block)} className="opacity-20" />
          ))}
        </g>
      </svg>
    </div>
  );
}
