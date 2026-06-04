import type { Metadata } from "next";
import Link from "next/link";
import OrderBuilder from "@/components/order/OrderBuilder";

export const metadata: Metadata = {
  title: "The order room. All Volleyball Team Order.",
  description:
    "Configure your team package and request a consultative quote. Volleyball only.",
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-surface/85 backdrop-blur-xl">
        <div className="shell flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-[19px] font-semibold tracking-tight"
          >
            All Volleyball
            <span className="label text-bone-faint">The order room</span>
          </Link>
          <Link
            href="/"
            className="text-[14px] font-medium text-bone-soft transition-colors hover:text-red"
          >
            ← Leave
          </Link>
        </div>
      </header>

      <main className="shell py-12 md:py-16">
        <div className="mb-10 max-w-[40ch]">
          <h1 className="text-[clamp(28px,4vw,46px)] font-medium leading-[1.05] tracking-[-0.025em]">
            Configure your team package.
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-bone-soft">
            Buying for a club? This is where it starts. Contact us for special
            pricing once you have the look you want.
          </p>
        </div>
        <OrderBuilder />
      </main>
    </div>
  );
}
