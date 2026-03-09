import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Microscope, Cpu, Bot, Gauge, Layers } from "lucide-react";

const topics = [
  { icon: Cpu, label: "Embedded Systems" },
  { icon: Gauge, label: "Sensor Systems" },
  { icon: Bot, label: "Robotics Education" },
  { icon: Layers, label: "Control Systems" },
  { icon: Microscope, label: "Hardware + AI Integration" },
];

const Research = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Research</p>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Areas of <span className="gradient-text">exploration</span>
          </h2>
          <p className="mb-12 max-w-2xl text-base text-muted-foreground">
            Actively exploring the convergence of embedded computing, intelligent systems, and 
            human-centered design to build technology that matters.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="glass flex items-center gap-3 rounded-full px-5 py-3 transition-all hover:glow-primary"
            >
              <topic.icon size={18} className="text-primary" />
              <span className="text-sm font-medium">{topic.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
