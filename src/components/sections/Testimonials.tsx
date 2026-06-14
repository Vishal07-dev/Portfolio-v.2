"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { testimonialsData } from "@/data/portfolio";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.7), transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="What People Say"
          description="A few words from people I've collaborated with."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonialsData.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <SpotlightCard
                className="h-full glass-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                spotlightColor="rgba(139, 92, 246, 0.1)"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Quote icon */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(99,102,241,0.25))" }}>
                    <Quote size={16} className="text-accent-light" />
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #f0abfc 0%, #c084fc 40%, #818cf8 100%)" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">{t.name}</p>
                      <p className="text-xs text-ink-subtle truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
