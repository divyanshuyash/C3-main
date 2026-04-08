"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "framer-motion";
import { registerHref } from "@/lib/register-link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const checklist = [
  "3-Day Live Bootcamp (May 1, 2, 3 · 10 AM-2 PM)",
  "Mind Marvels Lifetime Membership (₹10,000 value)",
  "1:1 Strategy Session with Shobhit",
  "Full Bootcamp Recordings",
  "Exclusive Bonus Sessions",
  "Community and Accountability Support"
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !cardRef.current) {
        return;
      }

      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.95,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%"
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="register"
      ref={sectionRef}
      className="section-pad"
      style={{
        background:
          "radial-gradient(circle at top, rgba(197, 160, 89, 0.22) 0%, rgba(0, 0, 0, 1) 68%)"
      }}
    >
      <div className="c3-container">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="section-label">Pricing</p>
          <h2 className="mt-6 font-display text-[52px] uppercase leading-[0.92] tracking-[0.05em] text-white md:text-[70px]">
            The smartest ₹999 you can spend on your next identity shift.
          </h2>
        </div>

        <div ref={cardRef} className="pricing-shell mx-auto mt-12 max-w-[620px] rounded-[34px] p-[1px]">
          <div className="relative z-10 rounded-[34px] p-7 md:p-10">
            <div className="shimmer-ribbon inline-flex rounded-full border border-orange/30 bg-orange/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange">
              Limited seats - offer ends soon
            </div>

            <div className="mt-8">
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reducedMotion ? 0 : 0.45 }}
                className="text-2xl font-medium text-white/40 line-through"
              >
                ₹50,999
              </motion.p>
              <motion.p
                initial={reducedMotion ? false : { scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: reducedMotion ? 0 : 0.3,
                  duration: reducedMotion ? 0 : 0.55,
                  type: "spring",
                  stiffness: 160,
                  damping: 15
                }}
                className="font-display text-[88px] uppercase leading-none tracking-[0.05em] text-orange md:text-[100px]"
              >
                ₹999
              </motion.p>
            </div>

            <motion.ul
              initial={reducedMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reducedMotion ? 0 : 0.08
                  }
                }
              }}
              className="mt-8 grid gap-4"
            >
              {checklist.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 }
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.45 }}
                  className="flex gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3"
                >
                  <span className="mt-0.5 text-orange">✓</span>
                  <span className="text-sm leading-relaxed text-white/86">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href={registerHref}
              className="pricing-cta mt-8 inline-flex h-16 w-full items-center justify-center rounded-full bg-orange px-6 text-center font-display text-[30px] uppercase tracking-[0.07em] text-black"
              whileHover={reducedMotion ? undefined : { scale: 1.03, filter: "brightness(1.1)" }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              Register Now →
            </motion.a>

            <p className="mt-5 text-center text-sm font-medium text-white/68">
              Secure payment · Instant confirmation · Limited seats
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
