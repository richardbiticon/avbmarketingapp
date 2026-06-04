"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  INITIAL_ORDER,
  KIT_PIECES,
  getColorway,
  type OrderState,
} from "@/lib/order";
import { EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import JerseyPreview from "./JerseyPreview";
import {
  ColorStep,
  PiecesStep,
  ProgramStep,
  ReviewStep,
  RosterStep,
  type StepProps,
} from "./steps";

const STEPS: {
  id: string;
  label: string;
  Component: (p: StepProps) => JSX.Element;
  valid: (o: OrderState) => boolean;
}[] = [
  { id: "program", label: "Program", Component: ProgramStep, valid: (o) => o.programName.trim().length > 1 },
  { id: "pieces", label: "Package", Component: PiecesStep, valid: (o) => o.pieces.length > 0 },
  { id: "colors", label: "Look", Component: ColorStep, valid: () => true },
  { id: "roster", label: "Roster", Component: RosterStep, valid: () => true },
  { id: "review", label: "Request", Component: ReviewStep, valid: (o) => o.contactName.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.email) },
];

export default function OrderBuilder() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState<OrderState>(INITIAL_ORDER);
  const [step, setStep] = useState(0);
  const [previewNumber, setPreviewNumber] = useState("10");
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<OrderState>) =>
    setOrder((o) => ({ ...o, ...patch }));

  const current = STEPS[step];
  const canAdvance = current.valid(order);
  const isLast = step === STEPS.length - 1;
  const colorway = getColorway(order.colorway);

  const pieceNames = useMemo(
    () =>
      KIT_PIECES.filter((p) => order.pieces.includes(p.id)).map((p) => p.name),
    [order.pieces]
  );

  const next = () => {
    if (!canAdvance) return;
    if (isLast) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (submitted) return <Confirmation order={order} colorway={colorway} pieceNames={pieceNames} />;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
      {/* Builder column */}
      <div className="order-2 lg:order-1">
        {/* Progress */}
        <div className="mb-9">
          <div className="mb-3 flex items-center justify-between">
            <span className="label text-bone-soft">
              {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
            <div className="hidden gap-1.5 sm:flex">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-label={`Go to ${s.label}`}
                  className={`label transition-colors ${
                    i === step
                      ? "text-bone"
                      : i < step
                        ? "text-bone-faint hover:text-red"
                        : "text-bone-faint/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-0.5 w-full overflow-hidden bg-panel-2">
            <motion.span
              className="block h-full bg-red"
              initial={false}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>

        {/* Step body. In-only animation keyed by step: the new step always
            mounts immediately rather than waiting on an exit to finish. */}
        <div className="min-h-[340px]">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <current.Component
              order={order}
              update={update}
              previewNumber={previewNumber}
              setPreviewNumber={setPreviewNumber}
            />
          </motion.div>
        </div>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between border-t border-[color:var(--line)] pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="text-[14px] font-medium text-bone-soft transition-colors enabled:hover:text-bone disabled:opacity-30"
          >
            ← Back
          </button>
          <Button onClick={next} arrow={!isLast} disabled={!canAdvance}>
            {isLast ? "Request quote" : "Continue"}
          </Button>
        </div>
      </div>

      {/* Preview column */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[4px] border border-[color:var(--line)] bg-panel">
            <div className="ticks relative flex aspect-[4/3] items-center justify-center bg-surface p-6 lg:aspect-square">
              {/* Spotlight pool */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.09), transparent 58%)",
                }}
                aria-hidden
              />
              {/* Live label */}
              <span className="label absolute left-4 top-4 z-10 text-bone-faint">
                Live preview
              </span>
              {/* Red baseline the kit stands on */}
              <div className="pointer-events-none absolute inset-x-10 bottom-[14%] h-px bg-red/70" aria-hidden />
              <div className="relative z-10 h-full w-full max-w-[280px]">
                <JerseyPreview
                  colorway={colorway}
                  pattern={order.pattern}
                  number={previewNumber}
                  programName={order.programName}
                />
              </div>
            </div>
            <div className="border-t border-[color:var(--line)] p-6">
              <span className="label text-bone-faint">Your order, so far</span>
              <dl className="mt-4 space-y-2.5 text-[14.5px]">
                <Row k="Program" v={order.programName || "Not set"} />
                <Row k="Level" v={order.level} />
                <Row k="Athletes" v={String(order.athleteCount)} />
                <Row k="Colorway" v={colorway.name} />
                <Row
                  k="Pieces"
                  v={pieceNames.length ? pieceNames.join(", ") : "None yet"}
                />
                {order.roster.length > 0 && (
                  <Row k="Roster" v={`${order.roster.length} added`} />
                )}
              </dl>
            </div>
          </div>
          <p className="mt-4 px-1 text-[13px] leading-relaxed text-bone-faint">
            Nothing here is locked. Quoting is consultative, so the next step is a
            conversation, never a checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="label shrink-0 text-bone-faint">{k}</dt>
      <dd className="text-right font-medium text-bone">{v}</dd>
    </div>
  );
}

function Confirmation({
  order,
  colorway,
  pieceNames,
}: {
  order: OrderState;
  colorway: ReturnType<typeof getColorway>;
  pieceNames: string[];
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto max-w-2xl py-10 text-center"
    >
      <span className="label text-red">Request received</span>
      <h1 className="mt-4 text-[clamp(32px,5vw,56px)] font-medium leading-[1.05] tracking-[-0.025em]">
        We have it from here,{" "}
        <span className="accent">{order.contactName.split(" ")[0] || "coach"}.</span>
      </h1>
      <p className="mx-auto mt-6 max-w-[48ch] text-[17px] leading-relaxed text-bone-soft">
        A real person on the team side is reviewing your order for{" "}
        <strong className="font-semibold text-bone">
          {order.programName || "your program"}
        </strong>{" "}
        and will reach you at {order.email} with team pricing against your goals.
        Gear you love. On time. Under budget. Done correctly.
      </p>

      <div className="mx-auto mt-10 max-w-md rounded-[4px] border border-[color:var(--line)] bg-panel p-6 text-left">
        <span className="label text-bone-faint">What we are quoting</span>
        <dl className="mt-4 space-y-2.5 text-[14.5px]">
          <Row k="Program" v={order.programName || "Not set"} />
          <Row k="Level" v={order.level} />
          <Row k="Athletes" v={String(order.athleteCount)} />
          <Row k="Colorway" v={colorway.name} />
          <Row k="Pieces" v={pieceNames.join(", ") || "None yet"} />
        </dl>
      </div>

      <div className="mt-9">
        <Link
          href="/"
          className="text-[14px] font-medium text-bone-soft transition-colors hover:text-red"
        >
          ← Back to the start
        </Link>
      </div>
    </motion.div>
  );
}
