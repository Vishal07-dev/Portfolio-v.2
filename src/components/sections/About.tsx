"use client";

import { useRef } from "react";
import { useReveal } from "@/components/ui/useReveal";
import { gsap, useGSAP, SplitText, MOTION_OK } from "@/lib/gsap";
import { aboutData } from "@/data/portfolio";

const STATS = aboutData.stats.filter((s) => s.label !== "Tech Stacks");

const FACTS = [
  { label: "Education", value: "BCA, Silver Oak University" },
  { label: "Based in", value: "Ahmedabad, Gujarat" },
  { label: "Open to", value: "Hybrid or remote roles" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);

        // Statement rises in line by line, once
        const split = SplitText.create(q("[data-statement]"), { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.07,
          scrollTrigger: { trigger: q("[data-statement]"), start: "top 80%", once: true },
        });

        // Big figures count up once
        q("[data-stat]").forEach((el) => {
          const target = Number((el as HTMLElement).dataset.stat);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.2,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });

        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="section-y border-t border-line">
      <div className="page-x">
        <p className="mb-10 font-mono text-meta text-ink-muted">
          <span className="text-accent">GET</span> <span data-scramble>/about</span>
        </p>

        <div>
          <p
            data-statement
            className="max-w-[26ch] text-[30px] font-medium leading-[1.12] tracking-[-0.03em] text-ink md:text-5xl lg:text-[60px]"
          >
            I&apos;m a MEAN stack developer at BrainerHub Solutions. I build{" "}
            <span className="text-accent">Angular</span> frontends,{" "}
            <span className="text-accent">Node.js</span> APIs and{" "}
            <span className="text-accent">MongoDB</span> schemas for enterprise teams, and I care
            about the parts users never notice: clean architecture, error states and code the next
            developer can read.
          </p>
        </div>

        {/* Figures */}
        <div
          data-reveal-group
          className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-3 md:mt-28"
        >
          {STATS.map((s) => {
            const n = parseInt(s.number, 10);
            const suffix = s.number.replace(String(n), "");
            return (
              <div
                key={s.label}
                data-reveal
                className="border-b border-line py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
              >
                <p className="display text-[88px] tabular-nums text-ink md:text-[120px]">
                  <span data-stat={n}>{n}</span>
                  <span className="text-accent">{suffix}</span>
                </p>
                <p className="mt-4 text-base text-ink-secondary">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Background */}
        <div
          data-reveal-group
          className="mt-16 grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16"
        >
          <div className="max-w-[40rem] space-y-5">
            {aboutData.paragraphs.slice(1).map((p) => (
              <p key={p} data-reveal className="text-lg leading-[1.65] text-ink-secondary">
                {p}
              </p>
            ))}
          </div>
          <dl data-reveal className="divide-y divide-line border-y border-line">
            {FACTS.map((f) => (
              <div key={f.label} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-ink-muted">{f.label}</dt>
                <dd className="text-right text-base text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
