"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CornerDownLeft } from "lucide-react";
import PixelImage from "@/components/ui/PixelImage";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { ENDPOINTS, ENDPOINT_NAMES, notFound, responseTime, type Json } from "@/data/api";
import { siteConfig } from "@/data/portfolio";

/* ─── JSON → coloured lines ─── */
type Tok = { t: string; c?: string; href?: string };
type Line = Tok[];

const PUNCT = "text-ink-muted";
const isUrl = (s: string) => /^https?:\/\//.test(s);
const isEmail = (s: string) => /^[^@\s]+@[^@\s]+\.[a-z]+$/i.test(s);

function valueTok(v: Json): Tok {
  if (typeof v === "string") {
    const href = isUrl(v) ? v : isEmail(v) ? `mailto:${v}` : undefined;
    return { t: JSON.stringify(v), c: "text-accent", href };
  }
  if (v === null) return { t: "null", c: PUNCT };
  return { t: String(v), c: "text-positive" };
}

function toLines(v: Json, ind = 0, key: string | null = null, comma = false, out: Line[] = []) {
  const pad: Tok = { t: "  ".repeat(ind) };
  const keyToks: Tok[] =
    key !== null ? [{ t: `"${key}"`, c: "text-ink" }, { t: ": ", c: PUNCT }] : [];
  const end: Tok[] = comma ? [{ t: ",", c: PUNCT }] : [];

  if (v !== null && typeof v === "object") {
    const isArr = Array.isArray(v);
    const entries: [string | null, Json][] = isArr
      ? (v as Json[]).map((x) => [null, x])
      : Object.entries(v);

    // Short arrays of plain values stay on one line
    const flat = isArr && entries.every(([, x]) => x === null || typeof x !== "object");
    if (flat && JSON.stringify(v).length + ind * 2 + (key?.length ?? 0) < 40) {
      const items: Tok[] = [];
      entries.forEach(([, x], i) => {
        items.push(valueTok(x));
        if (i < entries.length - 1) items.push({ t: ", ", c: PUNCT });
      });
      out.push([pad, ...keyToks, { t: "[", c: PUNCT }, ...items, { t: "]", c: PUNCT }, ...end]);
      return out;
    }

    out.push([pad, ...keyToks, { t: isArr ? "[" : "{", c: PUNCT }]);
    entries.forEach(([k, x], i) => toLines(x, ind + 1, k, i < entries.length - 1, out));
    out.push([pad, { t: isArr ? "]" : "}", c: PUNCT }, ...end]);
    return out;
  }

  out.push([pad, ...keyToks, valueTok(v), ...end]);
  return out;
}

