"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const yesItems = [
  {
    title: "You know you are good, but your salary is still your ceiling.",
    vibe: "The capable-but-capped feeling"
  },
  {
    title: "People already ask for your advice, but you have not packaged it yet.",
    vibe: "Hidden consultant energy"
  },
  {
    title: "You want freedom, identity, and ownership, not another motivational binge.",
    vibe: "Action over inspiration"
  },
  {
    title: "You are ready to show your face, speak with authority, and build in public.",
    vibe: "Ready to be seen"
  }
];

const noItems = [
  {
    title: "You want overnight money without doing the uncomfortable work.",
    note: "This is a build-it room, not a magic room."
  },
  {
    title: "You hate structure and want to freestyle your way through everything.",
    note: "The system is the shortcut here."
  },
  {
    title: "You want motivation only, not direction, implementation, or accountability.",
    note: "This bootcamp is practical on purpose."
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
      <div className="c3-container">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="section-label">Who Is It For</p>
          <h2 className="mt-6 font-display text-[48px] uppercase leading-[0.94] tracking-[0.05em] text-white md:text-[62px]">
            A room for doers, not dabblers.
          </h2>
          <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
            If your brain keeps saying “I know I am meant for more than this,” this
            section should feel uncomfortably accurate in the best way.
          </p>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimatePresence>
            {inView ? (
              <motion.div
                initial={reducedMotion ? false : { x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: "easeOut" }}
                className="gold-ring-card rounded-[32px] bg-card px-6 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:px-7"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="inline-flex rounded-full border border-orange/35 bg-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
                      This is so you
                    </span>
                    <h3 className="mt-4 font-display text-[34px] uppercase tracking-[0.05em] text-white md:text-[40px]">
                      You are not lazy.
                      <br />
                      You are under-leveraged.
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black px-4 py-3 text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
                      Typical thought
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/86">
                      “I know I can help people. I just have not built the vehicle yet.”
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {yesItems.map((item, index) => (
                    <motion.article
                      key={item.title}
                      initial={reducedMotion ? false : { y: 24, opacity: 0, rotate: -1.4 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{
                        delay: reducedMotion ? 0 : index * 0.08 + 0.15,
                        duration: reducedMotion ? 0 : 0.45
                      }}
                      whileHover={
                        reducedMotion
                          ? undefined
                          : { y: -4, rotate: index % 2 === 0 ? -1 : 1 }
                      }
                      className="rounded-[26px] border border-white/8 bg-gradient-to-br from-black via-card to-black p-5 shadow-[0_18px_50px_rgba(0,0,0,0.32)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange text-lg text-black">
                          {index === 0 ? "↗" : index === 1 ? "★" : index === 2 ? "⚡" : "🎤"}
                        </span>
                        <span className="rounded-full border border-orange/20 bg-orange/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange">
                          {item.vibe}
                        </span>
                      </div>
                      <p className="mt-5 text-base font-medium leading-relaxed text-white">
                        {item.title}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {inView ? (
              <motion.div
                initial={reducedMotion ? false : { x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: "easeOut" }}
                className="gold-ring-card rounded-[32px] bg-card px-6 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:px-7"
              >
                <div className="rounded-[28px] border border-white/8 bg-black p-5">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
                    Please skip this if...
                  </span>
                  <h3 className="mt-4 font-display text-[34px] uppercase tracking-[0.05em] text-white md:text-[40px]">
                    You want fantasy,
                    <br />
                    not a real build.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    This bootcamp works best for people willing to follow a method,
                    execute fast, and let go of the “one day” version of themselves.
                  </p>
                </div>

                <div className="mt-6 grid gap-4">
                  {noItems.map((item, index) => (
                    <motion.article
                      key={item.title}
                      initial={reducedMotion ? false : { x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: reducedMotion ? 0 : index * 0.08 + 0.15,
                        duration: reducedMotion ? 0 : 0.45
                      }}
                      className="rounded-[24px] border border-dashed border-white/12 bg-black/80 p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 text-sm text-white/65">
                          ✕
                        </span>
                        <div>
                          <p className="text-base font-medium leading-relaxed text-white">
                            {item.title}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-orange/18 bg-orange/[0.08] px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
                    Translation
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/84">
                    If you are coachable, hungry, and ready to act, you will feel at home here.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
