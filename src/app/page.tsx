import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrambleLabels from "@/components/ui/ScrambleLabels";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";

/*
 * Testimonials and Writing (upcoming notes) are hidden until they have real
 * content. Their data still lives in src/data/portfolio.ts, and the old
 * components are in git history (commit 7a5e6d2).
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg">
      <SmoothScroll />
      <CommandPalette />
      <ScrambleLabels />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Publications />
      <Contact />
    </main>
  );
}
