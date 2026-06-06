"use client";

import { cn } from "@/lib/utils";

interface MarqueeItem {
  name: string;
  icon?: string;
  color?: string;
}

interface Props {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number; // seconds for one full cycle
  className?: string;
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  items,
  direction = "left",
  speed = 35,
  className,
  pauseOnHover = true,
}: Props) {
  const duplicated = [...items, ...items];

  return (
    <div className={cn("overflow-hidden marquee-fade", className)}>
      <div
        className={cn(
          "marquee-track",
          direction === "left" ? "marquee-left" : "marquee-right",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl glass border border-border hover:border-border-accent transition-all duration-200 cursor-default group hover:-translate-y-0.5 select-none"
          >
            {item.icon && (
              <div className="tech-icon-wrap group-hover:bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon}
                  alt={item.name}
                  width={22}
                  height={22}
                  loading="lazy"
                  className="object-contain"
                  style={{ filter: item.color === "white" ? "brightness(0) invert(1)" : undefined }}
                />
              </div>
            )}
            {!item.icon && item.color && (
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="text-sm font-medium text-ink-muted group-hover:text-ink transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
