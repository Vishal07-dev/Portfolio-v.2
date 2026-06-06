"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, MapPin, ExternalLink, Download, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

/* ─── Typewriter ─── */
const ROLES = [
  "MEAN Stack Developer",
  "Angular Developer",
  "Node.js Developer",
  "Full-Stack Developer",
];

function Typewriter() {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = ROLES[wordIdx];
    const delay = deleting ? 40 : charIdx === word.length ? 2200 : 80;

    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, charIdx + 1));
        if (charIdx + 1 === word.length) { setTimeout(() => setDeleting(true), 2000); return; }
        setCharIdx((c) => c + 1);
      } else {
        setDisplay(word.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % ROLES.length);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx]);

  return (
    <span className="text-ink-muted">
      {display}
      <span className="typewriter-cursor" />
    </span>
  );
}

/* ─── Floating tech icons for hero card ─── */
const cardIcons = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg", alt: "Angular", white: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", alt: "Node.js", white: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", alt: "MongoDB", white: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript", white: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", alt: "React", white: false },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", alt: "Next.js", white: true },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } },
  item: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } } },
};

export default function Hero() {
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden aurora-wrapper">

      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-100 z-0" />

      {/* Edge fades */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-20 max-w-6xl mx-auto px-5 md:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_440px] gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-7"
          >
            {/* Availability badge */}
            <motion.div variants={stagger.item}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-accent glass text-sm w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-ink font-medium">{siteConfig.company}</span>
                <span className="text-ink-subtle">·</span>
                <span className="text-ink-subtle">Open to opportunities</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={stagger.item}>
              <h1 className="font-bold leading-[0.95] tracking-tight">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-ink">
                  Vishal
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl gradient-text-animate mt-1">
                  Rohera.
                </span>
              </h1>
            </motion.div>

            {/* Role typewriter */}
            <motion.div variants={stagger.item}>
              <p className="text-xl md:text-2xl font-light">
                <Typewriter />
              </p>
            </motion.div>

            {/* Description */}
            <motion.div variants={stagger.item}>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-lg">
                I build{" "}
                <span className="text-ink font-medium">enterprise web applications</span>{" "}
                with Angular and Node.js — scalable, fast, and production-ready.
                Currently at{" "}
                <span className="text-accent-light font-medium">BrainerHub Solutions</span>.
              </p>
            </motion.div>

            {/* Location */}
            <motion.div variants={stagger.item}>
              <div className="flex items-center gap-1.5 text-sm text-ink-subtle">
                <MapPin size={13} className="text-accent-light" />
                {siteConfig.location}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => scroll("projects")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #c084fc 0%, #8b5cf6 50%, #6366f1 100%)", boxShadow: "0 0 24px rgba(139,92,246,0.4)" }}
              >
                View Projects
                <ExternalLink size={14} />
              </motion.button>

              <motion.button
                onClick={() => scroll("contact")}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-ink border border-border glass hover:border-border-accent transition-colors"
              >
                Contact Me
              </motion.button>

              <motion.a
                href={siteConfig.resumeUrl}
                download
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-accent-light border border-border-accent hover:bg-accent/10 transition-colors"
              >
                <Download size={14} />
                Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={stagger.item} className="flex items-center gap-4">
              <span className="text-xs text-ink-subtle tracking-widest uppercase">Connect</span>
              <div className="h-px w-8 bg-border" />
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Floating glass card cluster ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:flex items-center justify-center relative h-[520px]"
          >
            {/* Glow behind cards */}
            <div
              className="absolute inset-0 rounded-full opacity-60 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.3) 0%, rgba(217,70,239,0.15) 50%, transparent 75%)" }}
            />

            {/* ─ Stat card 1: top-right ─ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="float-2 absolute top-4 right-0 w-36 glass-card rounded-2xl p-4 z-20"
            >
              <div className="text-3xl font-bold gradient-text leading-none mb-1">1+</div>
              <div className="text-xs text-ink-subtle leading-snug">Year of Experience</div>
              <div className="mt-3 h-1 rounded-full bg-surface-elevated overflow-hidden">
                <div className="h-full w-3/4 rounded-full" style={{ background: "linear-gradient(to right, #c084fc, #818cf8)" }} />
              </div>
            </motion.div>

            {/* ─ Main identity card: center ─ */}
            <motion.div
              className="float-1 relative w-72 glass-elevated rounded-3xl overflow-hidden z-10"
            >
              {/* Card header gradient */}
              <div
                className="h-24 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.3) 0%, rgba(139,92,246,0.2) 50%, rgba(99,102,241,0.2) 100%)" }}
              >
                <div className="absolute inset-0 dot-grid opacity-30" />
                {/* Sparkle icon */}
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5">
                  <Sparkles size={14} className="text-accent-light" />
                </div>
              </div>

              {/* Avatar overlapping header */}
              <div className="px-6 pb-6">
                <div className="-mt-8 mb-4 flex items-end justify-between">
                  <div
                    className="w-16 h-16 rounded-2xl border-2 border-bg flex items-center justify-center text-white font-bold text-xl shadow-glow"
                    style={{ background: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)" }}
                  >
                    VR
                  </div>
                  {/* Online indicator */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/25 text-xs text-success font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Available
                  </div>
                </div>

                {/* Name & role */}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-ink">{siteConfig.name}</h3>
                  <p className="text-sm text-ink-muted mt-0.5">MEAN Stack Developer</p>
                  <p className="text-xs text-ink-subtle mt-1">@ {siteConfig.company}</p>
                </div>

                {/* Tech icons */}
                <div className="mb-4">
                  <p className="text-xs text-ink-subtle uppercase tracking-wider mb-2.5">Tech Stack</p>
                  <div className="flex gap-2 flex-wrap">
                    {cardIcons.map((icon) => (
                      <div key={icon.alt} className="tech-icon-wrap" title={icon.alt}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={icon.src}
                          alt={icon.alt}
                          width={22}
                          height={22}
                          loading="lazy"
                          className="object-contain"
                          style={icon.white ? { filter: "brightness(0) invert(1)" } : undefined}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border mb-3" />

                {/* Location row */}
                <div className="flex items-center gap-1.5 text-xs text-ink-subtle">
                  <MapPin size={11} className="text-accent-light" />
                  Ahmedabad, Gujarat, India
                </div>
              </div>
            </motion.div>

            {/* ─ Stat card 2: bottom-left ─ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="float-3 absolute bottom-8 -left-4 w-44 glass-card rounded-2xl p-4 z-20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.3), rgba(99,102,241,0.3))" }}>
                  <Sparkles size={13} className="text-accent-light" />
                </div>
                <span className="text-xs text-ink-subtle font-medium">AI-Assisted</span>
              </div>
              <div className="text-3xl font-bold gradient-text leading-none">3+</div>
              <div className="text-xs text-ink-subtle mt-1">Projects Shipped</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom tech strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-xs text-ink-subtle mb-4 tracking-widest uppercase">Primary Technologies</p>
          <div className="flex flex-wrap gap-2">
            {[
              { n: "Angular", c: "#dd0031" }, { n: "Node.js", c: "#68a063" },
              { n: "MongoDB", c: "#4db33d" }, { n: "TypeScript", c: "#3178c6" },
              { n: "React.js", c: "#61dafb" }, { n: "Express.js", c: "#8a8aaa" },
              { n: "Next.js", c: "#a78bfa" },
            ].map((t) => (
              <span key={t.n}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-ink-muted glass border border-border hover:border-border-accent transition-colors cursor-default">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.c }} />
                {t.n}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={() => scroll("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-ink-subtle hover:text-ink-muted transition-colors"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
