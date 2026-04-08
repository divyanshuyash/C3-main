"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const images = [
  "/c3/photos/live-sessions/session-1.jpg",
  "/c3/photos/live-sessions/session-2.jpg",
  "/c3/photos/live-sessions/session-3.jpg",
  "/c3/photos/live-sessions/session-4.jpg",
  "/c3/photos/live-sessions/session-5.jpg",
  "/c3/photos/live-sessions/session-6.jpg",
];

export function LiveSessionGallery() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section 
      className="w-full bg-[#0d0d0d] py-[40px] px-5 sm:px-10 md:py-[80px] font-sans" 
      style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="flex flex-col gap-3">
            <span className="self-start uppercase tracking-[3px] text-[10px] md:text-xs font-bold text-[#b8953a] border border-[#b8953a] px-3 py-1 rounded-[20px]">
              LIVE SESSIONS
            </span>
            <h2 className="text-white font-bold text-[22px] sm:text-[34px] md:text-[40px] leading-tight">
              Real People. Real Transformation.
            </h2>
            <p className="text-[#a0a0a0] text-sm md:text-base">
              Providing <span className="text-[#b8953a]">clarity they can act on</span> immediately.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "w-[10px] h-[10px] rounded-full transition-all duration-300",
                  hoveredIdx === idx ? "bg-[#b8953a] scale-[1.2]" : "bg-[#2a2a2a]"
                )}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-[10px]">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative w-full h-[140px] sm:h-[200px] rounded-[14px] overflow-hidden border border-[#242424] transition-all duration-300 transform sm:hover:scale-[1.02] sm:hover:border-[#b8953a] active:border-[#b8953a]"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onTouchStart={() => setHoveredIdx(idx)}
            >
              <div className={cn(
                "absolute inset-0 z-10 pointer-events-none transition-all duration-300",
                hoveredIdx === idx ? "border-[2px] border-[rgba(184,149,58,0.35)] rounded-[14px]" : "border-none"
              )}></div>
              <Image
                src={src}
                alt={`Live session ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-0 text-center">
          {[
            { value: "50+", label: "SESSIONS" },
            { value: "100K+", label: "TRAINED" },
            { value: "4.9★", label: "RATING" },
            { value: "98%", label: "RECOMMEND" },
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex flex-col items-center justify-center",
                idx !== 0 && idx !== 2 ? "sm:border-l border-[#1a1a1a]" : "sm:border-none",
                idx === 1 || idx === 3 ? "border-l border-[#1a1a1a]" : "border-none"
              )}
            >
              <span className="text-[#b8953a] font-bold text-2xl md:text-[32px] mb-2">{stat.value}</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#7a7a7a]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
