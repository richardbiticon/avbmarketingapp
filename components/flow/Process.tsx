import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

const STEPS = [
  {
    no: "01",
    title: "Configure",
    body: "Build the package in the order room. Pieces, colors, the look on the court. It takes minutes and nothing is locked.",
  },
  {
    no: "02",
    title: "Roster",
    body: "Add names, numbers, and sizes, or hand us a list. We run the sizing for the whole group so nobody is left guessing.",
  },
  {
    no: "03",
    title: "We quote",
    body: "A real person reviews it and comes back with team pricing against your goals. Quoting here is a conversation, not a vending machine.",
  },
  {
    no: "04",
    title: "Delivered",
    body: "Approved, produced, and shipped ahead of your season. Gear you love. On time. Under budget. Done correctly.",
  },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-panel py-28 md:py-36">
      <div className="shell">
        <div className="mb-16 grid gap-8 md:grid-cols-[0.42fr_1fr] md:items-start">
          <Reveal>
            <span className="label border-t border-red pt-3 text-red">
              01 / How it works
            </span>
          </Reveal>
          <SplitText
            as="h2"
            className="max-w-[18ch] text-[clamp(30px,4.6vw,56px)] font-medium leading-[1.05] tracking-[-0.025em]"
            segments={[
              { text: "From first idea to a team that looks" },
              { text: "ready.", accent: true },
            ]}
          />
        </div>

        <div className="grid gap-7 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 0.07}>
              <div className="group border-t border-bone/20 pt-5 transition-transform duration-500 ease-expo hover:-translate-y-2 hover:border-red">
                <span className="label text-red">Step {step.no}</span>
                <h3 className="mt-3 text-[23px] font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
