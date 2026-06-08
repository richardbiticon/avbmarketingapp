"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BUILDER_SWATCHES, STORE_TYPES, type StoreType } from "@/lib/stores";
import { clsx } from "@/lib/clsx";
import { ButtonLink } from "@/components/ui/Button";

/* A recolorable apparel silhouette for the storefront tiles. */
function Garment({
  type,
  primary,
  secondary,
  monogram,
}: {
  type: "tee" | "hoodie" | "jersey" | "bag";
  primary: string;
  secondary: string;
  monogram: string;
}) {
  const common = { vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      {type === "tee" && (
        <>
          <path d="M40 22 L30 30 L22 44 L33 52 L40 46 L40 98 L80 98 L80 46 L87 52 L98 44 L90 30 L80 22 L68 28 Q60 36 52 28 Z" fill={primary} {...common} />
          <path d="M40 22 L52 28 Q60 36 68 28 L80 22 L73 30 Q60 40 47 30 Z" fill={secondary} />
        </>
      )}
      {type === "hoodie" && (
        <>
          <path d="M38 26 L28 32 L20 48 L31 56 L38 50 L38 100 L82 100 L82 50 L89 56 L100 48 L92 32 L82 26 L72 26 Q60 38 48 26 Z" fill={primary} {...common} />
          <path d="M48 26 Q60 40 72 26 L72 40 Q60 50 48 40 Z" fill={secondary} />
          <rect x="54" y="70" width="12" height="26" rx="3" fill={secondary} opacity="0.85" />
        </>
      )}
      {type === "jersey" && (
        <>
          <path d="M42 22 L30 28 L24 44 L34 50 L42 45 L42 98 L78 98 L78 45 L86 50 L96 44 L90 28 L78 22 L70 30 Q60 38 50 30 Z" fill={primary} {...common} />
          <path d="M42 45 L42 98 L52 98 L50 45 Z M78 45 L78 98 L68 98 L70 45 Z" fill={secondary} opacity="0.9" />
        </>
      )}
      {type === "bag" && (
        <>
          <rect x="34" y="40" width="52" height="60" rx="9" fill={primary} {...common} />
          <path d="M44 40 Q44 22 60 22 Q76 22 76 40" fill="none" stroke={secondary} strokeWidth="6" />
          <rect x="46" y="60" width="28" height="18" rx="4" fill={secondary} opacity="0.85" />
        </>
      )}
      <text
        x="60"
        y={type === "bag" ? "74" : "74"}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#ffffff"
        style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', letterSpacing: "0.04em" }}
      >
        {monogram}
      </text>
    </svg>
  );
}

const PRODUCTS: { type: "tee" | "hoodie" | "jersey" | "bag"; name: string; price: string }[] = [
  { type: "jersey", name: "Match Jersey", price: "$58" },
  { type: "hoodie", name: "Team Hoodie", price: "$54" },
  { type: "tee", name: "Spirit Tee", price: "$28" },
  { type: "bag", name: "Team Backpack", price: "$62" },
];

