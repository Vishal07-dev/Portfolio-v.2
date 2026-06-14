"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, MapPin, Briefcase, Sparkles, Code2, Coffee } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { aboutData } from "@/data/portfolio";

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ─── Bento cell wrapper ─── */
function BentoCell({
  children,
  className = "",
  delay = 0,
  spotlight = true,
  spotlightColor,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  spotlight?: boolean;
  spotlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const inner = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${className}`}
    >
      {children}
    </motion.div>
  );

  if (!spotlight) return inner;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      <SpotlightCard
        className="h-full glass-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        spotlightColor={spotlightColor ?? "rgba(139, 92, 246, 0.1)"}
      >
        {children}
      </SpotlightCard>
    </motion.div>
  );
}

/* ─── Stat display ─── */
function StatCell({ target, suffix = "", label, delay }: { target: number; suffix?: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="p-6 flex flex-col justify-between h-full">
      <div>
        <div className="text-4xl font-bold gradient-text leading-none">
          {count}{suffix}
        </div>
        <div className="text-xs text-ink-subtle mt-2 leading-snug">{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,70,239,0.6), transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="About Me"
          title="Who I Am"
          description="The person behind the code — background, mindset, and what drives me."
        />

        {/* ── BENTO GRID ── */}
        <div className="bento-grid">

          {/* ── Intro (3×2) ── */}
          <div className="bento-intro">
            <SpotlightCard
              className="h-full glass-card border border-border transition-all duration-300 hover:-translate-y-1"
              spotlightColor="rgba(139, 92, 246, 0.08)"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="p-7 md:p-8 h-full flex flex-col justify-between min-h-[280px]"
              >
                {/* Header icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.3), rgba(99,102,241,0.3))" }}>
                    <Code2 size={18} className="text-accent-light" />
                  </div>
                  <span className="text-xs text-ink-subtle uppercase tracking-widest">About</span>
                </div>

                {/* Text */}
                <div className="space-y-4 flex-1">
                  {aboutData.paragraphs.map((p, i) => (
                    <p key={i} className="text-ink-muted leading-relaxed text-sm md:text-base">{p}</p>
                  ))}
                </div>

                {/* Bottom: tech tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-border">
                  {["Angular", "Node.js", "Express.js", "MongoDB", "React.js", "Next.js", "TypeScript"].map((tag) => (
                    <span key={tag}
                      className="px-2.5 py-1 text-xs rounded-lg text-ink-subtle border border-border hover:border-border-accent hover:text-ink-muted transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </SpotlightCard>
          </div>

          {/* ── Stat 1: Experience ── */}
          <BentoCell delay={0.1} spotlightColor="rgba(192,132,252,0.1)" className="bento-stat min-h-[160px]">
            <StatCell target={1} suffix="+" label="Year of Professional Experience" delay={0.1} />
          </BentoCell>

          {/* ── Stat 2: Projects ── */}
          <BentoCell delay={0.15} spotlightColor="rgba(99,102,241,0.1)" className="bento-stat min-h-[160px]">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-4xl font-bold gradient-text leading-none">3+</div>
                <div className="text-xs text-ink-subtle mt-2 leading-snug">Projects Shipped</div>
              </div>
              <div className="flex gap-1 mt-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="h-1 flex-1 rounded-full"
                    style={{ background: "linear-gradient(to right, #c084fc, #818cf8)" }} />
                ))}
              </div>
            </div>
          </BentoCell>

          {/* ── Education ── */}
          <BentoCell delay={0.2} className="bento-edu min-h-[140px]">
            <div className="p-5 flex flex-col gap-3 h-full">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(99,102,241,0.25))" }}>
                <GraduationCap size={17} className="text-accent-light" />
              </div>
              <div>
                <p className="text-xs text-ink-subtle uppercase tracking-wider mb-1">Education</p>
                <p className="text-sm font-semibold text-ink leading-tight">BCA</p>
                <p className="text-xs text-ink-subtle mt-0.5 leading-snug">Silver Oak University</p>
              </div>
            </div>
          </BentoCell>

          {/* ── Currently Building ── */}
          <BentoCell delay={0.25} spotlightColor="rgba(217,70,239,0.08)" className="bento-current min-h-[140px]">
            <div className="p-6 h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.25), rgba(139,92,246,0.25))" }}>
                  <Sparkles size={15} className="text-pink-300" />
                </div>
                <span className="text-xs text-ink-subtle uppercase tracking-wider">Currently</span>
              </div>
              <div className="space-y-2">
                {[
                  { dot: "bg-success", text: "Building enterprise web applications" },
                  { dot: "bg-accent", text: "Full MEAN stack development" },
                  { dot: "bg-pink-400", text: "AI-assisted workflows" },
                  { dot: "bg-sky-400", text: "Open to new opportunities" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 text-sm text-ink-muted">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </BentoCell>

          {/* ── Location ── */}
          <BentoCell delay={0.3} className="bento-location min-h-[140px]">
            <div className="p-5 flex flex-col justify-between h-full">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(59,130,246,0.25))" }}>
                <MapPin size={17} className="text-sky-400" />
              </div>
              <div className="mt-auto">
                <p className="text-xs text-ink-subtle uppercase tracking-wider mb-1">Based in</p>
                <p className="text-sm font-semibold text-ink">Ahmedabad</p>
                <p className="text-xs text-ink-subtle mt-0.5">Gujarat, India</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-xs text-success">Remote-ready</span>
                </div>
              </div>
            </div>
          </BentoCell>

        </div>
      </div>
    </section>
  );
}
