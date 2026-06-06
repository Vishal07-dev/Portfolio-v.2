"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { siteConfig } from "@/data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* ignore */ }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-subtle" />

      {/* Aurora blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, rgba(217,70,239,0.3) 50%, transparent 75%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Heading */}
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4">
              <span className="block w-6 h-px bg-accent-light opacity-60" />
              Get In Touch
              <span className="block w-6 h-px bg-accent-light opacity-60" />
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4 leading-tight">
              Let&apos;s Build Something{" "}
              <span className="gradient-text-animate">Together</span>
            </h2>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Open to new opportunities, collaborations, and technical conversations.
              Whether you&apos;re a recruiter, an engineering team, or a fellow developer —
              my inbox is always open.
            </p>
          </AnimatedSection>

          {/* Primary Email Card */}
          <AnimatedSection delay={0.1} className="mb-4">
            <SpotlightCard
              className="glass-card border border-border-accent hover:shadow-glow transition-all duration-400"
              spotlightColor="rgba(139, 92, 246, 0.12)"
            >
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.3), rgba(99,102,241,0.3))" }}>
                    <Mail size={20} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-subtle uppercase tracking-wider mb-1">Primary Email</p>
                    <p className="text-sm md:text-base font-semibold text-ink">{siteConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={copyEmail}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg glass border border-border hover:border-border-accent text-sm text-ink-muted hover:text-ink transition-all">
                    {copied ? (
                      <><Check size={14} className="text-success" /><span className="text-success">Copied!</span></>
                    ) : (
                      <><Copy size={14} />Copy</>
                    )}
                  </button>
                  <a href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #c084fc, #8b5cf6)", boxShadow: "0 0 20px rgba(139,92,246,0.35)" }}>
                    Send Email
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </AnimatedSection>

          {/* Social cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: <Linkedin size={20} />,
                label: "LinkedIn",
                handle: "vishal-rohera-661038262",
                href: siteConfig.linkedin,
                desc: "Connect professionally",
                border: "hover:border-blue-500/40",
                iconBg: "from-blue-500/20 to-blue-600/10",
                iconColor: "text-blue-400",
                spotColor: "rgba(59,130,246,0.1)",
              },
              {
                icon: <Github size={20} />,
                label: "GitHub",
                handle: "Vishal07-dev",
                href: siteConfig.github,
                desc: "See my open-source work",
                border: "hover:border-slate-500/40",
                iconBg: "from-slate-500/20 to-slate-600/10",
                iconColor: "text-slate-300",
                spotColor: "rgba(148,163,184,0.1)",
              },
            ].map((link) => (
              <AnimatedSection key={link.label} delay={0.15}>
                <SpotlightCard
                  className={`glass-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${link.border}`}
                  spotlightColor={link.spotColor}
                  borderOnHover={false}
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 group">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center ${link.iconBg} ${link.iconColor} flex-shrink-0`}>
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-ink-subtle mb-0.5">{link.label}</p>
                      <p className="text-sm font-semibold text-ink truncate">@{link.handle}</p>
                      <p className="text-xs text-ink-subtle mt-0.5">{link.desc}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-ink-subtle group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </a>
                </SpotlightCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Location + status */}
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-ink-subtle">
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-accent-light" />
                {siteConfig.location}
              </div>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-success font-medium">Available</span>
                <span className="text-ink-subtle">for remote & hybrid roles</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Sparkle footer note */}
          <AnimatedSection delay={0.4} className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border text-xs text-ink-subtle">
              <Sparkles size={12} className="text-accent-light" />
              Usually responds within 24 hours
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
