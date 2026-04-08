"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const dayCards = [
  {
    number: "01",
    badge: "Strategy",
    title: "CLARITY CREATES CROREPATIS",
    items: [
      "Inner Game and Vision - Chanakya principles revival",
      "Expansive Vision - Think bigger problems, bigger income",
      "Consulting Ecosystem - Multiple client channels",
      "Finding Your Niche - Most profitable, aligned, and scalable",
      "Business Plan Template - Ready consulting blueprint",
      "Design Plan Template - Structure offers and packages"
    ]
  },
  {
    number: "02",
    badge: "Skills",
    title: "EXECUTION CREATES INCOME",
    items: [
      "Top 10 Wealth Skills - Communication, Authority, Content, Acquisition",
      "Video Creation Tactics - Visibility equals opportunity",
      "Live Action Assignment - Create your first video and post publicly",
      "Authority Building - Social proof from Day 1"
    ]
  },
  {
    number: "03",
    badge: "Systems",
    title: "SYSTEMS CREATE SCALE",
    items: [
      "AI Systems in 10 Minutes - Automate, scale content, create faster",
      "12 Sales Funnels - Multiple income streams, sell without pressure",
      "Ripple Effect Vision - Build impact, influence, and a movement",
      "Revenue Scaling - From linear to exponential income"
    ]
  }
] as const;

export function Days() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      const cards = sectionRef.current?.querySelectorAll("[data-day-card]");

      if (cards) {
        gsap.from(cards, {
          x: 80,
          opacity: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%"
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section id="days" ref={sectionRef} className="section-pad bg-bg">
      <div className="c3-container">
        <div className="max-w-[760px]">
          <p className="section-label">The 3-Day Breakdown</p>
          <h2 className="mt-6 font-display text-[48px] uppercase leading-[0.92] tracking-[0.05em] text-white md:text-[64px]">
            Walk through the consulting blueprint day by day.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {dayCards.map((day) => (
            <DayCard key={day.number} day={day} />
          ))}
        </div>
      </div>
    </section>
  );
}

type DayCardProps = {
  day: (typeof dayCards)[number];
};

function DayCard({ day }: DayCardProps) {
  return (
    <article
      data-day-card
      className="relative overflow-hidden rounded-[30px] border border-white/8 bg-bg p-8 shadow-[0_24px_70px_rgba(0,0,0,0.3)] lg:min-h-[620px]"
    >
      <span className="pointer-events-none absolute right-6 top-3 font-display text-[120px] uppercase leading-none text-orange/10">
        {day.number}
      </span>
      <div className="relative z-10 flex h-full flex-col">
        <span className="section-label">{day.badge}</span>
        <h3 className="mt-6 max-w-[12ch] font-display text-[40px] uppercase leading-[0.95] tracking-[0.05em] text-white">
          {day.title}
        </h3>
        <div className="mt-8 grid gap-4">
          {day.items.map((item) => (
            <div key={item} className="flex gap-3">
              <span className="mt-1 text-lg font-bold text-orange">→</span>
              <p className="text-sm leading-relaxed text-muted md:text-[15px]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
