import {
  aboutData,
  experienceData,
  projectsData,
  siteConfig,
  skillsData,
} from "@/data/portfolio";

/**
 * The portfolio as an API. Every response is built from the real data in
 * portfolio.ts, so the console never says anything the rest of the site doesn't.
 */
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const stack = Object.fromEntries(
  skillsData
    .filter((c) => c.category !== "Concepts")
    .map((c) => [c.category.toLowerCase().replace(/ & /g, "_").replace(/\s+/g, "_"), c.skills])
);

export const ENDPOINTS: Record<string, Json> = {
  "/me": {
    name: siteConfig.name,
    role: "MEAN stack developer",
    location: "Ahmedabad, India",
    company: experienceData.company,
    since: "2025-01",
    education: "BCA, Silver Oak University",
    open_to: ["full-time", "freelance", "hybrid", "remote"],
    available: true,
  },
  "/stack": stack,
  "/experience": {
    company: experienceData.company,
    role: experienceData.role,
    period: experienceData.duration,
    builds: [
      "enterprise Angular applications",
      "dashboards and reporting modules",
      "Node.js and Express APIs",
      "MongoDB schemas and queries",
    ],
    tools: experienceData.technologies,
  },
  "/projects": projectsData.map((p) => ({
    title: p.title,
    role: p.role.split(".")[0],
    stack: p.tech,
    live: p.liveUrl,
  })),
  "/contact": {
    email: siteConfig.email,
    linkedin: siteConfig.linkedin,
    github: siteConfig.github,
    resume: "https://vishalrohera.tech" + siteConfig.resumeUrl,
  },
};

export const ENDPOINT_NAMES = Object.keys(ENDPOINTS);

export const notFound = (path: string): Json => ({
  error: "Not found",
  path,
  hint: "This developer only exposes a few endpoints",
  try: ENDPOINT_NAMES,
});

/** Stable, plausible response time for an endpoint. */
export const responseTime = (path: string) =>
  18 + ([...path].reduce((a, c) => a + c.charCodeAt(0), 0) % 37);

export const stats = aboutData.stats;
