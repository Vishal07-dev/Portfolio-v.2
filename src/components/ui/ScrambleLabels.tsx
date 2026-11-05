"use client";

import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Route labels (`[data-scramble]`) decode like terminal output the first
 * time they scroll into view.
 */
export default function ScrambleLabels() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((el) => {
        const text = el.textContent ?? "";
        gsap.to(el, {
          duration: 0.9,
          ease: "none",
          scrambleText: { text, chars: "abcdefghijklmnopqrstuvwxyz/_-{}", speed: 0.6, revealDelay: 0.2 },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    });
  });

  return null;
}