export default function StoreBuilder() {
  const [name, setName] = useState("Northshore VBC");
  const [primary, setPrimary] = useState("#1D3FA0");
  const [secondary, setSecondary] = useState("#C9A24B");
  const [type, setType] = useState<StoreType>("team-spirit");

  const monogram = useMemo(() => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "AV";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [name]);

  const typeLabel =
    type === "team" ? "Team Store" : type === "spirit" ? "Spirit Store" : "Team + Spirit Store";
  const slug = (name.trim() || "your-club").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1fr] lg:gap-12">
      {/* Live storefront preview */}
      <div className="order-1 lg:order-2">
        <div className="overflow-hidden rounded-[8px] border border-[color:var(--line-strong)] bg-panel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-[color:var(--line)] bg-panel-2 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/25" />
            <div className="ml-3 flex-1 truncate rounded-[4px] bg-surface px-3 py-1 text-[11px] text-bone-faint">
              allvolleyball.com/stores/{slug}
            </div>
          </div>

          {/* Store body */}
          <div className="bg-[#0b0c0d]">
            {/* Store header */}
            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-2.5">
                <motion.span
                  animate={{ backgroundColor: primary }}
                  transition={{ duration: 0.4 }}
                  className="flex h-8 w-8 items-center justify-center rounded-[5px] text-[12px] font-bold text-white"
                >
                  {monogram}
                </motion.span>
                <span className="text-[14px] font-semibold tracking-tight text-white">
                  {name.trim() || "Your Club"}
                </span>
              </div>
              <span className="hidden gap-4 text-[11px] text-white/50 sm:flex">
                <span>Shop</span>
                <span>Sizing</span>
                <span>Cart</span>
              </span>
            </div>

            {/* Hero banner */}
            <motion.div
              animate={{ backgroundColor: primary }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden px-5 py-7"
            >
              <div
                className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 rotate-12"
                style={{ backgroundColor: secondary, opacity: 0.85, clipPath: "polygon(20% 0, 100% 0, 100% 100%)" }}
                aria-hidden
              />
              <span className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                {typeLabel}
              </span>
              <h3 className="relative mt-1 text-[24px] font-bold leading-none tracking-tight text-white">
                {(name.trim() || "Your Club").toUpperCase()}
              </h3>
              <span
                className="relative mt-2 inline-block rounded-[3px] px-2.5 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: secondary, color: "#10110f" }}
              >
                Shop the collection
              </span>
            </motion.div>

            {/* Product grid */}
            <div className="grid grid-cols-2 gap-px bg-white/5 p-px">
              {PRODUCTS.map((p) => (
                <div key={p.name} className="bg-[#101113] p-3">
                  <div className="flex aspect-square items-center justify-center rounded-[4px] bg-white/[0.03] p-2">
                    <Garment type={p.type} primary={primary} secondary={secondary} monogram={monogram} />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11.5px] font-medium text-white/85">{p.name}</span>
                    <span className="text-[11.5px] font-semibold text-white/55">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-2.5 text-center text-[10px] text-white/35">
              Powered by All Volleyball
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[12.5px] text-bone-faint lg:text-left">
          Live preview. This is roughly what your families would see.
        </p>
      </div>

      {/* Controls */}
      <div className="order-2 lg:order-1">
        <label className="block">
          <span className="label mb-2.5 block text-bone-soft">Team or club name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 28))}
            placeholder="Northshore VBC"
            className="w-full rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2 px-4 py-3 text-[16px] text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-red"
          />
        </label>

        <div className="mt-7 grid grid-cols-2 gap-6">
          <Swatches label="Primary color" value={primary} onChange={setPrimary} />
          <Swatches label="Accent color" value={secondary} onChange={setSecondary} />
        </div>

        <div className="mt-7">
          <span className="label mb-2.5 block text-bone-soft">Store type</span>
          <div className="flex flex-col gap-2">
            {STORE_TYPES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setType(st.id)}
                aria-pressed={type === st.id}
                className={clsx(
                  "flex items-center gap-3 rounded-[4px] border p-3 text-left transition-all duration-200 ease-expo",
                  type === st.id
                    ? "border-red bg-panel-2"
                    : "border-[color:var(--line)] hover:border-bone/30"
                )}
              >
                <span
                  className={clsx(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] text-[12px] font-bold",
                    type === st.id ? "bg-red text-white" : "bg-panel-3 text-bone-soft"
                  )}
                >
                  {st.letter}
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-bone">{st.label}</span>
                  <span className="block text-[12.5px] text-bone-soft">{st.blurb}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <ButtonLink href="#request" variant="solid" arrow magnetic>
            Make this real
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Swatches({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (c: string) => void;
}) {
  return (
    <div>
      <span className="label mb-2.5 block text-bone-soft">{label}</span>
      <div className="flex flex-wrap gap-2">
        {BUILDER_SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-label={`${label} ${c}`}
            aria-pressed={value === c}
            className={clsx(
              "h-7 w-7 rounded-full ring-2 transition-transform duration-200 hover:scale-110",
              value === c ? "ring-bone" : "ring-transparent"
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}
