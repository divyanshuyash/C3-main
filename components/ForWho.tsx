"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const yesItems = [
  {
    short: "Capable But Capped",
    desc: "You know you are good, but your salary is still your ceiling.",
    icon: "↗"
  },
  {
    short: "Hidden Consultant",
    desc: "People already ask for your advice, but you haven't packaged it yet.",
    icon: "★"
  },
  {
    short: "Action > Inspiration",
    desc: "You want freedom and ownership, not another motivational binge.",
    icon: "⚡"
  },
  {
    short: "Ready To Be Seen",
    desc: "You are ready to speak with authority and build in public.",
    icon: "🎤"
  }
];

const noItems = [
  {
    short: "The Magic Button",
    desc: "You want overnight money without doing the uncomfortable work."
  },
  {
    short: "The Free-styler",
    desc: "You hate structure and want to freestyle your way through everything."
  },
  {
    short: "Motivation Junkie",
    desc: "You want motivation only, not direction, implementation, or accountability."
  }
];

export function ForWho() {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section ref={ref} className="section-pad relative overflow-hidden bg-[#050505]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-orange/10 blur-3xl"
      />
      <div className="c3-container relative z-10">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="section-label">Who Is It For</p>
          <h2 className="mt-6 font-display text-[48px] uppercase leading-[0.94] tracking-[0.05em] text-white md:text-[62px]">
            A room for doers, not dabblers.
          </h2>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          {/* YES COLUMN */}
          <AnimatePresence>
            {inView ? (
              <motion.div
                initial={reducedMotion ? false : { x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: "easeOut" }}
                className="gold-ring-card rounded-[32px] bg-card px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:px-8"
              >
                <div className="mb-8">
                  <span className="inline-flex rounded-full border border-orange/35 bg-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                    This is perfectly you
                  </span>
                  <h3 className="mt-5 font-display text-[38px] uppercase leading-[0.95] tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 md:text-[46px]">
                    You are not lazy.
                    <br />
                    You are under-leveraged.
                  </h3>
                </div>

                <div className="grid gap-4">
                  {yesItems.map((item, index) => (
                    <motion.article
                      key={item.short}
                      initial={reducedMotion ? false : { y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: reducedMotion ? 0 : index * 0.08 + 0.15,
                        duration: reducedMotion ? 0 : 0.45
                      }}
                      className="group flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-orange/20 bg-orange/10 text-xl text-orange shadow-[0_0_20px_rgba(197,160,89,0.15)]">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-display text-[18px] uppercase tracking-widest text-white md:text-[20px]">
                          {item.short}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-white/50 md:text-base">
                          {item.desc}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* NO COLUMN */}
          <AnimatePresence>
            {inView ? (
              <motion.div
                initial={reducedMotion ? false : { x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: "easeOut" }}
                className="gold-ring-card rounded-[32px] bg-[#080808] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:px-8"
              >
                <div className="mb-8">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Skip this if...
                  </span>
                  <h3 className="mt-5 font-display text-[34px] uppercase leading-[0.95] tracking-[0.05em] text-white/60 md:text-[40px]">
                    You want fantasy,
                    <br />
                    not a real build.
                  </h3>
                </div>

                <div className="grid gap-4">
                  {noItems.map((item, index) => (
                    <motion.article
                      key={item.short}
                      initial={reducedMotion ? false : { x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: reducedMotion ? 0 : index * 0.08 + 0.15,
                        duration: reducedMotion ? 0 : 0.45
                      }}
                      className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-black/40 p-5"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-white/40">
                        ✕
                      </div>
                      <div>
                        <h4 className="font-display text-[15px] uppercase tracking-widest text-white/70 line-through decoration-white/20 md:text-[17px]">
                          {item.short}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-white/40">
                          {item.desc}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
