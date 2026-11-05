"use client";

import { useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, CornerDownLeft } from "lucide-react";
import { useReveal } from "@/components/ui/useReveal";
import { scrollToId } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/portfolio";

/** Web3Forms access key (public by design). Set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local and on the host. */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const LINKS = [
  { label: "LinkedIn", detail: "vishal-rohera", href: siteConfig.linkedin, external: true },
  { label: "GitHub", detail: "Vishal07-dev", href: siteConfig.github, external: true },
  { label: "Resume", detail: "Download PDF", href: siteConfig.resumeUrl, external: false },
];

function JsonField({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div className="whitespace-pre-wrap break-words pl-4">
      <span className="text-ink">&quot;{k}&quot;</span>
      <span className="text-ink-muted">: </span>
      {v ? (
        <span className="text-accent">{JSON.stringify(v)}</span>
      ) : (
        <span className="text-ink-muted/60">&quot;…&quot;</span>
      )}
      {!last && <span className="text-ink-muted">,</span>}
    </div>
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  useReveal(root);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (status === "sent" || status === "error") setStatus("idle");
  };

  const ready = Boolean(form.name.trim() && form.message.trim()) && status !== "sending";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    // Bots fill the hidden field; people never see it
    if (honeypot.current?.checked) return;

    const name = form.name.trim();
    const subject = `Portfolio message from ${name}`;

    // Without a Web3Forms key, fall back to the visitor's email app
    if (!WEB3FORMS_KEY) {
      const body = `${form.message.trim()}\n\n${name}${form.email ? `\n${form.email.trim()}` : ""}`;
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "vishalrohera.tech",
          name,
          email: form.email.trim() || undefined,
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || "Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const field =
    "w-full rounded-lg border border-line bg-surface px-3 text-[15px] text-ink outline-none transition-colors duration-150 placeholder:text-ink-muted focus:border-line-strong";

  return (
    <section id="contact" ref={root} className="section-y border-t border-line">
      <div className="page-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Heading and direct links */}
          <div data-reveal-group>
            <p data-reveal className="mb-5 font-mono text-meta text-ink-muted">
              <span className="text-accent">POST</span> <span data-scramble>/contact</span>
            </p>
            <h2
              data-reveal
              className="text-[40px] font-medium leading-[0.98] tracking-[-0.04em] text-ink md:text-6xl lg:text-[72px]"
            >
              Write to me
            </h2>
            <p data-reveal className="mt-6 max-w-[30rem] text-lg leading-[1.6] text-ink-secondary">
              Hiring an Angular or Node developer, or need one for a project? Send a request and it
              lands straight in my inbox.
            </p>

            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-lg text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
              >
                {siteConfig.email}
              </a>
              <button onClick={copy} className="btn-secondary h-9 px-3" aria-label="Copy email address">
                {copied ? (
                  <Check size={16} strokeWidth={1.5} className="text-positive" />
                ) : (
                  <Copy size={16} strokeWidth={1.5} />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div data-reveal className="mt-10 divide-y divide-line border-y border-line">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-base text-ink">{l.label}</span>
                    <span className="font-mono text-meta text-ink-muted">{l.detail}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-ink-muted transition-[color,transform] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Request composer */}
          <form
            data-reveal-group
            onSubmit={submit}
            className="overflow-hidden rounded-[20px] border border-line-strong bg-bg-deep shadow-window"
          >
            <div data-reveal className="flex items-center gap-2 border-b border-line p-3">
              <span className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[12px] font-medium text-accent">
                POST
              </span>
              <span className="truncate font-mono text-[13px] text-ink-muted">
                api.vishalrohera.tech/v1<span className="text-ink">/contact</span>
              </span>
            </div>

            <input
              ref={honeypot}
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <div data-reveal className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:p-5">
              <label className="block">
                <span className="mb-1.5 block font-mono text-[12px] text-ink-muted">name</span>
                <input value={form.name} onChange={set("name")} required className={cn(field, "h-11")} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[12px] text-ink-muted">email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  className={cn(field, "h-11")}
                  placeholder="So I can reply"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block font-mono text-[12px] text-ink-muted">message</span>
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  required
                  rows={4}
                  className={cn(field, "resize-none py-2.5")}
                  placeholder="What are you building?"
                />
              </label>
            </div>

            {/* Live body preview */}
            <div data-reveal className="border-t border-line bg-surface/40 p-4 font-mono text-[12px] leading-[1.7] md:p-5 md:text-[13px]">
              <p className="mb-1 text-ink-muted">body</p>
              <span className="text-ink-muted">{"{"}</span>
              <JsonField k="name" v={form.name} />
              <JsonField k="email" v={form.email} />
              <JsonField k="message" v={form.message} last />
              <span className="text-ink-muted">{"}"}</span>
            </div>

            <div data-reveal className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4 md:p-5">
              <p className="font-mono text-[12px] text-ink-muted">
                {status === "sending" ? (
                  "sending…"
                ) : status === "sent" ? (
                  <>
                    <span className="text-positive">200 OK</span> · delivered, I&apos;ll reply soon
                  </>
                ) : status === "error" ? (
                  <>
                    <span className="text-negative">500</span> · didn&apos;t go through, email me directly
                  </>
                ) : ready ? (
                  "ready to send"
                ) : (
                  "name and message are required"
                )}
              </p>
              <button type="submit" disabled={!ready} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
                {status === "sending" ? "Sending" : "Send request"}
                <CornerDownLeft size={14} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-6 text-sm text-ink-muted md:mt-32 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span className="hidden font-mono text-meta md:inline">
            Press <kbd className="rounded border border-line-strong bg-surface-raised px-1.5 py-0.5 text-ink">/</kbd> to jump anywhere
          </span>
          <button
            onClick={() => scrollToId("hero")}
            className="inline-flex items-center gap-1.5 self-start transition-colors hover:text-ink md:self-auto"
          >
            Back to top <ArrowUp size={14} strokeWidth={1.5} />
          </button>
        </footer>
      </div>
    </section>
  );
}
