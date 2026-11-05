"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, ScrambleTextPlugin, useGSAP);
  // One easing curve for the whole site.
  CustomEase.create("out", "0.22,1,0.36,1");
  gsap.defaults({ ease: "out", duration: 0.5 });
}

/** Animations only run when the visitor has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type LenisLike = { scrollTo: (target: HTMLElement | number, opts?: { offset?: number }) => void };

/** Scrolls to a section, through Lenis when smooth scrolling is active. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: id === "hero" ? 0 : -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
