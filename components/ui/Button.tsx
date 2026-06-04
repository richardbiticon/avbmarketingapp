"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { clsx } from "@/lib/clsx";

type Variant = "solid" | "ghost" | "light";

interface BaseProps {
  variant?: Variant;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
}

const base =
  "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-none px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300 ease-expo";

const variants: Record<Variant, string> = {
  // Primary: red fill, deeper-red curtain rises on hover.
  solid: "border border-red bg-red text-white hover:border-red-alt",
  // Outlined on dark, fills bone on hover (text flips dark).
  ghost: "border border-[color:var(--line-strong)] text-bone hover:text-surface hover:border-bone",
  // For dark surfaces — same flip, lighter resting border.
  light: "border border-bone/40 text-bone hover:text-surface hover:border-bone",
};

const curtain: Record<Variant, string> = {
  solid: "bg-red-alt",
  ghost: "bg-bone",
  light: "bg-bone",
};

function Inner({
  variant = "solid",
  arrow,
  children,
}: {
  variant: Variant;
  arrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span
        aria-hidden
        className={clsx(
          "absolute inset-0 z-0 translate-y-[101%] transition-transform duration-[450ms] ease-expo group-hover:translate-y-0",
          curtain[variant]
        )}
      />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span
          aria-hidden
          className="relative z-10 transition-transform duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1"
        >
          ↗
        </span>
      )}
    </>
  );
}

interface LinkButtonProps extends BaseProps {
  href: string;
}

export function ButtonLink({
  href,
  variant = "solid",
  arrow,
  magnetic,
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      data-magnetic={magnetic ? "" : undefined}
      className={clsx(base, variants[variant], className)}
    >
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </Link>
  );
}

interface ActionButtonProps
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

export const Button = forwardRef<HTMLButtonElement, ActionButtonProps>(
  function Button(
    { variant = "solid", arrow, magnetic, className, children, ...rest },
    ref
  ) {
    return (
      <button
        ref={ref}
        data-magnetic={magnetic ? "" : undefined}
        className={clsx(base, variants[variant], className)}
        {...rest}
      >
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </button>
    );
  }
);
