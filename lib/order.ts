/**
 * The Team Order configurator data model.
 * Quoting here is consultative. Nothing in this file produces a customer price.
 * Pieces carry a relative "weight" used only to drive the internal completeness
 * meter, never shown as a dollar figure to the shopper.
 */

export type ProgramLevel =
  | "Club"
  | "High school"
  | "College"
  | "Adult league";

export type KitPieceId =
  | "jersey"
  | "shorts"
  | "warmups"
  | "bag"
  | "shoes"
  | "ball";

export interface KitPiece {
  id: KitPieceId;
  name: string;
  note: string;
  photo: string; // /photos/*
  ratio: string; // tailwind aspect ratio utility
  /** Equipment is excluded from all discounts. Flagged so the UI can say so. */
  equipment?: boolean;
  core?: boolean; // pre-selected as part of a match kit
}

export const KIT_PIECES: KitPiece[] = [
  {
    id: "jersey",
    name: "Match jersey",
    note: "Sublimated, cut for the position. Names and numbers included.",
    photo: "", // typed photography slot until the studio shot lands
    ratio: "aspect-[4/5]",
    core: true,
  },
  {
    id: "shorts",
    name: "Shorts and spandex",
    note: "Matched to the jersey. Sizing run for the whole roster.",
    photo: "",
    ratio: "aspect-[4/5]",
    core: true,
  },
  {
    id: "warmups",
    name: "Warmups",
    note: "Quarter-zip and pant. The look before the first serve.",
    photo: "",
    ratio: "aspect-[4/5]",
  },
  {
    id: "bag",
    name: "Team bag",
    note: "Embroidered backpack with name and number tag.",
    photo: "",
    ratio: "aspect-[4/5]",
  },
  {
    id: "shoes",
    name: "Court shoes",
    note: "Fitted as a team order. Equipment, excluded from discounts.",
    photo: "/photos/shoe-sky-elite-1.webp",
    ratio: "aspect-[4/5]",
    equipment: true,
  },
  {
    id: "ball",
    name: "Balls and cart",
    note: "Practice balls and a rolling cart. Equipment, excluded from discounts.",
    photo: "/photos/ball-cart.webp",
    ratio: "aspect-[4/5]",
    equipment: true,
  },
];

export interface Colorway {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

/**
 * Team colorways. These are the program's own colors rendered on their kit,
 * not site decoration, so the palette is wider than the brand chrome.
 */
export const COLORWAYS: Colorway[] = [
  { id: "crimson", name: "Crimson / Bone", primary: "#9E1B32", secondary: "#F3EFE6", accent: "#1A1A1A" },
  { id: "navy", name: "Navy / Gold", primary: "#16243F", secondary: "#C9A24B", accent: "#F3EFE6" },
  { id: "forest", name: "Forest / Cream", primary: "#1F3D2B", secondary: "#EDE7DA", accent: "#C9A24B" },
  { id: "ink", name: "Ink / Silver", primary: "#1A1A1A", secondary: "#C8CBD0", accent: "#D7172A" },
  { id: "royal", name: "Royal / White", primary: "#1D3FA0", secondary: "#FFFFFF", accent: "#1A1A1A" },
  { id: "carbon", name: "Carbon / Volt", primary: "#222428", secondary: "#C7F032", accent: "#FFFFFF" },
];

export type JerseyPattern = "solid" | "shoulder" | "fade";

export const PATTERNS: { id: JerseyPattern; name: string }[] = [
  { id: "solid", name: "Solid body" },
  { id: "shoulder", name: "Shoulder block" },
  { id: "fade", name: "Side fade" },
];

export const SIZES = ["YS", "YM", "YL", "S", "M", "L", "XL", "2XL"] as const;
export type Size = (typeof SIZES)[number];

export interface Athlete {
  id: string;
  name: string;
  number: string;
  size: Size;
}

export const PROGRAM_LEVELS: ProgramLevel[] = [
  "Club",
  "High school",
  "College",
  "Adult league",
];

export interface OrderState {
  programName: string;
  level: ProgramLevel;
  athleteCount: number;
  pieces: KitPieceId[];
  colorway: string;
  pattern: JerseyPattern;
  roster: Athlete[];
  contactName: string;
  email: string;
  phone: string;
  notes: string;
}

export const INITIAL_ORDER: OrderState = {
  programName: "",
  level: "Club",
  athleteCount: 12,
  pieces: ["jersey", "shorts"],
  colorway: "crimson",
  pattern: "shoulder",
  roster: [],
  contactName: "",
  email: "",
  phone: "",
  notes: "",
};

export function getColorway(id: string): Colorway {
  return COLORWAYS.find((c) => c.id === id) ?? COLORWAYS[0];
}
