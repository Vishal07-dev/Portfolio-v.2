"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, Star, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { projectsData, type Project } from "@/data/portfolio";

/* ─── 3D tilt + spotlight card ─── */
function ProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* Spotlight */
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 });
  const [spotOpacity, setSpotOpacity] = useState(0);

  /* 3D tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const scale   = useSpring(1, { stiffness: 300, damping: 25 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    scale.set(1);
    setSpotOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseEnter={() => { scale.set(1.015); setSpotOpacity(1); }}
        onMouseLeave={onLeave}
        className="relative glass-card rounded-2xl border border-border overflow-hidden h-full transition-colors duration-300 hover:border-border-accent cursor-default"
      >
        {/* Spotlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{
            opacity: spotOpacity,
            background: `radial-gradient(550px circle at ${spotPos.x}px ${spotPos.y}px, rgba(139,92,246,0.13), transparent 60%)`,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Gradient hover tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-purple-500/0 hover:from-accent/3 hover:to-purple-500/3 transition-all duration-500 rounded-2xl pointer-events-none z-0" />

        <div className="relative z-20 p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {featured && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
                  <Star size={10} fill="currentColor" />
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-elevated transition-all"
                  aria-label="GitHub">
                  <Github size={15} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg text-ink-subtle hover:text-accent-light hover:bg-accent/10 transition-all"
                  aria-label="Live demo">
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-ink mb-3 leading-snug group-hover:text-accent-light transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-5">
            {project.description}
          </p>

          {/* Highlight tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.highlights.map((h) => (
              <span key={h} className="px-2 py-1 text-xs rounded-md bg-surface-elevated text-ink-subtle border border-border">
                {h}
              </span>
            ))}
          </div>

          {/* Tech stack + CTA */}
          <div className="border-t border-border pt-4 flex items-end justify-between gap-3 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-accent/10 text-accent-light border border-accent/20">
                  {t}
                </span>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-ink-subtle hover:text-accent-light transition-colors group/lnk flex-shrink-0"
              >
                Live demo
                <ArrowUpRight size={12} className="group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projectsData.find((p) => p.featured)!;
  const others   = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,70,239,0.7), transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Projects"
          title="What I've Built"
          description="Hands-on projects that demonstrate full-stack development across the MEAN stack and beyond."
        />

        {/* Featured — full width */}
        <div className="mb-5">
          <ProjectCard project={featured} index={0} featured />
        </div>

        {/* Others — 2 col grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {others.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 1} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/Vishal07-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl glass border border-border hover:border-border-accent text-sm font-medium text-ink-muted hover:text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
          >
            <Github size={16} />
            More on GitHub
            <ArrowUpRight size={13} className="text-ink-subtle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
