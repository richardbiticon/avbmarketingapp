import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * A real photography component. When a src is present it renders next/image
 * with a fixed aspect ratio (no layout shift). When it is not, it renders a
 * labeled, correctly-proportioned slot so the gap reads as "photo goes here,"
 * never as a gradient placeholder. Never emoji, never AI art.
 */
export default function PhotoSlot({
  src,
  alt,
  ratio = "aspect-[4/5]",
  label = "Product photography",
  className,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority,
  contain,
  tone = "cream",
}: {
  src?: string;
  alt: string;
  ratio?: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  contain?: boolean;
  tone?: "cream" | "ink";
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        ratio,
        tone === "cream" ? "bg-panel-2" : "bg-surface",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={clsx(
            contain ? "object-contain p-6" : "object-cover",
            "transition-transform duration-700 ease-expo"
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-5">
          <span
            className={clsx(
              "label",
              tone === "ink" ? "text-bone/55" : "text-bone-faint"
            )}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
