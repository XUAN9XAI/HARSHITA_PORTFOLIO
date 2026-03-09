import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

const skillGroups = [
  { label: "Languages", skills: ["Python", "TypeScript", "JavaScript", "C/C++", "MATLAB"] },
  { label: "Frontend", skills: ["React", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { label: "Hardware & IoT", skills: ["ESP32", "Arduino", "Sensor Systems", "PCB Design"] },
  { label: "AI / ML", skills: ["TensorFlow", "Computer Vision", "NLP", "Data Analysis"] },
  { label: "Tools", skills: ["Git", "Figma", "VS Code", "Linux"] },
];

const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{t("skills.label")}</p>
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            {t("skills.title")} <span className="gradient-text">{t("skills.titleAccent")}</span>
          </h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + gi * 0.1 }} className="glass rounded-2xl p-6">
              <h3 className="mb-4 font-mono text-sm font-medium text-primary">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
