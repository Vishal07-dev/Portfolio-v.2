"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ApiConsole from "@/components/ui/ApiConsole";
import { gsap, useGSAP, SplitText, MOTION_OK, scrollToId } from "@/lib/gsap";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const split = SplitText.create(q("[data-title]"), { type: "lines", mask: "lines" });
        gsap.set(q("[data-title]"), { autoAlpha: 1 });

        const tl = gsap.timeline({ delay: 0.1 });
        tl.from(split.lines, { yPercent: 105, duration: 0.8, stagger: 0.08 })
          .fromTo(
            q("[data-hero-item]"),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, stagger: 0.06 },
            0.25
          )
          .fromTo(
            q("[data-console]"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.35
          );

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current!.querySelectorAll("[data-hero]"), { autoAlpha: 1 });
      });
    },
    { scope: root }
  );

  return (
    <section id="hero" ref={root} className="relative pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="page-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <p
            data-hero
            data-hero-item
            className="mb-6 flex items-center gap-2 font-mono text-meta text-ink-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            Open to opportunities
          </p>

          <h1
            data-hero
            data-title
            className="text-[44px] font-medium leading-[1] tracking-[-0.04em] text-ink sm:text-[56px] lg:text-[64px]"
          >
            Vishal Rohera builds enterprise web apps with{" "}
            <span className="text-accent">Angular</span> and{" "}
            <span className="text-accent">Node.js</span>
          </h1>

          <p
            data-hero
            data-hero-item
            className="mt-6 max-w-[34rem] text-lg leading-[1.6] text-ink-secondary"
          >
            MEAN stack developer at BrainerHub Solutions in Ahmedabad. Most of my work is APIs and
            the dashboards that read them, so this site is one too. Send it a request.
          </p>

          <div data-hero data-hero-item className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => scrollToId("projects")} className="btn-primary">
              View projects
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <button onClick={() => scrollToId("contact")} className="btn-secondary">
              Contact
            </button>
          </div>
        </div>

        <div data-hero data-console>
          <ApiConsole />
        </div>
      </div>
    </section>
  );
}
