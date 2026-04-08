"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import CountUp from "react-countup";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const credentials = [
  "8+ Years Experience",
  "Digital Coach of the Year 2021",
  "2 TEDx Circle Leader",
];

const caseStudies = [
  {
    name: "Veena BK",
    result: "₹3.5L in first month",
    description: "Turned clarity into immediate premium consulting momentum."
  },
  {
    name: "Maruthish",
    result: "5 clients at ₹75,000 each",
    description: "Built authority and converted expertise into high-ticket demand."
  },
  {
    name: "Jharna Jagtiyani",
    result: "Multiple consulting opportunities",
    description: "Created a pipeline of aligned opportunities instead of waiting."
  }
];

const mentorName = "SHOBHIT SINGHAL";

export function Mentor() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageShellRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<HTMLSpanElement[]>([]);
  const reducedMotion = useReducedMotion();
  const { ref: counterRef, inView: countersVisible } = useInView({
    triggerOnce: true,
    threshold: 0.35
  });

  useGSAP(
    () => {
      if (reducedMotion) {
        return;
      }

      if (imageShellRef.current) {
        gsap.fromTo(
          imageShellRef.current,
          {
            scale: 0.9,
            clipPath: "inset(100% 0% 0% 0%)"
          },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageShellRef.current,
              start: "top 75%"
            }
          }
        );
      }

      gsap.from(headingRefs.current, {
        opacity: 0,
        y: 32,
        stagger: 0.03,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%"
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="mentor" ref={sectionRef} className="section-pad bg-bg">
      <div className="c3-container">
        <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="relative lg:flex lg:justify-start">
            <div
              ref={imageShellRef}
              className="relative mx-auto h-[420px] w-full max-w-[320px] overflow-hidden rounded-[28px] border border-orange/25 shadow-[0_0_80px_rgba(197,160,89,0.18),0_0_160px_rgba(197,160,89,0.06)] lg:mx-0 lg:h-[460px] lg:max-w-[340px] xl:max-w-[360px] image-card"
            >
              <Image
                src="/c3/photos/IMG_7058.jpg"
                alt="Shobhit Singhal portrait illustration"
                fill
                sizes="(max-width: 1024px) 320px, 360px"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div>
            <p className="section-label">Meet Your Mentor</p>
            <h2 className="mt-6 flex flex-wrap gap-x-1 font-display text-[54px] uppercase leading-[0.92] tracking-[0.05em] text-white md:text-[72px]">
              {mentorName.split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  ref={(node) => {
                    if (node) {
                      headingRefs.current[index] = node;
                    }
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted md:text-lg">
              Shobhit helps professionals build authority, offers, and scalable systems so
              expertise becomes income instead of remaining trapped inside a job title.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {credentials.map((credential, index) => (
                  <motion.div
                    key={credential}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.45,
                      delay: reducedMotion ? 0 : index * 0.06
                    }}
                    className="rounded-full border border-orange/35 bg-card/75 px-4 py-2 text-[13px] font-semibold tracking-[0.14em] text-white"
                  >
                    {typeof credential === "string" && credential.includes("TEDx") ? (
                      <>
                        <span className="uppercase">
                          {credential.split("TEDx")[0]}
                          TED
                        </span>
                        x
                        <span className="uppercase">{credential.split("TEDx")[1]}</span>
                      </>
                    ) : (
                      <span className="uppercase">{credential}</span>
                    )}
                  </motion.div>
                ))}
            </div>

            <div ref={counterRef} className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard
                active={countersVisible}
                label="Student Revenue"
                prefix="₹"
                value={1}
                suffix="Crore+"
              />
              <StatCard
                active={countersVisible}
                label="Professionals Trained"
                value={100000}
                suffix="+"
                separator=","
              />
              <StatCard
                active={countersVisible}
                label="Consultants"
                value={1000}
                suffix="+"
                separator=","
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <TiltCaseStudyCard key={study.name} {...study} />
          ))}
        </div>
      </div>
    </section>
  );
}

type StatCardProps = {
  active: boolean;
  label: string;
  prefix?: string;
  separator?: string;
  suffix?: string;
  value: number;
};

function StatCard({
  active,
  label,
  prefix,
  separator,
  suffix,
  value
}: StatCardProps) {
  const compactNumber = value >= 100000;

  return (
    <div className="rounded-[24px] border border-white/6 bg-card/70 p-5">
      <p
        className={cn(
          "font-display uppercase leading-none tracking-[0.05em] text-orange",
          compactNumber ? "text-[40px] md:text-[48px]" : "text-[48px] md:text-[56px]"
        )}
      >
        {active ? (
          <>
            <CountUp
              end={value}
              duration={2.2}
              prefix={prefix}
              separator={separator}
            />
            {suffix ? (
              <span className={cn("ml-1 align-top", compactNumber && "text-[0.7em]")}>
                {suffix}
              </span>
            ) : null}
          </>
        ) : (
          <>
            {prefix ?? ""}
            0
            {suffix ? (
              <span className={cn("ml-1 align-top", compactNumber && "text-[0.7em]")}>
                {suffix}
              </span>
            ) : null}
          </>
        )}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">{label}</p>
    </div>
  );
}

type TiltCaseStudyCardProps = {
  description: string;
  name: string;
  result: string;
};

function TiltCaseStudyCard({
  description,
  name,
  result
}: TiltCaseStudyCardProps) {
  const reducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <div className="[perspective:1200px]">
      <motion.article
        className="panel-card h-full p-6"
        onMouseMove={(event) => {
          if (reducedMotion) {
            return;
          }

          const bounds = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top;
          const rotateY = ((x / bounds.width) - 0.5) * 10;
          const rotateX = ((y / bounds.height) - 0.5) * -10;

          setTilt({ rotateX, rotateY });
        }}
        onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
        animate={reducedMotion ? undefined : tilt}
        whileHover={reducedMotion ? undefined : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="inline-flex rounded-full border border-orange/35 bg-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
          Reviews
        </div>
        <h3 className="mt-5 font-display text-[34px] uppercase tracking-[0.05em] text-white">
          {name}
        </h3>
        <p className="mt-2 text-lg font-semibold text-orange">{result}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
      </motion.article>
    </div>
  );
}
