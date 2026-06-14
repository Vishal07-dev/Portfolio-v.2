"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springCfg = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(dotX, springCfg);
  const ringY = useSpring(dotY, springCfg);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const expand = () => {
      dotRef.current?.classList.add("cursor-expanded");
      ringRef.current?.classList.add("ring-expanded");
    };
    const shrink = () => {
      dotRef.current?.classList.remove("cursor-expanded");
      ringRef.current?.classList.remove("ring-expanded");
    };

    window.addEventListener("mousemove", move, { passive: true });

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
