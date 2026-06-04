import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

const POINTS = [
  {
    no: "01",
    title: "Volleyball only",
    body: "Not a general sports dealer with a volleyball shelf. The whole business is this one sport, so the people quoting your order already know it.",
  },
  {
    no: "02",
    title: "Real sizing, real rosters",
    body: "We run the sizing for the full group, names and numbers handled, so nobody is stuck in the wrong fit on the first day.",
  },
  {
    no: "03",
    title: "Team pricing, consultative",
    body: "A person reviews your order and quotes against your goals. No instant number that ignores what your program actually needs.",
  },
  {
    no: "04",
    title: "Ahead of your season",
    body: "Planned early and delivered on time, so the gear is there before tryouts, not chasing them.",
  },
];

export default function TeamBand() {
  return (
    <section
      id="standard"
      className="scroll-mt-24 relative overflow-hidden border-y border-[color:var(--line)] bg-panel py-28 text-bone md:py-36"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="shell relative grid gap-16 md:grid-cols-[1fr_0.85fr] md:items-center">
        <div>
          <Eyebrow onDark>03 / The standard</Eyebrow>
          <SplitText
            as="h2"
            className="mt-7 max-w-[16ch] text-[clamp(32px,5vw,62px)] font-medium leading-[1.04] tracking-[-0.025em]"
            segments={[
              { text: "Built for teams and clubs where" },
              { text: "average", accent: true },
              { text: "is not good enough." },
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[44ch] text-[18px] leading-relaxed text-bone/70">
              Too big to care. Too small to deliver. That is the gap most teams
              get stuck in. We are not the cheapest, and we are not trying to be.
              We are the partner that gets it right.
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-bone/15">
          {POINTS.map((point, i) => (
            <Reveal as="li" key={point.no} delay={i * 0.06}>
              <div className="group flex gap-5 border-b border-bone/15 py-6 transition-[padding] duration-400 ease-expo hover:pl-3">
                <span className="label min-w-[28px] text-red">{point.no}</span>
                <div>
                  <h3 className="text-[18px] font-medium text-bone">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-bone/55">
                    {point.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
