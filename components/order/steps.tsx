"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  COLORWAYS,
  KIT_PIECES,
  PATTERNS,
  PROGRAM_LEVELS,
  SIZES,
  type OrderState,
  type Athlete,
  type Size,
} from "@/lib/order";
import { clsx } from "@/lib/clsx";
import { EASE } from "@/lib/motion";
import { ChoiceChip, FieldLabel, Stepper, TextField } from "./fields";

export interface StepProps {
  order: OrderState;
  update: (patch: Partial<OrderState>) => void;
  previewNumber: string;
  setPreviewNumber: (v: string) => void;
}

function StepIntro({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="label text-red">{kicker}</span>
      <h2 className="mt-2 text-[clamp(26px,3.4vw,38px)] font-medium leading-tight tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}

/* 01 — Program ------------------------------------------------------------- */
export function ProgramStep({ order, update }: StepProps) {
  return (
    <div>
      <StepIntro kicker="Step 01 / Program" title="Tell us who we are building for." />
      <div className="space-y-8">
        <TextField
          label="Program or club name"
          value={order.programName}
          onChange={(v) => update({ programName: v })}
          placeholder="North Shore Volleyball Club"
          required
        />
        <div>
          <FieldLabel>Level</FieldLabel>
          <div className="flex flex-wrap gap-2.5">
            {PROGRAM_LEVELS.map((level) => (
              <ChoiceChip
                key={level}
                active={order.level === level}
                onClick={() => update({ level })}
              >
                {level}
              </ChoiceChip>
            ))}
          </div>
        </div>
        <Stepper
          label="How many athletes"
          value={order.athleteCount}
          onChange={(v) => update({ athleteCount: v })}
          min={1}
          max={60}
        />
      </div>
    </div>
  );
}

/* 02 — Pieces -------------------------------------------------------------- */
export function PiecesStep({ order, update }: StepProps) {
  const toggle = (id: OrderState["pieces"][number]) => {
    const has = order.pieces.includes(id);
    update({
      pieces: has
        ? order.pieces.filter((p) => p !== id)
        : [...order.pieces, id],
    });
  };

  return (
    <div>
      <StepIntro kicker="Step 02 / The package" title="Choose the pieces in this order." />
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {KIT_PIECES.map((piece) => {
          const active = order.pieces.includes(piece.id);
          return (
            <button
              key={piece.id}
              type="button"
              onClick={() => toggle(piece.id)}
              aria-pressed={active}
              className={clsx(
                "group flex items-center gap-4 rounded-[4px] border p-3.5 text-left transition-all duration-200 ease-expo",
                active
                  ? "border-red bg-panel-2"
                  : "border-[color:var(--line)] hover:border-bone/30"
              )}
            >
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[3px] bg-panel-2">
                {piece.photo ? (
                  <Image
                    src={piece.photo}
                    alt={piece.name}
                    fill
                    sizes="64px"
                    className="object-contain p-2"
                  />
                ) : (
                  <span className="text-[15px] font-semibold text-bone/40" aria-hidden>
                    {piece.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[15.5px] font-medium">{piece.name}</h3>
                  {piece.equipment && (
                    <span className="label text-[9px] text-bone-faint">Equip.</span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-[13px] text-bone-soft">
                  {piece.note}
                </p>
              </div>
              <span
                className={clsx(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors",
                  active
                    ? "border-red bg-red text-bone"
                    : "border-[color:var(--line-strong)] text-transparent"
                )}
                aria-hidden
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-[13.5px] text-bone-faint">
        Equipment is excluded from all discounts. We say so on every line it
        touches.
      </p>
    </div>
  );
}

/* 03 — Colors -------------------------------------------------------------- */
export function ColorStep({
  order,
  update,
  previewNumber,
  setPreviewNumber,
}: StepProps) {
  return (
    <div>
      <StepIntro kicker="Step 03 / The look" title="Set your colors and cut." />
      <div className="space-y-8">
        <div>
          <FieldLabel>Colorway</FieldLabel>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {COLORWAYS.map((cw) => {
              const active = order.colorway === cw.id;
              return (
                <button
                  key={cw.id}
                  type="button"
                  onClick={() => update({ colorway: cw.id })}
                  aria-pressed={active}
                  className={clsx(
                    "flex items-center gap-3 rounded-[4px] border p-3 text-left transition-all duration-200 ease-expo",
                    active
                      ? "border-red bg-panel-2"
                      : "border-[color:var(--line)] hover:border-bone/30"
                  )}
                >
                  <span className="flex -space-x-1.5">
                    {[cw.primary, cw.secondary, cw.accent].map((c, i) => (
                      <span
                        key={i}
                        className="h-6 w-6 rounded-full ring-2 ring-panel"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                  <span className="text-[13px] font-medium leading-tight">
                    {cw.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <FieldLabel>Cut</FieldLabel>
          <div className="flex flex-wrap gap-2.5">
            {PATTERNS.map((p) => (
              <ChoiceChip
                key={p.id}
                active={order.pattern === p.id}
                onClick={() => update({ pattern: p.id })}
              >
                {p.name}
              </ChoiceChip>
            ))}
          </div>
        </div>

        <div className="max-w-[180px]">
          <TextField
            label="Preview number"
            value={previewNumber}
            onChange={(v) => setPreviewNumber(v.replace(/\D/g, "").slice(0, 2))}
            placeholder="10"
          />
        </div>
      </div>
    </div>
  );
}

/* 04 — Roster -------------------------------------------------------------- */
export function RosterStep({ order, update }: StepProps) {
  const addAthlete = () => {
    const athlete: Athlete = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${order.roster.length}-${order.roster.length + 1}`,
      name: "",
      number: "",
      size: "M",
    };
    update({ roster: [...order.roster, athlete] });
  };

  const patch = (id: string, change: Partial<Athlete>) =>
    update({
      roster: order.roster.map((a) => (a.id === id ? { ...a, ...change } : a)),
    });

  const remove = (id: string) =>
    update({ roster: order.roster.filter((a) => a.id !== id) });

  return (
    <div>
      <StepIntro kicker="Step 04 / Roster" title="Add your athletes, or send the list later." />
      <p className="-mt-4 mb-6 text-[14.5px] text-bone-soft">
        We run the full sizing either way. Start the roster now or leave it and
        hand us a list when we talk.
      </p>

      <div className="space-y-2.5">
        {order.roster.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2.5"
          >
            <input
              value={a.name}
              onChange={(e) => patch(a.id, { name: e.target.value })}
              placeholder={`Athlete ${i + 1}`}
              aria-label={`Athlete ${i + 1} name`}
              className="rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2 px-3 py-2.5 text-[15px] outline-none focus:border-red"
            />
            <input
              value={a.number}
              onChange={(e) =>
                patch(a.id, { number: e.target.value.replace(/\D/g, "").slice(0, 2) })
              }
              placeholder="#"
              aria-label={`Athlete ${i + 1} number`}
              className="w-16 rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2 px-3 py-2.5 text-center text-[15px] outline-none focus:border-red"
            />
            <select
              value={a.size}
              onChange={(e) => patch(a.id, { size: e.target.value as Size })}
              aria-label={`Athlete ${i + 1} size`}
              className="rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2 px-3 py-2.5 text-[15px] outline-none focus:border-red"
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => remove(a.id)}
              aria-label={`Remove athlete ${i + 1}`}
              className="flex h-9 w-9 items-center justify-center rounded-[3px] text-bone-faint transition-colors hover:bg-panel-2 hover:text-red"
            >
              ×
            </button>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={addAthlete}
        className="mt-4 inline-flex items-center gap-2 rounded-none border border-[color:var(--line-strong)] px-5 py-2.5 text-[14px] font-medium text-bone-soft transition-colors hover:border-bone/50 hover:text-bone"
      >
        + Add athlete
      </button>

      <p className="mt-5 text-[13.5px] text-bone-faint">
        {order.roster.length} of {order.athleteCount} athletes added. The rest is
        logistics.
      </p>
    </div>
  );
}

/* 05 — Review -------------------------------------------------------------- */
export function ReviewStep({ order, update }: StepProps) {
  return (
    <div>
      <StepIntro kicker="Step 05 / Request" title="Where do we send the quote?" />
      <div className="space-y-6">
        <TextField
          label="Your name"
          value={order.contactName}
          onChange={(v) => update({ contactName: v })}
          placeholder="Coach Rivera"
          required
          autoComplete="name"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            label="Email"
            type="email"
            value={order.email}
            onChange={(v) => update({ email: v })}
            placeholder="coach@club.org"
            required
            autoComplete="email"
          />
          <TextField
            label="Phone"
            type="tel"
            value={order.phone}
            onChange={(v) => update({ phone: v })}
            placeholder="Optional"
            autoComplete="tel"
          />
        </div>
        <label className="block">
          <FieldLabel>Anything we should know</FieldLabel>
          <textarea
            value={order.notes}
            onChange={(e) => update({ notes: e.target.value })}
            rows={3}
            placeholder="Timeline, colors you have in mind, returning roster size."
            className="w-full resize-none rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2 px-4 py-3 text-[16px] outline-none transition-colors placeholder:text-bone-faint focus:border-red"
          />
        </label>
        <p className="text-[13.5px] text-bone-faint">
          A real person reviews this and comes back with team pricing against
          your goals. No instant number, no obligation.
        </p>
      </div>
    </div>
  );
}
