"use client";

import { motion } from "framer-motion";
import { FileText, Calendar, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { writingData } from "@/data/portfolio";

export default function Writing() {
  return (
    <section id="writing" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(217,70,239,0.6), transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Writing / Notes"
          title="Writing & Notes"
          description="Coming soon. Articles on Angular, Node.js, and AI-assisted development."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {writingData.map((note, i) => (
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
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.25), rgba(99,102,241,0.25))" }}>
                      <FileText size={16} className="text-accent-light" />
                    </div>
                    <ArrowUpRight size={15} className="text-ink-subtle" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-ink leading-snug flex-1 mb-5">
                    {note.title}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-ink-subtle pt-4 border-t border-border">
                    <Calendar size={12} className="text-ink-subtle" />
                    {note.date}
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
