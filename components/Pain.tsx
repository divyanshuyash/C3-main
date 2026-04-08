"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const painPoints = [
  "No control over your time",
  "Income depends on one salary",
  "Fear of layoffs and AI replacement",
  "No direction beyond your job",
  "You do not own what you create",
  "You keep postponing your life"
];

const headline = "YOU ARE CAPABLE. BUT DEPENDENT.";

export function Pain() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      const letters = letterRefs.current;
      const cards = gridRef.current?.querySelectorAll("[data-pain-card]");

      gsap.from(letters, {
        opacity: 0,
        y: 40,
        skewX: -8,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        }
      });

      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%"
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id="pain" ref={sectionRef} className="section-pad bg-navy/40">
      <div className="c3-container">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="section-label">Why This Bootcamp Exists</p>
          <h2 className="mt-6 flex flex-wrap justify-center gap-x-1 font-display text-[48px] uppercase leading-[0.92] tracking-[0.06em] text-white md:text-[60px]">
            {headline.split("").map((char, index) => (
              <span
                key={`${char}-${index}`}
                ref={(node) => {
                  if (node) {
                    letterRefs.current[index] = node;
                  }
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_1.25fr] lg:items-start">
          <div className="rounded-[28px] border border-orange/12 bg-card/95 p-8 shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
            <div className="h-full rounded-[20px] border-l-4 border-orange bg-black/70 p-6">
              <p className="font-display text-[34px] uppercase leading-[1] tracking-[0.05em] text-white md:text-[44px]">
                One company. One role. One income stream.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                ...is not security. It is RISK disguised as stability.
              </p>
            </div>
          </div>

          <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {painPoints.map((item, index) => (
              <article
                key={item}
                data-pain-card
                className="rounded-2xl border border-orange/10 border-t-2 border-t-orange bg-card/95 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.24)]"
              >
                <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-orange">
                  0{index + 1}
                </p>
                <p className="mt-4 text-lg font-semibold leading-snug text-white">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
