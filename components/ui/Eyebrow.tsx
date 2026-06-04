import { clsx } from "@/lib/clsx";

/** SF Mono eyebrow with a short red rule. Labels only, never sentences. */
export default function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={clsx("label inline-flex items-center gap-2.5", className)}>
      <span className="h-px w-7 bg-red" aria-hidden />
      <span className={onDark ? "text-bone/70" : undefined}>{children}</span>
    </span>
  );
}
