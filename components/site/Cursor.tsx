"use client";

import { useEffect, useRef } from "react";

/**
 * Dot + lagging ring cursor. Mounts only on fine-pointer, motion-allowed
 * sessions. The ring grows over interactive targets and magnetic elements
 * (data-magnetic) ease toward the pointer. Pure transform writes, no React
 * re-renders in the loop.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    document.body.classList.add("has-cursor");
    const d = dot.current!;
    const r = ring.current!;
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    const grow = () => r.classList.add("grow");
    const shrink = () => r.classList.remove("grow");

    const targets = document.querySelectorAll(
      "a, button, input, select, textarea, [data-cursor]"
    );
    targets.forEach((t) => {
      t.addEventListener("mouseenter", grow);
      t.addEventListener("mouseleave", shrink);
    });

    const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const onMagnet = (e: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    };
    const magnetHandlers: Array<() => void> = [];
    magnets.forEach((el) => {
      el.style.transition = "transform 0.35s cubic-bezier(0.16,1,0.3,1)";
      const move = (e: MouseEvent) => onMagnet(e, el);
      const leave = () => (el.style.transform = "translate(0,0)");
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      magnetHandlers.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    });

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", grow);
        t.removeEventListener("mouseleave", shrink);
      });
      magnetHandlers.forEach((off) => off());
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
