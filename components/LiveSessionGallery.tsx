"use client";

import { useState, useEffect, useRef } from "react";
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

  // Custom YouTube API states
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // 1. Initialize the official YouTube IFrame JS API
  useEffect(() => {
    // Inject script if not present
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // Poll until `window.YT` is loaded, then bind it to our existing iframe
    let initAttempts = 0;
    const initPlayer = () => {
      initAttempts++;
      const YT = (window as any).YT;
      if (YT && YT.Player) {
        playerRef.current = new YT.Player("yt-player", {
          events: {
            onReady: () => setIsReady(true),
            onStateChange: (event: any) => {
              if (event.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
              }
            }
          }
        });
      } else if (initAttempts < 50) {
        setTimeout(initPlayer, 100);
      }
    };

    initPlayer();

    // Cleanup player silently to avoid memory leaks
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        // Safe unmount
      }
    };
  }, []);

  // 2. High-Frequency polling to smoothly animate our custom timeline
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isReady && playerRef.current) {
      interval = setInterval(() => {
        try {
          const current = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          if (duration > 0) {
            setProgress((current / duration) * 100);
          }
        } catch (e) {
          // Ignore async unmounting errors
        }
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isReady]);

  // 3. Custom Click-to-Seek logic
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isReady || !playerRef.current) return;
    
    // Calculate where exactly the user clicked structurally via DOM Offset
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    const duration = playerRef.current.getDuration();
    if (duration > 0) {
      // Seek the raw YouTube player
      playerRef.current.seekTo(percentage * duration, true);
      // Optimistically update our visual bar instantly
      setProgress(percentage * 100);
    }
  };

  // 4. Mute Toggle logic properly connected to the API (fallback to raw postMessage just in case)
  const handleMuteToggle = () => {
    if (playerRef.current && isReady) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } else {
      const iframe = document.getElementById("yt-player") as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        if (isMuted) {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
          setIsMuted(false);
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
          setIsMuted(true);
        }
      }
    }
  };

  return (
    <section 
      className="w-full bg-[#0d0d0d] py-[40px] px-5 sm:px-10 md:py-[80px] font-sans" 
      style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        
        {/* --- Header Area --- */}
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

        {/* --- Image Grid --- */}
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

        {/* --- CUSTOM YOUTUBE PLAYER WRAPPER --- */}
        <div 
          className="relative w-full aspect-video overflow-hidden mt-10 mx-auto group"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(201,162,39,0.2)",
            backgroundColor: "#0a0a0a"
          }}
        >
          <iframe
            id="yt-player"
            className="absolute inset-0 w-full h-full pointer-events-none"
            src="https://www.youtube.com/embed/356LHy7dRdo?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=356LHy7dRdo&enablejsapi=1"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Video Embed"
          />

          <button
            onClick={handleMuteToggle}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 hover:bg-black/80 hover:scale-105 transition-all duration-300 pointer-events-auto"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,162,39,0.8)",
              boxShadow: "0 0 20px rgba(201,162,39,0.25)",
              color: "#c9a227",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              padding: "10px 20px",
              borderRadius: "30px"
            }}
          >
            <span>{isMuted ? "🔇" : "🔊"}</span>
            {isMuted ? "TAP TO UNMUTE" : "PLAYING"}
          </button>

          {/* Custom Timeline Progress Controller */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[6px] bg-white/10 z-20 cursor-pointer pointer-events-auto sm:group-hover:h-[10px] sm:hover:h-[12px] transition-all duration-300"
            onClick={handleTimelineClick}
            title="Seek Video"
          >
            <div 
              className="h-full bg-[#c9a227] shadow-[0_0_10px_rgba(201,162,39,0.8)] transition-all ease-linear"
              style={{ 
                width: `${progress}%`,
                transitionDuration: "250ms" // Matches our 250ms interval perfectly to avoid skipping frames
              }}
            />
          </div>
        </div>

        {/* --- Stats Row --- */}
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
