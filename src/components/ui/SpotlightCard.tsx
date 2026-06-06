"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderOnHover?: boolean;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(139, 92, 246, 0.13)",
  borderOnHover = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-300",
        borderOnHover && "hover:border-border-accent",
        className
      )}
    >
      {/* Spotlight overlay */}
      <div
        className="spotlight-overlay"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
          transition: "opacity 0.25s ease",
        }}
      />
      {children}
    </div>
  );
}