const normalize = (raw: string) => {
  let p = raw.trim().toLowerCase().replace(/^\/*/, "/").replace(/\/+$/, "");
  if (p === "") p = "/";
  return p;
};

type Res = { path: string; status: number; time: number; size: number; lines: Line[] };

function respond(path: string): Res {
  const body = ENDPOINTS[path] ?? notFound(path);
  const text = JSON.stringify(body, null, 2);
  return {
    path,
    status: path in ENDPOINTS ? 200 : 404,
    time: responseTime(path),
    size: new Blob([text]).size,
    lines: toLines(body),
  };
}

export default function ApiConsole() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Res | null>(null);
  const [run, setRun] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  const timeEl = useRef<HTMLSpanElement>(null);
  const motion = useRef(true);
  const started = useRef(false);

  const send = useCallback((raw: string) => {
    const path = normalize(raw);
    setInput(path);
    setLoading(true);
    const delay = motion.current ? 380 : 0;
    window.setTimeout(() => {
      setRes(respond(path));
      setRun((r) => r + 1);
      setLoading(false);
    }, delay);
  }, []);

  // Animate the response in: lines arrive top to bottom, time counts up
  useEffect(() => {
    if (!res || !motion.current) return;
    const lines = body.current?.querySelectorAll("[data-line]");
    if (lines?.length) {
      gsap.fromTo(
        lines,
        { autoAlpha: 0, x: -6 },
        { autoAlpha: 1, x: 0, duration: 0.3, stagger: Math.min(0.025, 0.6 / lines.length) }
      );
    }
    const t = { v: 0 };
    gsap.to(t, {
      v: res.time,
      duration: 0.5,
      onUpdate: () => {
        if (timeEl.current) timeEl.current.textContent = String(Math.round(t.v));
      },
    });
  }, [res, run]);

  // First visit: type "/me" into the bar and send it
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    motion.current = window.matchMedia(MOTION_OK).matches;
    if (!motion.current) {
      send("/me");
      return;
    }
    const target = "/me";
    const timers: number[] = [];
    [...target].forEach((_, i) =>
      timers.push(window.setTimeout(() => setInput(target.slice(0, i + 1)), 900 + i * 110))
    );
    timers.push(window.setTimeout(() => send(target), 900 + target.length * 110 + 200));
    return () => timers.forEach(clearTimeout);
  }, [send]);

  const ok = res?.status === 200;
  const showPhoto = Boolean(siteConfig.photo) && res?.path === "/me";

  return (
    <div className="overflow-hidden rounded-[20px] border border-line-strong bg-bg-deep shadow-window">
      {/* Request bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input || "/");
        }}
        className="flex items-center gap-2 border-b border-line p-2.5 md:gap-3 md:p-3"
      >
        <span className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[12px] font-medium text-accent">
          GET
        </span>
        <label className="flex min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-3 font-mono text-[13px] focus-within:border-line-strong">
          <span className="hidden shrink-0 text-ink-muted sm:inline">api.vishalrohera.tech/v1</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Endpoint path"
            placeholder="/me"
            className="h-9 min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-muted"
          />
        </label>
        <button type="submit" className="btn-primary h-9 shrink-0 px-3.5 md:px-4">
          Send
          <CornerDownLeft size={14} strokeWidth={1.5} className="hidden sm:block" />
        </button>
      </form>

      {/* Endpoint tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-line px-2.5 py-2 md:px-3">
        {ENDPOINT_NAMES.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className={cn(
              "shrink-0 rounded-md px-2.5 py-1 font-mono text-[12px] transition-colors duration-150",
              res?.path === p
                ? "bg-surface-raised text-ink shadow-top-hl"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {p}
          </button>
        ))}
        <span className="ml-auto hidden shrink-0 self-center pr-1 font-mono text-[11px] text-ink-muted md:block">
          or type any path
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_220px]">
        {/* Response body */}
        <div className="relative min-h-[300px] md:min-h-[340px]">
          {loading && (
            <span className="absolute inset-x-0 top-0 h-px overflow-hidden">
              <span className="block h-full w-1/3 animate-[load_0.8s_linear_infinite] bg-accent" />
            </span>
          )}
          {showPhoto && (
            <div className="flex items-center gap-3 border-b border-line p-4 md:hidden">
              <PixelImage
                src={siteConfig.photo!}
                alt={siteConfig.name}
                run={run}
                animate={motion.current}
                focus={siteConfig.photoFocus}
                zoom={siteConfig.photoZoom}
                className="w-14 shrink-0"
              />
              <p className="font-mono text-[12px] text-ink-muted">
                avatar.jpg · <span className="text-positive">200 OK</span>
              </p>
            </div>
          )}
          <div
            ref={body}
            className={cn(
              "p-4 font-mono text-[12px] leading-[1.7] transition-opacity duration-150 md:p-5 md:text-[13px]",
              loading && "opacity-40"
            )}
          >
            {res?.lines.map((line, i) => (
              <div key={`${run}-${i}`} data-line className="flex">
                <span className="mr-4 inline-block w-5 shrink-0 select-none text-right text-ink-muted/50">
                  {i + 1}
                </span>
                <span className="min-w-0 whitespace-pre-wrap break-words">
                  {line.map((tok, j) =>
                    tok.href ? (
                      <a
                        key={j}
                        href={tok.href}
                        target={tok.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className={cn(tok.c, "underline decoration-accent/30 underline-offset-2 hover:decoration-accent")}
                      >
                        {tok.t}
                      </a>
                    ) : (
                      <span key={j} className={tok.c}>
                        {tok.t}
                      </span>
                    )
                  )}
                </span>
              </div>
            ))}
            {!res && !loading && <p className="text-ink-muted">Waiting for a request</p>}
          </div>
        </div>

        {/* Response meta */}
        <aside className="hidden border-l border-line p-5 md:block">
          {showPhoto && (
            <div className="mb-5">
              <PixelImage
                src={siteConfig.photo!}
                alt={siteConfig.name}
                run={run}
                animate={motion.current}
                focus={siteConfig.photoFocus}
                zoom={siteConfig.photoZoom}
              />
              <p className="mt-2 font-mono text-[11px] text-ink-muted">avatar.jpg · image/jpeg</p>
            </div>
          )}
          <dl className="space-y-3 font-mono text-[12px]">
            <div>
              <dt className="text-ink-muted">Status</dt>
              <dd className={cn("mt-0.5", res ? (ok ? "text-positive" : "text-negative") : "text-ink-muted")}>
                {res ? `${res.status} ${ok ? "OK" : "Not Found"}` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">Time</dt>
              <dd className="mt-0.5 tabular-nums text-ink">
                <span ref={timeEl}>{res?.time ?? 0}</span> ms
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">Size</dt>
              <dd className="mt-0.5 tabular-nums text-ink">{res ? `${res.size} B` : "—"}</dd>
            </div>
          </dl>
          <div className="mt-5 space-y-1 border-t border-line pt-4 font-mono text-[11px] leading-5 text-ink-muted">
            <p>content-type: application/json</p>
            <p>x-based-in: Ahmedabad</p>
            <p>
              x-available: <span className="text-positive">true</span>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
