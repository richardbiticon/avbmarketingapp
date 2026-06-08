"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BRANDS, STORE_TYPES, TEAM_ITEMS } from "@/lib/stores";
import { EASE } from "@/lib/motion";
import { clsx } from "@/lib/clsx";
import { Button } from "@/components/ui/Button";

type QType = "text" | "email" | "textarea" | "single" | "multi" | "file";

interface Question {
  id: string;
  type: QType;
  title: string;
  subtitle?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; hint?: string }[];
  /** Only show this question when this predicate passes. */
  when?: (a: Record<string, string | string[]>) => boolean;
}

const letter = (i: number) => String.fromCharCode(65 + i);

const QUESTIONS: Question[] = [
  { id: "name", type: "text", title: "What is your first and last name?", required: true, placeholder: "Coach Rivera" },
  { id: "email", type: "email", title: "What is your email address?", required: true, placeholder: "coach@club.org" },
  { id: "team", type: "text", title: "What is the name of your team or club?", required: true, placeholder: "Northshore VBC" },
  { id: "colors", type: "text", title: "What are your team or club colors?", subtitle: "Optional, but it helps us start the design.", placeholder: "Navy and gold" },
  {
    id: "storeType",
    type: "single",
    title: "What kind of store are you looking for?",
    required: true,
    options: STORE_TYPES.map((s) => ({ value: s.id, label: s.label, hint: s.blurb })),
  },
  {
    id: "teamItems",
    type: "multi",
    title: "Which team items do you want in your store?",
    subtitle: "Choose as many as you like.",
    when: (a) => a.storeType !== "spirit",
    options: TEAM_ITEMS.map((t) => ({ value: t, label: t })),
  },
  {
    id: "logo",
    type: "single",
    title: "Do you have a logo?",
    required: true,
    options: [
      { value: "upload", label: "Yes, I'll upload it now" },
      { value: "email", label: "Yes, I'll email it later" },
      { value: "none", label: "No, I need some designs" },
    ],
  },
  {
    id: "logoFile",
    type: "file",
    title: "Great. Upload your logo here.",
    subtitle: "PNG, JPG, SVG, or PDF. Up to 10MB.",
    when: (a) => a.logo === "upload",
  },
  {
    id: "brand",
    type: "single",
    title: "Which brand would you like featured?",
    options: BRANDS.map((b) => ({ value: b, label: b })),
  },
  {
    id: "fundraiser",
    type: "single",
    title: "Want to use this store as a fundraiser for your program?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "notes",
    type: "textarea",
    title: "Anything else you want to share?",
    subtitle: "Timelines, art numbers you liked, a brand request.",
    placeholder: "We'd like the store open before tryouts in three weeks.",
  },
];

