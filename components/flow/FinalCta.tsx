import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section className="bg-surface py-32 text-center md:py-44">
      <div className="shell">
        <SplitText
          as="h2"
          immediate
          className="mx-auto max-w-[14ch] text-[clamp(40px,8vw,104px)] font-medium leading-[0.98] tracking-[-0.03em]"
          segments={[
            { text: "Build next" },
            { text: "season.", accent: true },
          ]}
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[44ch] text-[18px] leading-relaxed text-bone-soft">
            Open the order room, configure the package, and we will take it from
            there. If you are serious about your program, we are your partner.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/order" variant="solid" arrow magnetic className="px-8 py-4 text-base">
              Start your order
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
