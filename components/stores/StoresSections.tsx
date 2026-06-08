import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { FEATURES, HOW_IT_WORKS, VALUE_PROPS } from "@/lib/stores";

export function ValueProps() {
  return (
    <section className="border-y border-[color:var(--line)] bg-panel">
      <div className="shell grid gap-px md:grid-cols-3">
        {VALUE_PROPS.map((v, i) => (
          <Reveal key={v.kicker} delay={i * 0.07}>
            <div className="px-2 py-10 md:px-8">
              <span className="label text-red">{v.kicker}</span>
              <p className="mt-3 text-[clamp(18px,2.2vw,24px)] font-medium leading-snug tracking-tight">
                {v.line}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Simplify() {
  return (
    <section className="bg-surface py-28 md:py-36">
      <div className="shell grid gap-12 md:grid-cols-[1fr_0.85fr] md:items-center">
        <div>
          <Eyebrow onDark>Simplify your ordering</Eyebrow>
          <SplitText
            as="h2"
            className="mt-7 max-w-[16ch] text-[clamp(30px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em]"
            segments={[
              { text: "Make your team look its" },
              { text: "best.", accent: true },
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-bone-soft">
              We make it easy for your team or club to look its best with a
              full-service setup for your uniform and spirit wear. It simplifies
              ordering for you and your families. Our whole team works behind the
              scenes so everyone loves the gear they get.
            </p>
          </Reveal>
        </div>

        {/* Demo store cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Demo Team Store", hint: "Blue Steel VBC", primary: "#1D3FA0", accent: "#C9A24B" },
            { label: "Demo Spirit Store", hint: "Elevate Volleyball", primary: "#9E1B32", accent: "#F3EFE6" },
          ].map((d) => (
            <Reveal key={d.label}>
              <a
                href="#builder"
                className="group block overflow-hidden rounded-[6px] border border-[color:var(--line)] bg-panel transition-colors hover:border-bone/30"
              >
                <div
                  className="relative flex h-36 items-end p-4"
                  style={{ backgroundColor: d.primary }}
                >
                  <span
                    className="absolute -right-4 -top-5 h-24 w-24 rotate-12"
                    style={{ backgroundColor: d.accent, opacity: 0.85, clipPath: "polygon(20% 0,100% 0,100% 100%)" }}
                    aria-hidden
                  />
                  <span className="relative text-[15px] font-bold uppercase tracking-tight text-white">
                    {d.hint}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <span className="text-[14px] font-medium text-bone">{d.label}</span>
                  <span className="text-red transition-transform duration-300 ease-expo group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FullService() {
  return (
    <section className="border-t border-[color:var(--line)] bg-panel py-28 md:py-36">
      <div className="shell">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-start">
          <Reveal>
            <span className="label border-t border-red pt-3 text-red">Our full-service setup</span>
          </Reveal>
          <SplitText
            as="h2"
            className="max-w-[18ch] text-[clamp(30px,4.6vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em]"
            segments={[{ text: "We handle the" }, { text: "whole", accent: true }, { text: "thing." }]}
          />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.05}>
              <div className="group h-full bg-panel p-7 transition-colors hover:bg-panel-2">
                <span className="label text-bone-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[19px] font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-bone-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-surface py-28 md:py-36">
      <div className="shell">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-start">
          <Reveal>
            <span className="label border-t border-red pt-3 text-red">How it works</span>
          </Reveal>
          <SplitText
            as="h2"
            className="max-w-[18ch] text-[clamp(30px,4.6vw,54px)] font-semibold leading-[1.05] tracking-[-0.03em]"
            segments={[{ text: "One link. Families do the" }, { text: "rest.", accent: true }]}
          />
        </div>
        <div className="grid gap-7 md:grid-cols-4 md:gap-6">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.07}>
              <div className="group border-t border-bone/20 pt-5 transition-transform duration-500 ease-expo hover:-translate-y-2 hover:border-red">
                <span className="label text-red">Step {s.no}</span>
                <h3 className="mt-3 text-[21px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HighTech() {
  return (
    <section className="relative overflow-hidden border-y border-[color:var(--line)] bg-panel py-28 md:py-36">
      <div
        className="tech-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div className="shell relative text-center">
        <SplitText
          as="h2"
          className="mx-auto max-w-[16ch] text-[clamp(34px,6vw,80px)] font-semibold leading-[0.98] tracking-[-0.03em]"
          segments={[{ text: "High tech." }, { text: "High touch.", accent: true }]}
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[46ch] text-[18px] leading-relaxed text-bone-soft">
            High-tech tooling for stores, spirit wear, and decoration. High-touch
            service for you and your families.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="#request" variant="solid" arrow magnetic className="px-8 py-4 text-base">
              Get started
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
