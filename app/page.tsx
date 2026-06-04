import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Hero from "@/components/flow/Hero";
import Marquee from "@/components/flow/Marquee";
import Statement from "@/components/flow/Statement";
import Process from "@/components/flow/Process";
import KitShowcase from "@/components/flow/KitShowcase";
import TeamBand from "@/components/flow/TeamBand";
import FinalCta from "@/components/flow/FinalCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Process />
        <KitShowcase />
        <TeamBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
