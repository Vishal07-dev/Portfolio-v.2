"use client";

import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: Props) {
  return (
    <AnimatedSection className={cn("mb-12 md:mb-16", className)}>
      <div className={cn(align === "center" && "text-center")}>
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4">
          <span className="block w-6 h-px bg-accent-light opacity-60" />
          {eyebrow}
          <span className="block w-6 h-px bg-accent-light opacity-60" />
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </AnimatedSection>
  );
}
