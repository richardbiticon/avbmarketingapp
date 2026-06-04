import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { KIT_PIECES } from "@/lib/order";

export default function KitShowcase() {
  return (
    <section id="package" className="scroll-mt-24 bg-surface py-28 md:py-36">
      <div className="shell">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-start">
          <Reveal>
            <span className="label border-t border-red pt-3 text-red">
              02 / The package
            </span>
          </Reveal>
          <div>
            <SplitText
              as="h2"
              className="max-w-[20ch] text-[clamp(30px,4.6vw,56px)] font-medium leading-[1.05] tracking-[-0.025em]"
              segments={[
                { text: "One order. The" },
                { text: "whole", accent: true },
                { text: "look." },
              ]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[50ch] text-[17px] leading-relaxed text-bone-soft">
                Pick the pieces your program needs. Equipment is excluded from
                discounts, and we say so plainly on every line it touches.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-3">
          {KIT_PIECES.map((piece, i) => (
            <Reveal key={piece.id} delay={(i % 3) * 0.06}>
              <article className="group relative flex h-full flex-col bg-surface">
                <div className="relative aspect-[4/5] overflow-hidden bg-panel-2">
                  {piece.photo ? (
                    <Image
                      src={piece.photo}
                      alt={piece.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-contain p-7 transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <span
                        className="text-[clamp(54px,7vw,84px)] font-medium leading-none tracking-tight text-bone/[0.07]"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-4 text-[19px] font-medium tracking-tight text-bone/80">
                        {piece.name}
                      </span>
                      <span className="label mt-3 text-bone-faint">
                        Team photography
                      </span>
                    </div>
                  )}
                  {piece.equipment && (
                    <span className="label absolute left-4 top-4 rounded-full bg-surface/90 px-2.5 py-1 text-[10px] text-bone">
                      Equipment
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col border-t border-[color:var(--line)] p-6">
                  <h3 className="text-[19px] font-medium tracking-tight">
                    {piece.name}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-bone-soft">
                    {piece.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
