"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useReveal } from "@/components/ui/useReveal";
import { publicationsData } from "@/data/portfolio";

export default function Publications() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="publications" ref={root} className="section-y border-t border-line bg-bg-deep">
      <div className="page-x">
        <SectionHeader route="/writing" title="Writing" />

        <div data-reveal-group className="border-y border-line">
          {publicationsData.map((article) => (
            <a
              key={article.url}
              data-reveal
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-3 py-8 transition-colors md:grid-cols-[160px_1fr_auto] md:gap-8"
            >
              <span className="font-mono text-meta text-ink-muted">{article.platform}</span>
              <span>
                <span className="block text-xl font-medium leading-snug text-ink">
                  {article.title}
                </span>
                <span className="mt-1 block text-base text-ink-muted">{article.subtitle}</span>
                <span className="mt-4 block max-w-[40rem] text-base leading-7 text-ink-secondary">
                  {article.description}
                </span>
                <span className="mt-4 block font-mono text-meta text-ink-muted">
                  {article.tags.join("  ·  ")}
                </span>
              </span>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="hidden text-ink-muted transition-[color,transform] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
