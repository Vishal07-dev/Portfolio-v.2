"use client";

import { useEffect, useState } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  op: number;
  dur: number;
  delay: number;
};

export default function Starfield({ count = 180 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        op: Math.random() * 0.65 + 0.2,
        dur: Math.random() * 5 + 2.5,
        delay: Math.random() * 12,
      }))
    );
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--op": s.op,
              opacity: s.op,
              animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
            } as React.CSSProperties & { "--op": number }
          }
        />
      ))}
    </div>
  );
}
