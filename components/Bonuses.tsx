"use client";

import { motion, useReducedMotion } from "framer-motion";

const bonuses = [
  {
    title: "MIND MARVELS MEMBERSHIP",
    value: "₹10,000 - Lifetime",
    badge: "Lifetime Access",
    items: [
      "Weekly AI Consulting Energizer Sessions (AICE Calls)",
      "Lifetime LMS: 30-Day AI Challenge, Book Learning, Consulting Modules"
    ]
  },
  {
    title: "1:1 PERSONAL STRATEGY SESSION WITH SHOBHIT",
    items: [
      "Identify your exact consulting direction",
      "Refine niche and positioning",
      "Map next steps clearly",
      "Remove your specific blocks"
    ],
    quote: "No confusion. No guessing. Clarity tailored to YOU."
  },
  {
    title: "FULL RECORDINGS + EXCLUSIVE EXTRA SESSIONS",
    items: [
      "Complete 2-day recordings - rewatch anytime",
      "Exclusive bonus sessions not available live",
      "Deep-dive trainings, advanced insights, and extra frameworks"
    ]
  }
];

export function Bonuses() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-pad bg-navy/35">
      <div className="c3-container">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="section-label">Bonuses</p>
          <h2 className="mt-6 font-display uppercase tracking-[0.05em]">
            <span className="block text-[34px] leading-tight text-white md:text-[46px]">
              ENROLL FOR ₹999
            </span>
            <span className="mt-1 block text-[42px] leading-[0.94] gradient-text md:mt-2 md:text-[64px]">
              GET ₹50,000+ IN BONUSES
            </span>
          </h2>
        </div>

        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.12
              }
            }
          }}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {bonuses.map((bonus) => (
            <motion.article
              key={bonus.title}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              className="bonus-shell rounded-[28px] p-6"
            >
              <div className="relative z-10 h-full rounded-[24px] bg-transparent">
                {bonus.badge ? (
                  <div className="inline-flex rounded-full border border-gold/45 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                    {bonus.badge}
                  </div>
                ) : null}
                {bonus.value ? (
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-orange">
                    {bonus.value}
                  </p>
                ) : null}
                <h3 className="mt-4 font-display text-[34px] uppercase leading-[0.96] tracking-[0.05em] text-white">
                  {bonus.title}
                </h3>
                <div className="mt-6 grid gap-3">
                  {bonus.items.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-1 text-orange">✦</span>
                      <p className="text-sm leading-relaxed text-muted">{item}</p>
                    </div>
                  ))}
                </div>
                {bonus.quote ? (
                  <p className="mt-6 rounded-2xl border border-orange/20 bg-orange/[0.08] p-4 text-sm italic leading-relaxed text-white/84">
                    “{bonus.quote}”
                  </p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
          <div className="relative inline-flex items-center gap-4 text-xl text-muted md:text-2xl">
            <span className="relative inline-block">
              TOTAL VALUE: ₹50,000+
              <motion.span
                initial={reducedMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeOut" }}
                className="absolute left-0 top-1/2 h-0.5 w-full origin-left bg-orange"
              />
            </span>
            <span>→</span>
            <span className="font-display text-[44px] uppercase tracking-[0.05em] text-orange md:text-[60px]">
              Your Price: ₹999 Only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
