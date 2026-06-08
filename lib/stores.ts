/**
 * Data model for the Team & Spirit Stores experience.
 * A supplier-run, club-branded storefront where families order their own gear,
 * decorated to spec and shipped to homes or to the club.
 */

export type StoreType = "team-spirit" | "team" | "spirit";

export const STORE_TYPES: { id: StoreType; letter: string; label: string; blurb: string }[] = [
  {
    id: "team-spirit",
    letter: "A",
    label: "Team and Spirit Store",
    blurb: "Required team pieces and spirit wear together. One stop for families.",
  },
  {
    id: "team",
    letter: "B",
    label: "Team Store only",
    blurb: "Just the required team pieces, ordered in one place.",
  },
  {
    id: "spirit",
    letter: "C",
    label: "Spirit Store only",
    blurb: "Fan and player spirit wear, no required pieces.",
  },
];

export const BRANDS = [
  "Adidas",
  "Under Armour",
  "Mizuno",
  "Asics",
  "CustomFuze",
  "Other",
] as const;

export const TEAM_ITEMS = [
  "Jerseys",
  "Spandex",
  "Bag",
  "Warm up top and bottom",
  "Other",
] as const;

/** Brand-safe value props. The banned marketing-speak word is avoided here. */
export const VALUE_PROPS = [
  {
    kicker: "Gear you love, guaranteed",
    line: "On time. Under budget. Done correctly.",
  },
  {
    kicker: "Easy and affordable",
    line: "Shopping for players, teams, and clubs.",
  },
  {
    kicker: "One stop shop",
    line: "Gear, service, and support for teams and clubs.",
  },
];

export const FEATURES = [
  { title: "Store building", body: "We set up a custom store that fits your team identity and needs." },
  { title: "Support", body: "We handle the calls, emails, and chats so you do not have to." },
  { title: "Top brands", body: "Name brand or not, an on-trend assortment you will love for less." },
  { title: "Customization", body: "Personalize jerseys, warmups, and gear with your logos and colors." },
  { title: "Easy ordering", body: "We remove the work of collecting orders, payments, and distribution." },
  { title: "Easy inventory", body: "We handle inventory, stock management, and logistics for you." },
  { title: "Easy distribution", body: "Ship straight to families, or to one location organized by team." },
  { title: "Fundraising", body: "Add fundraising for team expenses, coaches gear, or charitable causes." },
  { title: "Order updates", body: "Real-time sales and ordering updates for your whole organization." },
];

export const HOW_IT_WORKS = [
  { no: "01", title: "Request your store", body: "Tell us your team, colors, and the pieces you need. It takes a few minutes." },
  { no: "02", title: "We build it", body: "We set up a customized store with your products, decorated to your spec." },
  { no: "03", title: "Share your store", body: "Send one link. Families order their own sizes and pay their own way." },
  { no: "04", title: "We handle the rest", body: "Inventory, decoration, and shipping to homes or to the club. Done correctly." },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "What is a Team and Spirit Store?",
    a: "A Team and Spirit store has both your required team items and spirit wear available to purchase. Stores can be split into a Team Store or a Spirit Store only, depending on how your team or club orders. We see the most success combining the required team pieces and the spirit wear into one hassle-free shop for families.",
  },
  {
    q: "What products can I have in my store?",
    a: "Your required team pieces are decided with your account manager and can include jerseys, spandex, backpacks, and more. The spirit wear items are preselected. If you have a special request or a specific brand you want added, let us know.",
  },
  {
    q: "How long can I keep a store open?",
    a: "We typically recommend keeping the store open for 5 to 7 business days. From there we close it to process the required team items, refresh the spirit wear, and reopen so families can keep ordering spirit wear.",
  },
  {
    q: "What is the turnaround time?",
    a: "Required team pieces ship within 25 business days after the store closes. Spirit wear marked with a Quick Ship banner ships in 5 to 7 business days from the order date. Orders with both team and spirit items ship in two separate shipments. Decoration has real lead time, so ordering early matters.",
  },
  {
    q: "How can I check the status of my order?",
    a: "After you order, you receive an email confirmation with a link to view your order status. Enter your 10-digit order number and the email used to place the order to see where it stands.",
  },
  {
    q: "Can I add fundraising?",
    a: "Yes. You can add any dollar amount to items in the store. The amount raised can be used as credit toward a future order, or we can mail a check for the amount fundraised.",
  },
  {
    q: "How is payment handled?",
    a: "Spirit wear is paid for by families with a credit card at checkout. Required team items can be paid in the store by credit card, or the club can be billed for those items separately.",
  },
  {
    q: "How long does store setup take?",
    a: "Store setup takes 1 to 2 business days.",
  },
  {
    q: "How many logos can I use?",
    a: "A maximum of two logos for print, and one logo for items being embroidered.",
  },
  {
    q: "Do you allow returns or exchanges?",
    a: "Any item that is not decorated is eligible for return or exchange. Decorated or custom-made items are not returnable. If there is ever an issue with your items, contact us and we will find the best fix for you.",
  },
];

/** Design inspiration gallery. Real art lands later; for now each is a typed
 *  design tile keyed by art number and an athletic slogan. */
export interface ArtTemplate {
  no: string;
  slogan: string;
}

const SLOGANS = [
  "Elevate", "Rise Up", "One Team", "Hustle Hard", "We Work As One",
  "All In", "Own It", "We're All In", "Volleyball Nation", "Set The Standard",
  "Be Part Of It", "Whatever It Takes", "Defend The Court", "Earned Not Given", "No Days Off",
  "Hustle Hard", "Built Different", "Character And Integrity", "Hustle And Heart", "Point By Point",
  "Hustle Hard", "Game Face", "Trust The Pass", "Swing Big", "Hold The Line",
  "First To The Floor", "Run It Back", "Eyes Up", "Finish Strong", "Together We Rise",
];

export const ART_TEMPLATES: ArtTemplate[] = SLOGANS.map((slogan, i) => ({
  no: `AVBSP${String(i + 1).padStart(3, "0")}`,
  slogan,
}));

/** Swatch palette for the live store builder. Real team colors, wide gamut. */
export const BUILDER_SWATCHES = [
  "#D7172A", "#9E1B32", "#1D3FA0", "#16243F", "#1F3D2B",
  "#222428", "#6B21A8", "#0E7490", "#C9A24B", "#1A1A1A",
];
