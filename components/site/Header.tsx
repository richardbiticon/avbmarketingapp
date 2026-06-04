"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

const NAV = [
  { href: "/#process", label: "How it works" },
  { href: "/#package", label: "The package" },
  { href: "/#standard", label: "The standard" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[75] h-0.5 origin-left bg-red"
        aria-hidden
      />
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[70] border-b transition-[background,border-color,backdrop-filter] duration-300 ease-expo",
          scrolled
            ? "border-[color:var(--line)] bg-surface/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-[19px] font-semibold tracking-tight"
          >
            All Volleyball
            <span className="label text-bone-faint">Team Order</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-bone-soft transition-colors duration-300 hover:text-bone"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-red transition-all duration-300 ease-expo group-hover:w-full" />
              </Link>
            ))}
            <ButtonLink href="/order" arrow magnetic>
              Start your order
            </ButtonLink>
          </nav>

          <ButtonLink href="/order" arrow className="md:hidden">
            Start
          </ButtonLink>
        </div>
      </header>
    </>
  );
}
