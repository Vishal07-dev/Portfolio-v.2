"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/portfolio";
import { scrollToId } from "@/lib/gsap";
import { openPalette } from "@/components/ui/CommandPalette";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href.slice(1));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ease-out",
        scrolled || open
          ? "border-line bg-bg/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="page-x flex h-16 items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            scrollToId("hero");
          }}
          className="text-base font-medium text-ink"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors duration-150 ease-out",
                  isActive
                    ? "bg-surface-raised text-ink shadow-top-hl"
                    : "text-ink-secondary hover:text-ink"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="hidden h-9 items-center gap-3 rounded-[10px] border border-line px-3 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink lg:inline-flex"
            aria-label="Open command palette"
          >
            Jump to
            <kbd className="rounded border border-line-strong bg-surface-raised px-1.5 font-mono text-[11px] text-ink-secondary">
              /
            </kbd>
          </button>
          <a
            href={siteConfig.resumeUrl}
            download
            className="btn-secondary hidden h-9 px-4 md:inline-flex"
          >
            Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-secondary transition-colors hover:bg-surface-raised hover:text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu: fades and drops a few pixels from the header */}
      <div
        className={cn(
          "absolute inset-x-0 top-16 border-t border-line bg-bg transition-[opacity,transform,visibility] duration-200 ease-out md:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        )}
      >
        <nav className="page-x flex flex-col gap-1 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className={cn(
                "flex h-11 items-center rounded-lg px-3 text-base transition-colors",
                active === link.href.slice(1)
                  ? "bg-surface-raised text-ink"
                  : "text-ink-secondary hover:text-ink"
              )}
            >
              {link.label}
            </a>
          ))}
          <a href={siteConfig.resumeUrl} download className="btn-secondary mt-3 w-full">
            Download resume
          </a>
        </nav>
      </div>
    </header>
  );
}
