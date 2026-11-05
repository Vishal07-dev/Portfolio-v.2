"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ReportWindow from "@/components/ui/ReportWindow";
import { useReveal } from "@/components/ui/useReveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { experienceData } from "@/data/portfolio";

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  // The timeline rule fills as the responsibilities scroll past
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-rule]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: "[data-duties]",
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="section-y border-t border-line bg-bg-deep">
      <div className="page-x">
        <SectionHeader
          route="/experience"
          title="Where I work now"
          description={experienceData.description}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          {/* Role meta */}
          <div data-reveal-group className="lg:sticky lg:top-28 lg:self-start">
            <p data-reveal className="text-xl font-medium text-ink">
              {experienceData.role}
            </p>
            <a
              data-reveal
              href={experienceData.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-1 inline-flex items-center gap-1 text-base text-ink-secondary transition-colors hover:text-ink"
            >
              {experienceData.company}
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="text-ink-muted transition-colors group-hover:text-ink"
              />
            </a>

            <dl data-reveal className="mt-6 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 text-ink-muted">Period</dt>
                <dd className="tabular-nums text-ink-secondary">{experienceData.duration}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 text-ink-muted">Type</dt>
                <dd className="text-ink-secondary">{experienceData.type}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 text-ink-muted">Location</dt>
                <dd className="text-ink-secondary">{experienceData.location}</dd>
              </div>
            </dl>

            <p data-reveal className="mt-6 font-mono text-meta leading-5 text-ink-muted">
              {experienceData.technologies.join("  ·  ")}
            </p>
          </div>

          {/* Responsibilities on a timeline rule */}
          <div data-duties className="relative pl-6">
            <span className="absolute bottom-2 left-0 top-2 w-px bg-line" />
            <span data-rule className="absolute bottom-2 left-0 top-2 w-px bg-accent" />
            <ul data-reveal-group className="divide-y divide-line">
              {experienceData.responsibilities.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="py-4 text-base leading-7 text-ink-secondary first:pt-0 last:pb-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* A working sample of the kind of module described above */}
        <div className="mt-24 md:mt-32">
          <div data-reveal-group className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <p data-reveal className="max-w-[28ch] text-2xl leading-[1.2] tracking-[-0.02em] text-ink md:text-[32px]">
              The kind of screen I build. Switch the range, hover the chart
            </p>
            <p data-reveal className="font-mono text-meta text-ink-muted">
              Angular · RxJS · Node.js · MongoDB queries
            </p>
          </div>
          <ReportWindow />
        </div>
      </div>
    </section>
  );
}
