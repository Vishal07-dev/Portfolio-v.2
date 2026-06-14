import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Writing from "@/components/sections/Writing";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Writing />
      <Projects />
      <Testimonials />
      <Publications />
      <Contact />
      <Footer />
    </main>
  );
}
