import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-bold text-xs">
              VR
            </div>
            <span className="text-sm text-ink-muted">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface transition-colors"
            >
              <Mail size={16} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface transition-colors"
            >
              <Github size={16} />
            </a>
          </div>

          <span className="text-xs text-ink-subtle">
            © {currentYear} · All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
