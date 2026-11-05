"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, LayoutGrid, Package, Settings, Users } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* ─── Sample data for a reporting module (illustrative, not real figures) ─── */
type Range = "Month" | "Quarter" | "Year";
type Dataset = {
  title: string;
  vs: string;
  current: number[]; // ₹ lakh per point
  previous: number[];
  points: string[]; // tooltip label per point
  axis: [string, string, string];
  stats: { label: string; value: number; money?: boolean; change: string; up: boolean }[];
  cities: { name: string; value: number; share: number }[];
};

const weeks = Array.from({ length: 13 }, (_, i) => `Week ${i + 1}`);
const days = Array.from({ length: 13 }, (_, i) => `Sep ${1 + Math.round(i * 2.42)}`);
const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map(
  (m, i) => `${m} ${i < 3 ? 2025 : 2026}`
);

const DATA: Record<Range, Dataset> = {
  Month: {
    title: "September 2026 revenue",
    vs: "vs Aug",
    current: [1.1, 1.3, 1.2, 1.5, 1.4, 1.3, 1.6, 1.5, 1.7, 1.6, 1.8, 1.7, 1.9],
    previous: [1.0, 1.1, 1.2, 1.1, 1.3, 1.2, 1.3, 1.4, 1.3, 1.4, 1.5, 1.4, 1.5],
    points: days,
    axis: ["Sep 1", "Sep 15", "Sep 30"],
    stats: [
      { label: "Revenue", value: 1736800, money: true, change: "+8.2% vs Aug", up: true },
      { label: "Orders", value: 452, change: "+31 vs Aug", up: true },
      { label: "Avg order", value: 3842, money: true, change: "−0.6% vs Aug", up: false },
      { label: "Repeat buyers", value: 151, change: "+4.0% vs Aug", up: true },
    ],
    cities: [
      { name: "Ahmedabad", value: 642600, share: 37 },
      { name: "Surat", value: 382100, share: 22 },
      { name: "Vadodara", value: 295300, share: 17 },
      { name: "Rajkot", value: 208400, share: 12 },
    ],
  },
  Quarter: {
    title: "Q3 2026 revenue",
    vs: "vs Q2",
    current: [3.1, 3.4, 3.2, 3.6, 3.5, 3.9, 3.7, 4.0, 4.2, 3.9, 4.4, 4.6, 4.7],
    previous: [3.0, 2.9, 3.1, 3.2, 3.0, 3.3, 3.4, 3.2, 3.5, 3.4, 3.6, 3.5, 3.7],
    points: weeks,
    axis: ["Jul", "Aug", "Sep"],
    stats: [
      { label: "Revenue", value: 5020400, money: true, change: "+17.3% vs Q2", up: true },
      { label: "Orders", value: 1284, change: "+86 vs Q2", up: true },
      { label: "Avg order", value: 3910, money: true, change: "−1.8% vs Q2", up: false },
      { label: "Repeat buyers", value: 412, change: "+9.1% vs Q2", up: true },
    ],
    cities: [
      { name: "Ahmedabad", value: 1840200, share: 37 },
      { name: "Surat", value: 1105000, share: 22 },
      { name: "Vadodara", value: 852300, share: 17 },
      { name: "Rajkot", value: 602100, share: 12 },
    ],
  },
  Year: {
    title: "Revenue, last 12 months",
    vs: "vs last year",
    current: [11.2, 12.4, 14.8, 12.1, 11.6, 13.0, 13.9, 14.4, 13.1, 14.7, 16.2, 17.4, 18.1],
    previous: [9.4, 10.1, 12.2, 10.0, 9.8, 10.6, 11.3, 11.0, 10.9, 11.8, 12.6, 13.1, 13.9],
    points: months,
    axis: ["Oct 2025", "Apr 2026", "Oct 2026"],
    stats: [
      { label: "Revenue", value: 18240000, money: true, change: "+24.6% vs last year", up: true },
      { label: "Orders", value: 4710, change: "+802 vs last year", up: true },
      { label: "Avg order", value: 3873, money: true, change: "+2.3% vs last year", up: true },
      { label: "Repeat buyers", value: 1388, change: "+18.4% vs last year", up: true },
    ],
    cities: [
      { name: "Ahmedabad", value: 6748800, share: 37 },
      { name: "Surat", value: 4012800, share: 22 },
      { name: "Vadodara", value: 3100800, share: 17 },
      { name: "Rajkot", value: 2188800, share: 12 },
    ],
  },
};

