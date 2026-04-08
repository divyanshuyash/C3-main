"use client";

import { motion, useReducedMotion } from "framer-motion";
import { registerHref } from "@/lib/register-link";
import { cn } from "@/lib/utils";

type RegisterButtonProps = {
  className?: string;
  href?: string;
  label?: string;
  variant?: "solid" | "outline" | "ghost";
  pulse?: boolean;
};

export function RegisterButton({
  className,
  href = "#register",
  label = "Register Now",
  variant = "solid",
  pulse = false
}: RegisterButtonProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-3 text-center font-display text-xl uppercase tracking-[0.08em] transition-colors duration-300",
        variant === "solid" &&
          "border-orange bg-orange text-black shadow-[0_0_32px_rgba(197,160,89,0.28)]",
        variant === "outline" &&
          "border-orange/75 bg-transparent text-orange hover:bg-orange hover:text-black",
        variant === "ghost" &&
          "border-white/15 bg-white/5 text-white hover:bg-white/10",
        pulse && "pulse-glow",
        className
      )}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.04
            }
      }
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {label}
    </motion.a>
  );
}
