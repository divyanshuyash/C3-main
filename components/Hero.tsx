"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RegisterButton } from "@/components/RegisterButton";

gsap.registerPlugin(useGSAP);

/* ── stat counters ── */
const stats = [
  { value: "100,000+", label: "Professionals Trained" },
  { value: "₹1Cr+", label: "Worth Businesses Created" },
  { value: "10+ Yrs", label: "Experience" },
  { value: "1000+", label: "Consultants Created" },
];

/* ── animated counter component ── */
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : 1.6 + delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <div className="relative z-10 text-center">
        <p className="font-display text-[28px] uppercase leading-none tracking-[0.04em] text-orange md:text-[36px] lg:text-[42px]">
          {value}
        </p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 md:text-[11px]">
          {label}
        </p>
      </div>
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-orange/0 transition-all duration-500 group-hover:bg-orange/5" />
    </motion.div>
  );
}

/* ── magnetic cursor ring ── */
function MagneticRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="pointer-events-none absolute z-30 hidden md:block"
      style={{
        left: pos.x - 120,
        top: pos.y - 120,
        width: 240,
        height: 240,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease, left 0.15s ease-out, top 0.15s ease-out",
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.03) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ── main hero ── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* GSAP text reveal */
  useGSAP(
    () => {
      if (reducedMotion) return;

      const words = headlineRef.current?.querySelectorAll("[data-word]");
      if (!words) return;

      gsap.set(words, { y: 80, clipPath: "inset(0 0 100% 0)", rotateX: -45 });
      gsap.to(words, {
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        rotateX: 0,
        stagger: 0.06,
        duration: 1.1,
        delay: 0.4,
        ease: "power4.out",
      });

      // Animate the gradient line as a single block (translate only — no opacity/clipPath to avoid bg-clip conflict)
      const gradientLine = headlineRef.current?.querySelector("[data-gradient-line]");
      if (gradientLine) {
        gsap.set(gradientLine, { y: "100%", scale: 0.9 });
        gsap.to(gradientLine, {
          y: "0%",
          scale: 1,
          duration: 1.2,
          delay: 0.9,
          ease: "power4.out",
        });
      }
    },
    { scope: sectionRef }
  );

  /* split words helper */
  const splitWords = (text: string, startIndex: number) =>
    text.split(" ").map((word, i) => (
      <span
        key={`${word}-${startIndex + i}`}
        data-word
        className="inline-block"
        style={{ perspective: "600px" }}
      >
        {word}
        {i < text.split(" ").length - 1 && "\u00A0"}
      </span>
    ));

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] overflow-hidden bg-transparent"
    >
      {/* ── ambient layers ── */}
      <MagneticRing />

      {/* giant radial orb */}
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity }}
        className="pointer-events-none absolute left-1/2 top-[15%] z-0 -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="h-[600px] w-[600px] rounded-full md:h-[900px] md:w-[900px]"
          style={{
            background:
              "radial-gradient(circle, rgba(197,160,89,0.14) 0%, rgba(197,160,89,0.06) 30%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* animated grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,89,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* spinning conic border accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="h-[500px] w-[500px] rounded-full opacity-[0.04] md:h-[800px] md:w-[800px]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(197,160,89,0.4), transparent, rgba(224,194,122,0.3), transparent)",
          }}
        />
      </div>

      {/* ── content ── */}
      <motion.div
        style={{ y: parallaxY, opacity: parallaxOpacity }}
        className="c3-container relative z-20 flex min-h-[100dvh] flex-col justify-center pb-8 pt-24 md:pb-12 md:pt-28"
      >
        {/* ── split layout: text left + portrait right ── */}
        <div className="relative mx-auto w-full max-w-[1220px]">
          <div className="grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-16">
            {/* ── LEFT: text content ── */}
            <div className="order-2 text-center md:order-1 md:text-left">
              {/* event badge */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-orange/20 bg-orange/8 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-orange md:text-[13px]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                  </span>
                  3-Day Live Bootcamp · 5-6-7 June, 2026
                </span>
              </motion.div>

              {/* headline */}
              <div ref={headlineRef} className="mt-6 md:mt-8" style={{ perspective: "800px" }}>
                <h1 className="font-display uppercase leading-[0.88] tracking-[0.04em] text-white">
                  <span className="block overflow-hidden text-[34px] md:text-[54px] lg:text-[70px]">
                    {splitWords("FROM CORPORATE", 0)}
                  </span>
                  <span className="mt-1 block overflow-hidden text-[34px] md:mt-1 md:text-[54px] lg:text-[70px]">
                    {splitWords("DEPENDENCY TO", 10)}
                  </span>
                  <span className="mt-1 block overflow-hidden md:mt-1">
                    <span
                      data-gradient-line
                      className="inline-block text-[38px] md:text-[62px] lg:text-[78px]"
                      style={{
                        background: "linear-gradient(90deg, #ffffff 0%, #e0c27a 35%, #c5a059 60%, #e0c27a 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        animation: "gradientShift 4s linear infinite",
                      }}
                    >
                      ₹1 CRORE+ FREEDOM
                    </span>
                  </span>
                </h1>
              </div>

              {/* subline */}
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-5 max-w-[46ch] text-sm leading-relaxed text-white/55 md:mx-0 md:mt-6 md:text-base"
              >
                Learn the exact consulting framework that 1000+ professionals have used
                to build independent consulting businesses worth <span className="font-semibold text-white/80">₹1 Crore+</span> — in just 3 days.
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:mt-8 md:justify-start"
              >
                <RegisterButton
                  className="w-full max-w-[320px] rounded-full px-7 py-3.5 text-lg shadow-[0_0_40px_rgba(197,160,89,0.2)] sm:w-auto md:text-xl"
                  label="Register Now"
                  pulse
                />
                <motion.a
                  href="#days"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white md:text-xs"
                  whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                >
                  Explore Curriculum
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-60">
                    <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              </motion.div>

              {/* price anchor */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 1.8 }}
                className="mt-4 flex items-center justify-center gap-3 text-[11px] font-medium text-white/40 md:justify-start md:text-[12px]"
              >
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
                <span>⚡ ₹50,000+ in bonuses included · Limited seats</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
              </motion.div>
            </div>

            {/* ── RIGHT: portrait ── */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, x: 60, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 1,
                delay: reducedMotion ? 0 : 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative order-1 flex items-end justify-center md:order-2"
            >
              {/* glow orb behind portrait */}
              <div
                className="pointer-events-none absolute bottom-[10%] left-1/2 -translate-x-1/2"
                aria-hidden="true"
              >
                <motion.div
                  animate={reducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-[340px] w-[340px] rounded-full md:h-[480px] md:w-[480px]"
                  style={{
                    background: "radial-gradient(circle, rgba(197,160,89,0.18) 0%, rgba(197,160,89,0.06) 50%, transparent 70%)",
                  }}
                />
              </div>

              {/* gold ring accent */}
              <div className="pointer-events-none absolute bottom-[5%] left-1/2 -translate-x-1/2" aria-hidden="true">
                <motion.div
                  animate={reducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="h-[280px] w-[280px] rounded-full border border-orange/10 md:h-[400px] md:w-[400px]"
                  style={{
                    borderImage: "conic-gradient(from 0deg, rgba(197,160,89,0.3), transparent 25%, rgba(197,160,89,0.15), transparent 75%, rgba(197,160,89,0.3)) 1",
                  }}
                />
              </div>

              {/* floating portrait image */}
              <motion.div
                animate={reducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 -mb-[12%] md:-mb-[15%]"
              >
                <div
                  className="relative overflow-hidden w-[300px] h-[280px] sm:w-[360px] sm:h-[340px] md:w-[440px] md:h-[400px] lg:w-[500px] lg:h-[440px]"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%, transparent 100%)",
                  }}
                >
                  <img
                    src="/hero-portrait-new.png"
                    alt="Shobhit Singhal — The Transformer"
                    className="h-full w-full object-cover object-[center_10%]"
                    style={{
                      filter: "drop-shadow(0 20px 60px rgba(197,160,89,0.15)) drop-shadow(0 0 40px rgba(197,160,89,0.1))",
                    }}
                  />
                </div>
              </motion.div>



              {/* floating credential chips */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[25%] left-[2%] z-20 md:bottom-[22%] md:left-[2%]"
              >
                <motion.div
                  animate={reducedMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                >
                  <div className="rounded-xl border border-orange/20 bg-card/80 px-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl md:bg-card/90 md:px-4 md:py-3">
                    <p className="font-display text-[16px] leading-none tracking-[0.04em] text-orange md:text-[22px]">
                      <span className="uppercase">2<span className="text-[0.65em] lowercase">x</span> TED</span>
                    </p>
                    <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/50 md:text-[10px]">Circle Leader</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[12%] right-[2%] z-20 md:top-[8%] md:right-[-2%]"
              >
                <motion.div
                  animate={reducedMotion ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="rounded-xl border border-orange/20 bg-card/80 px-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl md:bg-card/90 md:px-4 md:py-3">
                    <p className="font-display text-[16px] uppercase leading-none tracking-[0.04em] text-orange md:text-[22px]">business consultant</p>
                    <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/50 md:text-[10px]">of the Year 2023</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── stats bar ── */}
        <div className="mx-auto mt-10 w-full max-w-[900px] md:mt-14">
          <div className="mx-auto mb-8 h-px w-2/3 bg-gradient-to-r from-transparent via-orange/25 to-transparent" />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 2.5, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-2 md:mt-12"
        >
          <motion.div
            animate={reducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5"
          >
            <motion.div
              animate={reducedMotion ? {} : { opacity: [0.3, 1, 0.3], height: ["4px", "10px", "4px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[3px] rounded-full bg-orange"
            />
          </motion.div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
