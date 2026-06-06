"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Database, Wrench, Layers, Sparkles } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import SpotlightCard from "@/components/ui/SpotlightCard";

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/* ─── Marquee rows ─── */
const ROW1 = [
  { name: "Angular", icon: `${BASE}/angularjs/angularjs-original.svg` },
  { name: "React.js", icon: `${BASE}/react/react-original.svg` },
  { name: "Next.js", icon: `${BASE}/nextjs/nextjs-original.svg`, color: "white" },
  { name: "TypeScript", icon: `${BASE}/typescript/typescript-original.svg` },
  { name: "JavaScript", icon: `${BASE}/javascript/javascript-original.svg` },
  { name: "HTML5", icon: `${BASE}/html5/html5-original.svg` },
  { name: "CSS3", icon: `${BASE}/css3/css3-original.svg` },
  { name: "Tailwind CSS", icon: `${BASE}/tailwindcss/tailwindcss-original.svg` },
  { name: "Bootstrap", icon: `${BASE}/bootstrap/bootstrap-original.svg` },
];

const ROW2 = [
  { name: "Node.js", icon: `${BASE}/nodejs/nodejs-original.svg` },
  { name: "Express.js", icon: `${BASE}/express/express-original.svg`, color: "white" },
  { name: "MongoDB", icon: `${BASE}/mongodb/mongodb-original.svg` },
  { name: "Git", icon: `${BASE}/git/git-original.svg` },
  { name: "GitHub", icon: `${BASE}/github/github-original.svg`, color: "white" },
  { name: "GitLab", icon: `${BASE}/gitlab/gitlab-original.svg` },
  { name: "Postman", icon: `${BASE}/postman/postman-original.svg` },
  { name: "REST APIs", color: "#8b5cf6" },
  { name: "JWT Auth", color: "#e879f9" },
];

/* ─── Category grid ─── */
const categories = [
  {
    icon: Monitor, label: "Frontend", color: "text-blue-400",
    bg: "from-blue-500/10 to-sky-500/5 border-blue-500/15",
    skills: ["Angular", "React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    badgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  {
    icon: Server, label: "Backend", color: "text-green-400",
    bg: "from-green-500/10 to-emerald-500/5 border-green-500/15",
    skills: ["Node.js", "Express.js"],
    badgeClass: "bg-green-500/10 text-green-300 border-green-500/20",
  },
  {
    icon: Database, label: "Database", color: "text-yellow-400",
    bg: "from-yellow-500/10 to-orange-500/5 border-yellow-500/15",
    skills: ["MongoDB"],
    badgeClass: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  },
  {
    icon: Wrench, label: "Tools & DevOps", color: "text-slate-400",
    bg: "from-slate-500/10 to-zinc-500/5 border-slate-500/15",
    skills: ["Git", "GitHub", "GitLab", "Postman"],
    badgeClass: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  },
  {
    icon: Layers, label: "Concepts", color: "text-violet-400",
    bg: "from-violet-500/10 to-purple-500/5 border-violet-500/15",
    skills: ["REST APIs", "JWT Authentication", "Agile Development", "Debugging", "Problem Solving"],
    badgeClass: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  },
  {
    icon: Sparkles, label: "AI & Emerging", color: "text-pink-400",
    bg: "from-pink-500/10 to-rose-500/5 border-pink-500/15",
    skills: ["AI-Assisted Development", "Prompt Engineering", "Gemini API"],
    badgeClass: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.8), transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Skills"
          title="What I Work With"
          description="A full-stack toolkit spanning Angular, Node.js, and the modern web ecosystem."
        />

        {/* ── Dual Infinite Marquee ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="space-y-3 mb-14"
        >
          <InfiniteMarquee items={ROW1} direction="left" speed={40} />
          <InfiniteMarquee items={ROW2} direction="right" speed={45} />
        </motion.div>

        {/* ── Category Cards Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <SpotlightCard
                  className={`h-full bg-gradient-to-br border ${cat.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
                  spotlightColor="rgba(255,255,255,0.05)"
                  borderOnHover={false}
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg bg-bg/60 flex items-center justify-center ${cat.color}`}>
                        <Icon size={16} />
                      </div>
                      <h3 className="text-sm font-semibold text-ink">{cat.label}</h3>
                      <span className="ml-auto text-xs text-ink-subtle">{cat.skills.length}</span>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, si) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ delay: i * 0.06 + si * 0.03 }}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 cursor-default hover:scale-105 ${cat.badgeClass}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-ink-subtle mt-10"
        >
          Continuously learning · Currently exploring AI integration in web development workflows
        </motion.p>
      </div>
    </section>
  );
}
