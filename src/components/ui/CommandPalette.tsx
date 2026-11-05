"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Copy, Download, Github, Linkedin, Search } from "lucide-react";
import { scrollToId } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/portfolio";

type Cmd = { id: string; label: string; hint: string; icon: typeof ArrowRight; run: () => void };

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const commands: Cmd[] = useMemo(() => {
    const go = (id: string) => () => scrollToId(id);
    return [
      { id: "about", label: "About", hint: "GET /about", icon: ArrowRight, run: go("about") },
      { id: "experience", label: "Experience", hint: "GET /experience", icon: ArrowRight, run: go("experience") },
      { id: "skills", label: "Skills", hint: "GET /skills", icon: ArrowRight, run: go("skills") },
      { id: "projects", label: "Projects", hint: "GET /projects", icon: ArrowRight, run: go("projects") },
      { id: "writing", label: "Writing", hint: "GET /writing", icon: ArrowRight, run: go("publications") },
      { id: "contact", label: "Contact", hint: "POST /contact", icon: ArrowRight, run: go("contact") },
      {
        id: "copy",
        label: "Copy email address",
        hint: siteConfig.email,
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(siteConfig.email).then(
            () => flash("Email copied"),
            () => flash(siteConfig.email)
          );
        },
      },
      {
        id: "resume",
        label: "Download resume",
        hint: "PDF",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = siteConfig.resumeUrl;
          a.download = "";
          a.click();
        },
      },
      { id: "github", label: "Open GitHub", hint: "Vishal07-dev", icon: Github, run: () => window.open(siteConfig.github, "_blank", "noopener") },
      { id: "linkedin", label: "Open LinkedIn", hint: "vishal-rohera", icon: Linkedin, run: () => window.open(siteConfig.linkedin, "_blank", "noopener") },
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(q));
  }, [commands, query]);

  const choose = (c: Cmd | undefined) => {
    if (!c) return;
    close();
    // Let the dialog close before scrolling
    setTimeout(c.run, 60);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !open)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      lenis()?.stop();
      setTimeout(() => input.current?.focus(), 20);
    } else lenis()?.start();
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] flex items-start justify-center bg-bg-deep/70 px-4 pt-[14vh] backdrop-blur-sm transition-[opacity,visibility] duration-200 ease-out",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        onMouseDown={(e) => e.target === e.currentTarget && close()}
        aria-hidden={!open}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className={cn(
            "w-full max-w-[560px] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-window transition-transform duration-200 ease-out",
            open ? "translate-y-0 scale-100" : "-translate-y-1 scale-[0.98]"
          )}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIndex((i) => Math.min(results.length - 1, i + 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setIndex((i) => Math.max(0, i - 1));
            }
            if (e.key === "Enter") {
              e.preventDefault();
              choose(results[index]);
            }
          }}
        >
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search size={16} strokeWidth={1.5} className="text-ink-muted" />
            <input
              ref={input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Jump to a section or run an action"
              className="h-12 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-muted"
              aria-label="Search commands"
            />
            <kbd className="rounded border border-line-strong bg-surface-raised px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
              esc
            </kbd>
          </div>
          <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
            {results.map((c, i) => {
              const Icon = c.icon;
              return (
                <li key={c.id} role="option" aria-selected={i === index}>
                  <button
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => choose(c)}
                    className={cn(
                      "flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[15px] transition-colors duration-100",
                      i === index ? "bg-surface-raised text-ink shadow-top-hl" : "text-ink-secondary"
                    )}
                  >
                    <Icon size={16} strokeWidth={1.5} className="text-ink-muted" />
                    <span className="flex-1">{c.label}</span>
                    <span className="truncate font-mono text-[12px] text-ink-muted">{c.hint}</span>
                  </button>
                </li>
              );
            })}
            {!results.length && (
              <li className="px-3 py-6 text-center font-mono text-[12px] text-ink-muted">
                404 · nothing matches “{query}”
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Small confirmation for actions */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-lg border border-line-strong bg-surface-raised px-3 py-2 font-mono text-[12px] text-ink shadow-window transition-[opacity,transform] duration-200 ease-out",
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        )}
        role="status"
      >
        {toast}
      </div>
    </>
  );
}
