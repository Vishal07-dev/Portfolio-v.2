"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { projectsData, siteConfig, type Project } from "@/data/portfolio";

const host = (url: string | null) => (url ? new URL(url).host : "");
const pad = (n: number) => String(n).padStart(2, "0");

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-panel
      className="grid grid-cols-1 items-center gap-8 border-t border-line py-14 lg:w-[min(80vw,1120px)] lg:shrink-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12 lg:border-t-0 lg:py-0"
    >
      {/* Browser frame with the live site */}
      <div
        data-frame
        className="overflow-hidden rounded-[20px] border border-line-strong bg-bg-deep shadow-window"
      >
        <div className="flex h-10 items-center gap-2 border-b border-line px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
          <span className="ml-3 truncate font-mono text-meta text-ink-muted">
            {host(project.liveUrl)}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            data-shot
            src={project.image}
            alt={`${project.title} home page`}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover object-top lg:scale-[1.12]"
            priority={index === 0}
          />
        </div>
      </div>

      {/* Copy */}
      <div data-copy className="min-w-0">
        <p className="font-mono text-meta tabular-nums text-ink-muted">
          {pad(index + 1)} / {pad(projectsData.length)}
        </p>
        <h3 className="mt-4 text-[32px] font-medium leading-[1.02] tracking-[-0.035em] text-ink md:text-[44px]">
          {project.title}
        </h3>
        <p className="mt-5 text-lg leading-[1.55] text-ink-secondary">{project.problem}</p>

        <dl className="mt-6 space-y-3 text-[15px] leading-6">
          <div>
            <dt className="text-ink-muted">My role</dt>
            <dd className="mt-0.5 text-ink-secondary">{project.role}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Highlights</dt>
            <dd className="mt-0.5 text-ink-secondary">{project.highlights.join(", ")}</dd>
          </div>
        </dl>
        <p className="mt-5 font-mono text-meta text-ink-muted">{project.tech.join("  ·  ")}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open live site
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={16} strokeWidth={1.5} />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      // Large screens: the section pins and the projects scroll sideways
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const track = q("[data-track]")[0] as HTMLElement;
        const distance = () => track.scrollWidth - window.innerWidth;

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          q("[data-progress]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: q("[data-pin]")[0],
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        q("[data-panel]").forEach((panel) => {
          const frame = panel.querySelector("[data-frame]");
          const shot = panel.querySelector("[data-shot]");
          const copy = panel.querySelector("[data-copy]");

          // Frame opens as the panel slides in
          gsap.fromTo(
            frame,
            { clipPath: "inset(0% 0% 0% 30% round 20px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: slide,
                start: "left 95%",
                end: "left 45%",
                scrub: true,
              },
            }
          );
          // Screenshot drifts inside its frame
          gsap.fromTo(
            shot,
            { xPercent: 5 },
            {
              xPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: slide,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
          gsap.from(copy, {
            autoAlpha: 0,
            x: 40,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: slide,
              start: "left 75%",
              end: "left 35%",
              scrub: true,
            },
          });
        });
      });

      // Smaller screens: a plain stacked list with a short reveal per project
      mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
        q("[data-panel]").forEach((panel) => {
          gsap.from(panel.children, {
            autoAlpha: 0,
            y: 16,
            stagger: 0.08,
            scrollTrigger: { trigger: panel, start: "top 80%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="projects" ref={root} className="border-t border-line">
      <div
        data-pin
        className="relative lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden"
      >
        <div
          data-track
          className="page-x flex flex-col py-24 md:py-32 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row lg:items-center lg:gap-[10vw] lg:px-[max(32px,calc((100vw-1200px)/2+32px))] lg:py-0"
        >
          {/* Intro panel */}
          <div className="pb-6 lg:w-[30vw] lg:max-w-[440px] lg:shrink-0 lg:pb-0">
            <p className="mb-5 font-mono text-meta text-ink-muted">
              <span className="text-accent">GET</span> <span data-scramble>/projects</span>
            </p>
            <h2 className="text-[48px] font-medium leading-[0.95] tracking-[-0.045em] text-ink md:text-7xl lg:text-[88px]">
              Built and shipped
            </h2>
            <p className="mt-6 max-w-[30rem] text-lg leading-[1.6] text-ink-secondary">
              Three live projects. Each one is open, so you can click through the real thing.
            </p>
            <p className="mt-10 hidden items-center gap-2 font-mono text-meta text-ink-muted lg:flex">
              Keep scrolling <ArrowRight size={14} strokeWidth={1.5} />
            </p>
          </div>

          {projectsData.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}

          {/* Outro panel */}
          <div className="border-t border-line pt-10 lg:w-[26vw] lg:shrink-0 lg:border-t-0 lg:pt-0">
            <p className="text-2xl leading-[1.2] tracking-[-0.02em] text-ink md:text-[32px]">
              More experiments and source code live on GitHub
            </p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8"
            >
              <Github size={16} strokeWidth={1.5} />
              github.com/Vishal07-dev
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Progress across the gallery */}
        <div className="page-x absolute inset-x-0 bottom-10 hidden lg:block">
          <span className="relative block h-px bg-line-strong">
            <span data-progress className="absolute inset-0 bg-accent" />
          </span>
        </div>
      </div>
    </section>
  );
}
