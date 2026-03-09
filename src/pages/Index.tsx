import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";

const About = lazy(() => import("@/components/sections/About"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const Experience = lazy(() => import("@/components/sections/Experience"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Research = lazy(() => import("@/components/sections/Research"));
const Contact = lazy(() => import("@/components/sections/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Research />
        <Contact />
      </Suspense>
    </div>
  );
};

export default Index;