const SIDEBAR = [
  { icon: LayoutGrid, label: "Overview" },
  { icon: Package, label: "Orders" },
  { icon: BarChart3, label: "Reports", active: true },
  { icon: Users, label: "Customers" },
  { icon: Settings, label: "Settings" },
];

const inr = new Intl.NumberFormat("en-IN");

/* ─── Chart geometry ─── */
const W = 720;
const H = 200;

function scaleFor(d: Dataset) {
  const all = [...d.current, ...d.previous];
  const min = Math.min(...all) * 0.9;
  const max = Math.max(...all) * 1.04;
  return (data: number[]) =>
    data.map((v, i) => [(i / (data.length - 1)) * W, H - ((v - min) / (max - min)) * H] as const);
}

/** Smooth path through points (Catmull-Rom converted to cubic Béziers). */
function smooth(points: ReadonlyArray<readonly [number, number]>) {
  let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function geometry(d: Dataset) {
  const s = scaleFor(d);
  const cur = s(d.current);
  const line = smooth(cur);
  return {
    cur,
    line,
    prev: smooth(s(d.previous)),
    area: `${line} L ${W} ${H} L 0 ${H} Z`,
  };
}

const INITIAL: Range = "Quarter";
const initialGeo = geometry(DATA[INITIAL]);

export default function ReportWindow() {
  const root = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const prevRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [range, setRange] = useState<Range>(INITIAL);
  const [hover, setHover] = useState<number | null>(null);
  const geo = useRef(initialGeo);
  const first = useRef(true);
  const prevRange = useRef<Range>(INITIAL);
  const data = DATA[range];

  // Draw in once when the window scrolls into view
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const len = lineRef.current!.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set([areaRef.current, dotRef.current], { opacity: 0 });
        gsap.set("[data-bar]", { scaleX: 0, transformOrigin: "left center" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
          onComplete: () => {
            gsap.set(lineRef.current, { clearProps: "strokeDasharray,strokeDashoffset" });
          },
        });
        tl.to(lineRef.current, { strokeDashoffset: 0, duration: 1.3 })
          .to(areaRef.current, { opacity: 1, duration: 0.5 }, 0.7)
          .to(dotRef.current, { opacity: 1, duration: 0.3 }, 1.2)
          .to("[data-bar]", { scaleX: 1, duration: 0.6, stagger: 0.06 }, 0.3);
      });
    },
    { scope: root }
  );

  // Switching range morphs the chart and tweens the figures
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const next = geometry(DATA[range]);
    geo.current = next;
    const last = next.cur[next.cur.length - 1];
    const motion = window.matchMedia(MOTION_OK).matches;
    const dur = motion ? 0.6 : 0;
    gsap.to(lineRef.current, { attr: { d: next.line }, duration: dur });
    gsap.to(areaRef.current, { attr: { d: next.area }, duration: dur });
    gsap.to(prevRef.current, { attr: { d: next.prev }, duration: dur });
    gsap.to(dotRef.current, { attr: { cx: last[0], cy: last[1] }, duration: dur });

    const before = DATA[prevRange.current].stats;
    prevRange.current = range;
    root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
      const to = Number(el.dataset.count);
      const obj = { v: before[i]?.value ?? to };
      gsap.to(obj, {
        v: to,
        duration: dur,
        onUpdate: () => {
          el.textContent = inr.format(Math.round(obj.v));
        },
      });
    });
  }, [range]);

  const onMove = (e: React.MouseEvent<SVGRectElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * W;
    setHover(Math.max(0, Math.min(12, Math.round((x / W) * 12))));
  };

  const hp = hover !== null ? geo.current.cur[hover] : null;
  const initialLast = initialGeo.cur[initialGeo.cur.length - 1];

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-[20px] border border-line-strong bg-bg-deep shadow-window"
    >
      <div className="flex h-11 items-center gap-2 border-b border-line px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-raised" />
        <span className="ml-3 font-mono text-meta text-ink-muted">reports / revenue</span>
        <span className="ml-auto font-mono text-[11px] text-ink-muted">sample data</span>
      </div>

      <div className="flex">
        <aside className="hidden w-48 shrink-0 flex-col gap-0.5 border-r border-line p-3 md:flex">
          {SIDEBAR.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={
                active
                  ? "flex h-9 items-center gap-2.5 rounded-lg bg-surface-raised px-2.5 text-sm text-ink shadow-top-hl"
                  : "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm text-ink-muted"
              }
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </div>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-4 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-base font-medium text-ink">{data.title}</p>
            <div className="flex rounded-lg border border-line p-0.5 text-[12px]" role="tablist">
              {(Object.keys(DATA) as Range[]).map((r) => (
                <button
                  key={r}
                  role="tab"
                  aria-selected={range === r}
                  onClick={() => setRange(r)}
                  className={cn(
                    "rounded-md px-2.5 py-1 transition-colors duration-150",
                    range === r ? "bg-surface-raised text-ink shadow-top-hl" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {data.stats.map((s) => (
              <div key={s.label} className="min-w-0 rounded-xl border border-line bg-surface p-3 md:p-4">
                <p className="text-[12px] text-ink-muted">{s.label}</p>
                <p className="mt-1 truncate text-base font-medium tabular-nums text-ink md:text-xl">
                  {s.money && "₹"}
                  <span data-count={s.value}>{inr.format(s.value)}</span>
                </p>
                <p
                  className={cn(
                    "mt-1 truncate text-[12px] tabular-nums",
                    s.up ? "text-positive" : "text-negative"
                  )}
                >
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
            <div className="rounded-xl border border-line bg-surface p-3 md:p-4">
              <div className="mb-3 flex items-center gap-4 text-[12px] text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 rounded bg-accent" /> Current
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 rounded bg-ink-muted/60" /> Previous
                </span>
                <span className="ml-auto hidden font-mono sm:inline">hover the chart</span>
              </div>

              <div className="relative">
                <svg viewBox={`-4 -10 ${W + 8} ${H + 20}`} className="h-auto w-full" aria-label="Revenue chart">
                  <defs>
                    <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f2a33a" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#f2a33a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="0" x2={W} y1={(H / 3) * i} y2={(H / 3) * i} stroke="rgba(238,240,245,0.06)" />
                  ))}
                  <path
                    ref={prevRef}
                    d={initialGeo.prev}
                    fill="none"
                    stroke="rgba(122,130,150,0.6)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <path ref={areaRef} d={initialGeo.area} fill="url(#area)" />
                  <path
                    ref={lineRef}
                    d={initialGeo.line}
                    fill="none"
                    stroke="#f2a33a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle ref={dotRef} cx={initialLast[0]} cy={initialLast[1]} r="5" fill="#f2a33a" />
                  {hp && (
                    <g pointerEvents="none">
                      <line x1={hp[0]} x2={hp[0]} y1="-10" y2={H} stroke="rgba(238,240,245,0.25)" />
                      <circle cx={hp[0]} cy={hp[1]} r="6" fill="#07080d" stroke="#f2a33a" strokeWidth="2.5" />
                    </g>
                  )}
                  <rect
                    x="0"
                    y="-10"
                    width={W}
                    height={H + 20}
                    fill="transparent"
                    onMouseMove={onMove}
                    onMouseLeave={() => setHover(null)}
                  />
                </svg>

                {hp && hover !== null && (
                  <div
                    className="pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-line-strong bg-surface-raised px-2.5 py-1.5 text-[12px] shadow-window"
                    style={{
                      left: `${Math.min(88, Math.max(12, (hp[0] / W) * 100))}%`,
                      top: `${((hp[1] + 10) / (H + 20)) * 100}%`,
                      marginTop: -10,
                    }}
                  >
                    <span className="text-ink-muted">{data.points[hover]}</span>{" "}
                    <span className="tabular-nums text-ink">₹{data.current[hover].toFixed(1)}L</span>
                  </div>
                )}
              </div>

              <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-muted">
                {data.axis.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>

            <div className="hidden rounded-xl border border-line bg-surface p-4 lg:block">
              <p className="mb-4 text-[12px] text-ink-muted">Revenue by city</p>
              <div className="space-y-4">
                {data.cities.map((c) => (
                  <div key={c.name} className="text-[13px]">
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-ink-secondary">{c.name}</span>
                      <span className="tabular-nums text-ink-muted">₹{inr.format(c.value)}</span>
                    </div>
                    <span className="block h-1 overflow-hidden rounded-full bg-surface-raised">
                      <span
                        data-bar
                        className="block h-full rounded-full bg-ink-muted"
                        style={{ width: `${c.share * 2.5}%` }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
