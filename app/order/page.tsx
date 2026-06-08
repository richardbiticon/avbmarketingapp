import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import Footer from "@/components/site/Footer";
import StoreBuilder from "@/components/stores/StoreBuilder";
import RequestStore from "@/components/stores/RequestStore";
import DesignGallery from "@/components/stores/DesignGallery";
import StoresFaq from "@/components/stores/StoresFaq";
import {
  ValueProps,
  Simplify,
  FullService,
  HowItWorks,
  HighTech,
} from "@/components/stores/StoresSections";

export const metadata: Metadata = {
  title: "Team & Spirit Stores. All Volleyball.",
  description:
    "Your club, its own branded store. Families order their own gear, decorated to spec and shipped to homes or the club. Volleyball only.",
};

export default function StoresPage() {
  return (
    <div id="top" className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-surface/85 backdrop-blur-xl">
        <div className="shell flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2 text-[19px] font-semibold tracking-tight">
            All Volleyball
            <span className="label text-bone-faint">Team &amp; Spirit Stores</span>
          </Link>
          <div className="flex items-center gap-5">
            <a href="#faq" className="hidden text-[14px] font-medium text-bone-soft transition-colors hover:text-bone sm:block">
              FAQ
            </a>
            <ButtonLink href="#request" arrow magnetic>
              Request a store
            </ButtonLink>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(100% 70% at 80% 0%, rgba(215,23,42,0.12), transparent 56%)",
          }}
          aria-hidden
        />
        <div className="relative shell pb-16 pt-28 md:pt-32">
          <Reveal>
            <Eyebrow onDark>Team &amp; Spirit Stores</Eyebrow>
          </Reveal>
          <SplitText
            as="h1"
            immediate
            className="mt-7 max-w-[18ch] text-[clamp(44px,8.5vw,116px)] font-semibold leading-[0.92] tracking-[-0.035em]"
            segments={[
              { text: "Give your club its own" },
              { text: "store.", accent: true },
            ]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[56ch] text-[clamp(17px,2vw,21px)] leading-relaxed text-bone/65">
              A branded storefront for your team. Families order their own
              uniforms, warmups, and spirit wear, decorated to spec and shipped
              to homes or to the club. You never front the cost or chase the
              sizing. Build yours below and watch it come together.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap gap-3.5">
              <ButtonLink href="#builder" variant="solid" arrow magnetic>
                Build it live
              </ButtonLink>
              <ButtonLink href="#builder" variant="light" magnetic>
                View demo team store
              </ButtonLink>
              <ButtonLink href="#builder" variant="light" magnetic>
                View demo spirit store
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive builder */}
      <section id="builder" className="scroll-mt-20 border-t border-[color:var(--line)] bg-panel py-20 md:py-28">
        <div className="shell">
          <div className="mb-12 max-w-[44ch]">
            <span className="label text-red">Build your store</span>
            <h2 className="mt-3 text-[clamp(26px,3.6vw,42px)] font-semibold leading-[1.06] tracking-[-0.025em]">
              Type your name, pick your colors, and watch it build.
            </h2>
          </div>
          <StoreBuilder />
        </div>
      </section>

      <ValueProps />
      <Simplify />
      <FullService />
      <HowItWorks />
      <DesignGallery />
      <HighTech />
      <StoresFaq />

      {/* Request flow */}
      <section id="request" className="scroll-mt-20 bg-surface py-24 md:py-32">
        <div className="shell">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="label text-red">Request a store</span>
            <h2 className="mt-3 text-[clamp(28px,4.4vw,52px)] font-semibold leading-[1.04] tracking-[-0.03em]">
              Let us set one up for you.
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-bone-soft">
              We just need to ask a few questions. It takes about two minutes.
            </p>
          </div>
          <RequestStore />
        </div>
      </section>

      <Footer />
    </div>
  );
}
