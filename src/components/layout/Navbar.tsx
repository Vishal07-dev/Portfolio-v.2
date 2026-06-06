"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
          scrolled
            ? "border-b border-border shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "border-b border-transparent"
        )}
        style={scrolled ? {
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          background: "rgba(7, 7, 15, 0.85)"
        } : {}}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group" aria-label="Home">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-105 shadow-glow-sm"
              style={{ background: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)" }}>
              VR
            </div>
            <span className="hidden sm:block text-sm font-semibold text-ink-muted group-hover:text-ink transition-colors">
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isActive ? "text-accent-light" : "text-ink-muted hover:text-ink"
                  )}>
                  {link.label}
                  {isActive && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-accent/10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={siteConfig.resumeUrl} download
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border-accent text-accent-light hover:bg-accent/10 transition-all duration-200">
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface transition-colors"
            aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm md:hidden" />

            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col md:hidden"
              style={{ background: "rgba(10,10,24,0.95)", backdropFilter: "blur(32px)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>

              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #f0abfc, #c084fc, #818cf8)" }}>
                  VR
                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-elevated transition-colors">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a key={link.href} href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.08 }}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      active === link.href.slice(1)
                        ? "bg-accent/10 text-accent-light border border-border-accent"
                        : "text-ink-muted hover:text-ink hover:bg-surface-elevated"
                    )}>
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <a href={siteConfig.resumeUrl} download
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{ background: "linear-gradient(135deg, #c084fc, #8b5cf6)" }}>
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
