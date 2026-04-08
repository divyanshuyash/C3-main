"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    label: "eLearning market 2025",
    prefix: "$",
    suffix: " Billion",
    value: 325
  },
  {
    label: "Projected by 2034",
    prefix: "$",
    suffix: " Trillion",
    value: 1
  },
  {
    label: "Potential learners",
    suffix: "M+",
    value: 100
  }
];

export function Industry() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section ref={ref} className="section-pad bg-bg">
      <div className="c3-container">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="section-label">Industry Momentum</p>
          <h2 className="mt-6 font-display text-[46px] uppercase leading-[0.94] tracking-[0.05em] text-white md:text-[60px]">
            The market is already moving. This bootcamp helps you move with it.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[28px] border border-orange/10 bg-card/90 p-7 text-center shadow-[0_18px_54px_rgba(0,0,0,0.26)]"
            >
              <p className="font-display text-[54px] uppercase leading-none tracking-[0.05em] text-orange md:text-[64px]">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.1}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    separator=","
                  />
                ) : (
                  `${stat.prefix ?? ""}0${stat.suffix ?? ""}`
                )}
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-muted">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
