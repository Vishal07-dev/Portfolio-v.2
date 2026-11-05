"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/components/ui/useReveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { skillsData } from "@/data/portfolio";

/* One request travelling through the stack. Scrolling moves it along. */
const LAYERS = [
  { name: "Angular", role: "Client", detail: "Components, services, RxJS" },
  { name: "Express", role: "API", detail: "Routes, JWT middleware" },
  { name: "Node.js", role: "Server", detail: "Business logic, services" },
  { name: "MongoDB", role: "Data", detail: "Schemas, queries, indexes" },
];

const LOG = [
  { tag: "angular", text: "GET /api/reports?period=q3" },
  { tag: "express", text: "verifyJWT  ok" },
  { tag: "node", text: "aggregate orders by week" },
  { tag: "mongodb", text: "orders.find  1,284 docs  18 ms" },
  { tag: "200", text: "JSON back to the dashboard  46 ms" },
];

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: a packet moves across the four layers while you scroll
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        const nodes = gsap.utils.toArray<HTMLElement>("[data-layer]");
        const rings = gsap.utils.toArray<HTMLElement>("[data-layer-ring]");
        const logs = gsap.utils.toArray<HTMLElement>("[data-log]");

        gsap.set(rings, { opacity: 0 });
        gsap.set(logs, { opacity: 0.25 });
        gsap.set("[data-packet]", { left: "0%", opacity: 0 });
        gsap.set("[data-track-fill]", { scaleX: 0, transformOrigin: "left center" });

        // On large screens the diagram pins and the request plays out over the scroll
        const pin = window.matchMedia("(min-width: 1024px) and (min-height: 700px)").matches;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: pin
            ? {
                trigger: "[data-flow]",
                start: "center center",
                end: "+=1400",
                pin: true,
                scrub: 0.6,
              }
            : {
                trigger: "[data-flow]",
                start: "top 70%",
                end: "bottom 35%",
                scrub: 0.6,
              },
        });

        const step = 1;
        tl.to("[data-packet]", { opacity: 1, duration: 0.15 }, 0)
          .to("[data-packet]", { left: "100%", duration: step * (nodes.length - 1) }, 0)
          .to("[data-track-fill]", { scaleX: 1, duration: step * (nodes.length - 1) }, 0);

        nodes.forEach((_, i) => {
          tl.to(rings[i], { opacity: 1, duration: 0.2 }, i * step);
          tl.to(logs[i], { opacity: 1, duration: 0.2 }, i * step);
        });
        tl.to(logs[logs.length - 1], { opacity: 1, duration: 0.2 }, (nodes.length - 1) * step + 0.2);
      });

      // Small screens: layers simply appear in order
      mm.add(`${MOTION_OK} and (max-width: 767px)`, () => {
        gsap.from("[data-layer]", {
          autoAlpha: 0,
          y: 10,
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-flow]", start: "top 80%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="skills" ref={root} className="section-y border-t border-line">
      <div className="page-x">
        <SectionHeader
          route="/skills"
          title="The stack I ship with"
          description="Most days a request goes through every one of these layers, and I write the code at each stop."
        />

        {/* Request path, the moment of this section */}
        <div data-flow className="card mb-16 p-5 md:p-8">
          <div className="relative">
            {/* Track between the centers of the first and last layer */}
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-1/2 hidden h-px -translate-y-1/2 md:block">
              <span className="absolute inset-0 bg-line-strong" />
              <span data-track-fill className="absolute inset-0 bg-accent" />
              <span
                data-packet
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(242,163,58,0.18)]"
              />
            </div>

            <ol className="relative grid gap-3 md:grid-cols-4 md:gap-6">
              {LAYERS.map((l) => (
                <li
                  key={l.name}
                  data-layer
                  className="relative rounded-xl border border-line bg-bg-deep p-4 md:p-6"
                >
                  <span
                    data-layer-ring
                    className="pointer-events-none absolute inset-0 rounded-xl border border-accent/60"
                  />
                  <p className="font-mono text-meta text-ink-muted">{l.role}</p>
                  <p className="mt-2 text-lg font-medium tracking-[-0.02em] text-ink md:mt-6 md:text-[28px]">{l.name}</p>
                  <p className="mt-1 text-[13px] leading-5 text-ink-muted">{l.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-bg-deep p-4 font-mono text-[12px] leading-6 md:p-6 md:text-[13px] md:leading-7">
            {LOG.map((l) => (
              <p key={l.tag} data-log className="whitespace-nowrap">
                <span className={`whitespace-pre ${l.tag === "200" ? "text-positive" : "text-accent"}`}>
                  {l.tag.padEnd(8, " ")}
                </span>
                <span className="whitespace-pre text-ink-secondary"> {l.text}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Full toolkit as a spec sheet */}
        <dl data-reveal-group className="divide-y divide-line border-y border-line">
          {skillsData.map((cat) => (
            <div
              key={cat.category}
              data-reveal
              className="grid gap-2 py-5 md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-8"
            >
              <dt className="text-base text-ink">{cat.category}</dt>
              <dd className="text-base leading-7 text-ink-secondary">{cat.skills.join(", ")}</dd>
              <dd className="hidden font-mono text-meta tabular-nums text-ink-muted md:block">
                {String(cat.skills.length).padStart(2, "0")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
