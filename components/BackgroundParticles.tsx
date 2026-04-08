"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedMotion } from "framer-motion";

export function BackgroundParticles() {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, [reducedMotion]);

  const options = useMemo<ISourceOptions>(
    () => ({
      background: {
        color: {
          value: "transparent"
        }
      },
      detectRetina: true,
      fpsLimit: 120,
      fullScreen: {
        enable: false
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "repulse"
          }
        },
        modes: {
          repulse: {
            distance: 90,
            duration: 0.55
          }
        }
      },
      particles: {
        color: {
          value: "#C5A059"
        },
        links: {
          color: "#C5A059",
          distance: 130,
          enable: true,
          opacity: 0.12,
          width: 1
        },
        move: {
          enable: false
        },
        number: {
          density: {
            enable: true,
            width: 1440,
            height: 2200
          },
          value: 120
        },
        opacity: {
          value: {
            min: 0.22,
            max: 0.46
          }
        },
        size: {
          value: {
            min: 1.6,
            max: 3.6
          }
        }
      }
    }),
    []
  );

  if (!ready) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.85]"
    >
      <Particles id="site-particles" className="h-full w-full" options={options} />
    </div>
  );
}
