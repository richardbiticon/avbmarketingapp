import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { ART_TEMPLATES } from "@/lib/stores";

/* Each art template is a typed design tile until the real artwork lands. The
   treatment rotates so the wall reads like a real design board. */
const TREATMENTS = [
  "bg-[#16181a] text-bone",
  "bg-red text-white",
  "bg-[#1D3FA0] text-white",
  "bg-[#1F3D2B] text-white",
  "bg-panel-2 text-bone",
  "bg-[#9E1B32] text-white",
];

export default function DesignGallery() {
  return (
    <section id="designs" className="scroll-mt-24 bg-surface py-28 md:py-36">
      <div className="shell">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-start">
          <Reveal>
            <span className="label border-t border-red pt-3 text-red">Design inspiration</span>
          </Reveal>
          <div>
            <SplitText
              as="h2"
              className="max-w-[20ch] text-[clamp(30px,4.6vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em]"
              segments={[{ text: "Thirty starting points. Yours will be" }, { text: "custom.", accent: true }]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-bone-soft">
                Browse the board. See something you like? Request a store and
                mention the art number, and our designers create logo options
                just for you.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ART_TEMPLATES.map((art, i) => (
            <Reveal key={art.no} delay={(i % 5) * 0.04}>
              <figure className="group">
                <div
                  className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-[4px] border border-[color:var(--line)] p-4 text-center ${TREATMENTS[i % TREATMENTS.length]}`}
                >
                  <span className="pointer-events-none absolute right-2 top-2 font-mono text-[9px] uppercase tracking-[0.16em] opacity-50">
                    {art.no}
                  </span>
                  <span className="text-[clamp(15px,2vw,22px)] font-bold uppercase leading-[0.95] tracking-tight transition-transform duration-500 ease-expo group-hover:scale-[1.05]">
                    {art.slogan}
                  </span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-[color:var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[40ch] text-[16px] text-bone-soft">
              See something you like? Request a store and mention the art number.
            </p>
            <ButtonLink href="#request" variant="solid" arrow magnetic>
              Request a store
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
