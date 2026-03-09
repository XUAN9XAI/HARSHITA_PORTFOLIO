import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Users, Presentation } from "lucide-react";

const experiences = [
  {
    icon: Users,
    title: "Robotics Tutor",
    org: "BrightChamps",
    desc: "Mentored 100+ students in robotics fundamentals and programming.",
  },
  {
    icon: GraduationCap,
    title: "NPTEL Certification",
    org: "Advanced Aircraft Control",
    desc: "Completed advanced coursework in control systems and aerospace engineering.",
  },
  {
    icon: Presentation,
    title: "Seminar Speaker",
    org: "BITS Pilani — Digital Dreamscapes",
    desc: "Presented research on digital innovation and emerging technologies.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Experience</p>
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            Journey so <span className="gradient-text">far</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[12px] top-1 z-10 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass rounded-2xl p-6 transition-all hover:glow-primary">
                    <exp.icon size={20} className="mb-3 text-primary" />
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="mb-2 font-mono text-xs text-primary">{exp.org}</p>
                    <p className="text-sm text-muted-foreground">{exp.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
