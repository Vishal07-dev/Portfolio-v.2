"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Fades and lifts every `[data-reveal]` element inside `scope` once,
 * when it scrolls into view. Elements that enter together share a short
 * stagger. Nothing runs for visitors who prefer reduced motion.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
          if (!items.length) return;
          gsap.from(items, {
            autoAlpha: 0,
            y: 10,
            duration: 0.45,
            stagger: 0.05,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope }
  );
}
