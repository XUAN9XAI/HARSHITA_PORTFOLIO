import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

type Category = "All" | "Hardware / IoT" | "Software / AI";

const projects = [
  {
    title: "Yantrix",
    category: "Hardware / IoT" as Category,
    tech: ["ESP32", "TSL2561", "Mie Scattering"],
    description: "Atmospheric sensing system analyzing ambient light scattering patterns for environmental monitoring.",
    featured: false,
  },
  {
    title: "Segenpaws",
    category: "Software / AI" as Category,
    tech: ["AI/ML", "Python", "React"],
    description: "AI-driven animal welfare technology platform leveraging machine learning for real-world impact.",
    featured: true,
  },
  {
    title: "Atom Mail AI",
    category: "Software / AI" as Category,
    tech: ["Gemini AI", "Automation"],
    description: "AI email automation system built with Circuit Breakers team, integrating Gemini AI for intelligent workflows.",
    featured: false,
  },
  {
    title: "Prakritiverse",
    category: "Software / AI" as Category,
    tech: ["React", "TypeScript"],
    description: "Nature-inspired digital ecosystem exploring biomimicry through interactive web experiences.",
    featured: false,
  },
];

const filters: Category[] = ["All", "Hardware / IoT", "Software / AI"];

const Projects = () => {
  const [active, setActive] = useState<Category>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Projects</p>
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            Selected <span className="gradient-text">work</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-3"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass group relative rounded-2xl p-6 transition-all hover:glow-primary"
              >
                {project.featured && (
                  <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Star size={12} /> Featured
                  </div>
                )}
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <ExternalLink size={16} className="absolute right-6 top-6 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
