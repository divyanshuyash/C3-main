"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll
} from "framer-motion";
import { RegisterButton } from "@/components/RegisterButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#pain", label: "Why Now" },
  { href: "#days", label: "What You Learn" },
  { href: "#mentor", label: "Mentor" },
  { href: "#register", label: "Register" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <motion.header
      initial={reducedMotion ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              delay: 0.5,
              duration: 0.7,
              type: "spring",
              stiffness: 120,
              damping: 18
            }
      }
      className="fixed inset-x-0 top-0 z-50 px-4 py-4"
    >
      <motion.nav
        animate={{
          backgroundColor: isScrolled ? "rgba(10, 14, 20, 0.9)" : "rgba(10, 14, 20, 0)",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
          boxShadow: isScrolled
            ? "0 20px 60px rgba(0, 0, 0, 0.35)"
            : "0 0 0 rgba(0, 0, 0, 0)"
        }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
        className={cn(
          "mx-auto flex w-full max-w-[1220px] items-center justify-between rounded-full border px-5 py-3 md:px-7",
          isScrolled && "backdrop-blur-xl"
        )}
      >
        <a
          href="#top"
          className="flex items-center"
        >
          <img src="/logo.png" alt="Shobhit Singhal" className="h-[32px] w-auto md:h-[40px] opacity-90" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/72 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <RegisterButton variant="outline" label="Register Now" />
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/20 bg-white/5 text-white md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-0.5 w-5 rounded-full bg-white transition-transform duration-300",
                isOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-5 rounded-full bg-white transition-opacity duration-300",
                isOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-5 rounded-full bg-white transition-transform duration-300",
                isOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
            className="mx-auto mt-3 max-w-[1220px] overflow-hidden rounded-[28px] border border-white/10 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-white/78"
                >
                  {link.label}
                </a>
              ))}
              <RegisterButton
                className="mt-2 w-full"
                label="Register Now"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
