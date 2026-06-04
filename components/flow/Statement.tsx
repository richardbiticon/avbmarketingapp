import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";

export default function Statement() {
  return (
    <section className="bg-surface py-28 md:py-36">
      <div className="shell">
        <SplitText
          as="p"
          className="max-w-[20ch] text-[clamp(30px,5vw,60px)] font-medium leading-[1.1] tracking-[-0.025em]"
          segments={[
            { text: "The teams that look ready in fall" },
            { text: "started", accent: true },
            { text: "in spring." },
          ]}
        />
        <Reveal delay={0.1}>
          <p className="mt-9 max-w-[54ch] text-[clamp(17px,2vw,20px)] leading-relaxed text-bone-soft">
            Right now is when next season actually gets built. Rosters,
            uniforms, shoes, the whole package. The programs that plan early are
            the ones not scrambling once the gym fills back up. When you plan
            with us, you are planning with people who already know your season.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