const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export default function RequestStore() {
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = useMemo(
    () => QUESTIONS.filter((q) => !q.when || q.when(answers)),
    [answers]
  );
  const clamped = Math.min(index, active.length - 1);
  const q = active[clamped];

  const valueOf = (id: string) => answers[id];
  const setValue = (id: string, v: string | string[]) =>
    setAnswers((a) => ({ ...a, [id]: v }));

  const isValid = (question: Question) => {
    const v = answers[question.id];
    if (!question.required) return true;
    if (question.type === "email") return typeof v === "string" && emailOk(v);
    if (question.type === "single") return typeof v === "string" && v.length > 0;
    return typeof v === "string" && v.trim().length > 0;
  };

  const goNext = () => {
    if (!isValid(q)) return;
    if (clamped >= active.length - 1) {
      setSubmitted(true);
      return;
    }
    setIndex(clamped + 1);
  };
  const goBack = () => setIndex(Math.max(0, clamped - 1));

  const pickSingle = (value: string) => {
    setValue(q.id, value);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    // brief highlight, then auto-advance like a typeform
    advanceTimer.current = setTimeout(
      () => setIndex((i) => Math.min(active.length, i + 1)),
      reduce ? 0 : 260
    );
  };

  const toggleMulti = (value: string) => {
    const cur = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
    setValue(
      q.id,
      cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]
    );
  };

  if (submitted) return <Done answers={answers} />;

  const progress = ((clamped + 1) / active.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <span className="label text-bone-soft">
            {String(clamped + 1).padStart(2, "0")} / {String(active.length).padStart(2, "0")}
          </span>
          <span className="label text-bone-faint">Request a store</span>
        </div>
        <div className="h-0.5 w-full overflow-hidden bg-panel-2">
          <motion.span
            className="block h-full bg-red"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>

      <motion.div
        key={q.id}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="flex items-start gap-3">
          <span className="mt-1.5 text-red">↳</span>
          <div className="flex-1">
            <h2 className="text-[clamp(22px,3.2vw,34px)] font-semibold leading-tight tracking-[-0.02em]">
              {q.title}
              {q.required && <span className="text-red"> *</span>}
            </h2>
            {q.subtitle && (
              <p className="mt-2 text-[15px] text-bone-soft">{q.subtitle}</p>
            )}

            <div className="mt-7">
              {(q.type === "text" || q.type === "email") && (
                <input
                  autoFocus
                  type={q.type}
                  value={(valueOf(q.id) as string) || ""}
                  onChange={(e) => setValue(q.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && goNext()}
                  placeholder={q.placeholder}
                  className="w-full border-0 border-b border-[color:var(--line-strong)] bg-transparent pb-3 text-[clamp(20px,3vw,30px)] text-bone outline-none transition-colors placeholder:text-bone-faint/60 focus:border-red"
                />
              )}

              {q.type === "textarea" && (
                <textarea
                  autoFocus
                  rows={3}
                  value={(valueOf(q.id) as string) || ""}
                  onChange={(e) => setValue(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full resize-none rounded-[4px] border border-[color:var(--line-strong)] bg-panel-2 p-4 text-[17px] text-bone outline-none transition-colors placeholder:text-bone-faint/60 focus:border-red"
                />
              )}

              {q.type === "single" && (
                <div className="flex flex-col gap-2.5">
                  {q.options!.map((opt, i) => {
                    const sel = valueOf(q.id) === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => pickSingle(opt.value)}
                        className={clsx(
                          "group flex items-center gap-3.5 rounded-[4px] border p-4 text-left transition-all duration-200 ease-expo",
                          sel
                            ? "border-red bg-panel-2"
                            : "border-[color:var(--line-strong)] hover:border-bone/40 hover:bg-panel/60"
                        )}
                      >
                        <span
                          className={clsx(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] text-[13px] font-bold",
                            sel ? "bg-red text-white" : "bg-panel-3 text-bone-soft"
                          )}
                        >
                          {letter(i)}
                        </span>
                        <span>
                          <span className="block text-[16px] font-medium text-bone">{opt.label}</span>
                          {opt.hint && (
                            <span className="block text-[13px] text-bone-soft">{opt.hint}</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "multi" && (
                <div className="flex flex-col gap-2.5">
                  {q.options!.map((opt, i) => {
                    const arr = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : [];
                    const sel = arr.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleMulti(opt.value)}
                        aria-pressed={sel}
                        className={clsx(
                          "flex items-center gap-3.5 rounded-[4px] border p-4 text-left transition-all duration-200 ease-expo",
                          sel
                            ? "border-red bg-panel-2"
                            : "border-[color:var(--line-strong)] hover:border-bone/40"
                        )}
                      >
                        <span
                          className={clsx(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] text-[13px] font-bold",
                            sel ? "bg-red text-white" : "bg-panel-3 text-bone-soft"
                          )}
                        >
                          {sel ? "✓" : letter(i)}
                        </span>
                        <span className="text-[16px] font-medium text-bone">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "file" && (
                <FileDrop
                  value={(valueOf(q.id) as string) || ""}
                  onChange={(v) => setValue(q.id, v)}
                />
              )}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button onClick={goNext} arrow={clamped < active.length - 1} disabled={!isValid(q)}>
                {clamped >= active.length - 1 ? "Submit request" : "OK"}
              </Button>
              {clamped > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-[14px] font-medium text-bone-soft transition-colors hover:text-bone"
                >
                  ← Back
                </button>
              )}
              <span className="hidden text-[12.5px] text-bone-faint sm:block">
                press Enter ↵
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FileDrop({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] border border-dashed border-[color:var(--line-strong)] bg-panel-2 px-6 py-10 text-center transition-colors hover:border-red">
      <span className="text-[15px] font-medium text-bone">
        {value || "Choose a file or drag it here"}
      </span>
      <span className="text-[12.5px] text-bone-faint">Up to 10MB</span>
      <input
        type="file"
        className="sr-only"
        accept=".png,.jpg,.jpeg,.svg,.pdf"
        onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")}
      />
    </label>
  );
}

function Done({ answers }: { answers: Record<string, string | string[]> }) {
  const reduce = useReducedMotion();
  const first = String(answers.name ?? "").split(" ")[0] || "coach";
  const team = String(answers.team ?? "your program");
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto max-w-2xl py-8 text-center"
    >
      <span className="label text-red">Request received</span>
      <h2 className="mt-4 text-[clamp(30px,5vw,52px)] font-semibold leading-[1.04] tracking-[-0.025em]">
        Your store is in motion, <span className="accent">{first}.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-[48ch] text-[17px] leading-relaxed text-bone-soft">
        An account manager will set up the store for{" "}
        <strong className="font-semibold text-bone">{team}</strong> and follow up
        to lock the products, decoration, and timeline. Setup takes 1 to 2
        business days. Gear you love. On time. Under budget. Done correctly.
      </p>
      <a
        href="#top"
        className="mt-9 inline-block text-[14px] font-medium text-bone-soft transition-colors hover:text-red"
      >
        ← Back to the top
      </a>
    </motion.div>
  );
}
