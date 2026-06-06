"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Tag, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { publicationsData } from "@/data/portfolio";

export default function Publications() {
  return (
    <section id="publications" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-subtle" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(192,132,252,0.7), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Published Articles"
          description="Sharing knowledge with the developer community through technical writing."
        />

        <div className="max-w-3xl">
          {publicationsData.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <SpotlightCard
                className="glass-card border border-border hover:border-border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                spotlightColor="rgba(192, 132, 252, 0.1)"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row gap-6 p-7 group">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.2), rgba(99,102,241,0.2))", border: "1px solid rgba(192,132,252,0.25)" }}>
                      <BookOpen size={22} className="text-accent-light" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-xs font-semibold text-accent-light uppercase tracking-wider">
                          {article.platform}
                        </span>
                        <h3 className="text-base md:text-lg font-bold text-ink mt-1 leading-snug group-hover:gradient-text transition-all">
                          {article.title}
                        </h3>
                        {article.subtitle && (
                          <p className="text-sm text-ink-subtle mt-0.5">{article.subtitle}</p>
                        )}
                      </div>
                      <ArrowUpRight
                        size={17}
                        className="text-ink-subtle group-hover:text-accent-light flex-shrink-0 mt-1 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>

                    <p className="text-sm text-ink-muted leading-relaxed mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag size={12} className="text-ink-subtle" />
                      {article.tags.map((tag) => (
                        <span key={tag}
                          className="px-2.5 py-1 text-xs rounded-lg bg-surface-elevated text-ink-subtle border border-border hover:border-border-accent transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
