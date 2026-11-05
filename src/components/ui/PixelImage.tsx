"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows an image the way a slow response decodes: chunky pixels that
 * sharpen in a few steps before the real image appears.
 * `run` changes whenever the decode should play again.
 */
export default function PixelImage({
  src,
  alt,
  run,
  animate = true,
  focus = [0.5, 0.5],
  zoom = 1,
  className,
}: {
  src: string;
  alt: string;
  run: number;
  animate?: boolean;
  /** Focal point as fractions of width and height, kept in view when cropping */
  focus?: [number, number];
  /** Crops tighter around the focal point */
  zoom?: number;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(!animate);

  useEffect(() => {
    if (!animate) {
      setDone(true);
      return;
    }
    setDone(false);
    const img = new window.Image();
    img.src = src;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const draw = (blocks: number) => {
      const c = canvas.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const w = c.width;
      const h = c.height;
      const sw = blocks;
      const sh = Math.max(1, Math.round((blocks * h) / w));
      // Same crop the <img> shows: object-cover at the focal point, then scaled around it
      const scale = Math.max(w / img.width, h / img.height);
      const bw = w / scale;
      const bh = h / scale;
      const bx = (img.width - bw) * focus[0];
      const by = (img.height - bh) * focus[1];
      const cw = bw / zoom;
      const ch = bh / zoom;
      const cx = bx + bw * (focus[0] - focus[0] / zoom);
      const cy = by + bh * (focus[1] - focus[1] / zoom);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, sw, sh);
      ctx.drawImage(c, 0, 0, sw, sh, 0, 0, w, h);
    };

    img.onload = () => {
      const steps = [6, 10, 18, 32, 64];
      steps.forEach((b, i) => timers.push(setTimeout(() => draw(b), i * 110)));
      timers.push(setTimeout(() => setDone(true), steps.length * 110 + 60));
    };

    return () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, run, animate]);

  return (
    <div className={`relative aspect-square overflow-hidden rounded-xl border border-line bg-surface ${className ?? ""}`}>
      <canvas
        ref={canvas}
        width={320}
        height={320}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          objectPosition: `${focus[0] * 100}% ${focus[1] * 100}%`,
          transform: `scale(${zoom})`,
          transformOrigin: `${focus[0] * 100}% ${focus[1] * 100}%`,
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out ${
          done ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
