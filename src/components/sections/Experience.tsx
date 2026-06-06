"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, MapPin, CheckCircle2, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { experienceData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Section bg */}
      <div className="absolute inset-0 bg-bg-subtle" />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.7), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've Worked"
          description="Building production software in a collaborative agile environment."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-6 bottom-6 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(192,132,252,0.5), rgba(99,102,241,0.2), transparent)" }} />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="md:pl-16 relative"
          >
            {/* Timeline dot */}
            <div className="hidden md:flex absolute -left-[1.15rem] top-6 w-9 h-9 rounded-full items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.2), rgba(99,102,241,0.2))", border: "1.5px solid rgba(192,132,252,0.5)", boxShadow: "0 0 16px rgba(139,92,246,0.3)" }}>
              <div className="w-2.5 h-2.5 rounded-full"
                style={{ background: "linear-gradient(135deg, #c084fc, #818cf8)" }} />
            </div>

            <SpotlightCard
              className="glass-card border border-border hover:border-border-accent transition-all duration-300 hover:shadow-card-hover"
              spotlightColor="rgba(139, 92, 246, 0.08)"
            >
              <div className="p-7 md:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.2), rgba(99,102,241,0.2))", border: "1px solid rgba(192,132,252,0.3)" }}>
                      <Building2 size={20} className="text-accent-light" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{experienceData.role}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <a href={experienceData.companyUrl} target="_blank" rel="noopener noreferrer"
                          className="text-accent-light font-medium text-sm hover:text-accent flex items-center gap-1 group">
                          {experienceData.company}
                          <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <span className="text-ink-subtle">·</span>
                        <span className="text-ink-subtle text-sm">{experienceData.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    <div className="flex items-center gap-1.5 text-sm text-ink-muted">
                      <Calendar size={13} className="text-ink-subtle" />
                      {experienceData.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-ink-muted">
                      <MapPin size={13} className="text-ink-subtle" />
                      {experienceData.location}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      Current Role
                    </span>
                  </div>
                </div>

                <p className="text-ink-muted text-sm mb-7 leading-relaxed">
                  {experienceData.description}
                </p>

                {/* Responsibilities */}
                <div className="mb-7">
                  <h4 className="text-xs font-semibold text-ink-subtle uppercase tracking-wider mb-4">
                    Key Responsibilities
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2.5">
                    {experienceData.responsibilities.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="flex items-start gap-2.5 text-sm text-ink-muted"
                      >
                        <CheckCircle2 size={14} className="text-accent-light mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-xs font-semibold text-ink-subtle uppercase tracking-wider mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceData.technologies.map((tech) => (
                      <span key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent/10 text-accent-light border border-accent/20 hover:bg-accent/20 transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
