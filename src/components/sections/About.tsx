import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Code, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Cpu, title: "Hardware", desc: "Embedded systems, IoT, sensor networks" },
  { icon: Code, title: "Software", desc: "React, TypeScript, Python, AI/ML" },
  { icon: Lightbulb, title: "Innovation", desc: "Research-driven engineering solutions" },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">About</p>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Engineering meets <span className="gradient-text">creativity</span>
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground">
            I'm an Electronics & Communication Engineering sophomore passionate about bridging the gap 
            between hardware and software. From building atmospheric sensing systems to developing 
            AI-powered applications, I thrive at the intersection of embedded systems and modern web technologies.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass group rounded-2xl p-6 transition-all hover:glow-primary"
            >
              <item.icon size={24} className="mb-4 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
