"use client";

import { clsx } from "@/lib/clsx";

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="label mb-2.5 block text-bone-soft">{children}</span>;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>
        {label}
        {required && <span className="text-red"> *</span>}
      </FieldLabel>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2 px-4 py-3 text-[16px] text-bone outline-none transition-colors duration-200 placeholder:text-bone-faint focus:border-red"
      />
    </label>
  );
}

export function Stepper({
  label,
  value,
  onChange,
  min = 1,
  max = 60,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, v)));
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="inline-flex items-center rounded-[3px] border border-[color:var(--line-strong)] bg-panel-2">
        <button
          type="button"
          onClick={() => set(value - 1)}
          aria-label="Decrease"
          className="flex h-12 w-12 items-center justify-center text-xl text-bone-soft transition-colors hover:text-red"
        >
          −
        </button>
        <span className="w-14 text-center text-[18px] font-medium tabular-nums">
          {value}
        </span>
        <button
          type="button"
          onClick={() => set(value + 1)}
          aria-label="Increase"
          className="flex h-12 w-12 items-center justify-center text-xl text-bone-soft transition-colors hover:text-red"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function ChoiceChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "rounded-none border px-5 py-2.5 text-[14px] font-medium transition-all duration-200 ease-expo",
        active
          ? "border-red bg-red text-white"
          : "border-[color:var(--line-strong)] text-bone-soft hover:border-bone/50 hover:text-bone"
      )}
    >
      {children}
    </button>
  );
}
