import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";

type Category = "All" | "Hardware / IoT" | "Software / AI";

const projects = [
  {
    title: "Yantrix",
    category: "Hardware / IoT" as Category,
    tech: ["ESP32", "TSL2561", "Mie Scattering"],
    description: "Atmospheric sensing system analyzing ambient light scattering patterns for environmental monitoring.",
    caseStudy: {
      problem: "Traditional air quality monitoring systems are expensive and lack real-time granularity for localized atmospheric analysis.",
      approach: "Designed a low-cost sensing system using the Mie scattering principle with TSL2561 ambient light sensors interfaced via ESP32 microcontrollers.",
      technologies: ["ESP32", "TSL2561 Sensor", "Mie Scattering Principle", "C/C++", "Serial Communication"],
      challenges: "Calibrating the sensor for accurate scattering measurements across varying environmental conditions and minimizing noise in analog readings.",
      outcome: "Successfully built a working prototype that provides real-time atmospheric scattering data, demonstrating feasibility for low-cost environmental monitoring.",
    },
  },
  {
    title: "Segenpaws",
    category: "Software / AI" as Category,
    tech: ["AI/ML", "Python", "React"],
    description: "AI-driven animal welfare technology platform leveraging machine learning for real-world impact.",
    featured: true,
    caseStudy: {
      problem: "Animal welfare organizations lack scalable tools to identify, track, and respond to animal distress signals efficiently.",
      approach: "Built an AI platform combining computer vision for animal identification with a React-based dashboard for real-time monitoring and response coordination.",
      technologies: ["Python", "TensorFlow", "React", "TypeScript", "REST APIs", "Computer Vision"],
      challenges: "Training accurate models with limited labeled datasets and building a responsive real-time notification system for field workers.",
      outcome: "Deployed a functional MVP that demonstrates 85%+ identification accuracy, streamlining response times for welfare organizations.",
    },
  },
  {
    title: "Atom Mail AI",
    category: "Software / AI" as Category,
    tech: ["Gemini AI", "Automation"],
    description: "AI email automation system built with Circuit Breakers team, integrating Gemini AI for intelligent workflows.",
    caseStudy: {
      problem: "Email management consumes significant time for professionals, with repetitive tasks like drafting, categorizing, and scheduling.",
      approach: "Integrated Google's Gemini AI to automate email drafting, smart categorization, and priority-based scheduling within a streamlined interface.",
      technologies: ["Gemini AI API", "JavaScript", "Node.js", "Email APIs"],
      challenges: "Handling diverse email formats and ensuring AI-generated responses maintain appropriate tone and context for professional communication.",
      outcome: "Created a working prototype that reduces email handling time by an estimated 40%, with positive feedback from test users on response quality.",
    },
  },
  {
    title: "Prakritiverse",
    category: "Software / AI" as Category,
    tech: ["React", "TypeScript"],
    description: "Nature-inspired digital ecosystem exploring biomimicry through interactive web experiences.",
    caseStudy: {
      problem: "Biomimicry concepts are often abstract and hard to visualize, making them less accessible to general audiences and students.",
      approach: "Created an interactive digital ecosystem where users explore nature-inspired design patterns through animated, explorable web interfaces.",
      technologies: ["React", "TypeScript", "Framer Motion", "CSS Animations"],
      challenges: "Balancing visual complexity with performance, and designing interactions that accurately represent biological systems without oversimplification.",
      outcome: "Delivered an engaging educational platform that makes biomimicry concepts tangible through interactive exploration, receiving positive reception at demo events.",
    },
  },
];

const Projects = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filters: { label: string; value: Category }[] = [
    { label: t("projects.all"), value: "All" },
    { label: t("projects.hardwareIot"), value: "Hardware / IoT" },
    { label: t("projects.softwareAi"), value: "Software / AI" },
  ];

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{t("projects.label")}</p>
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            {t("projects.title")} <span className="gradient-text">{t("projects.titleAccent")}</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="mb-10 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === f.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => {
              const globalIdx = projects.indexOf(project);
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(globalIdx)}
                  className="glass group relative cursor-pointer rounded-2xl p-6 transition-all hover:glow-primary"
                >
                  {project.featured && (
                    <div className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <Star size={12} /> {t("projects.featured")}
                    </div>
                  )}
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">{tech}</span>
                    ))}
                  </div>
                  <ExternalLink size={16} className="absolute right-6 top-6 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {selectedProject !== null && (
        <ProjectCaseStudy
          open={true}
          onClose={() => setSelectedProject(null)}
          title={projects[selectedProject].title}
          caseStudy={projects[selectedProject].caseStudy}
        />
      )}
    </section>
  );
};

export default Projects;
