import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Code, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Cpu, title: t("about.hardware"), desc: t("about.hardwareDesc") },
    { icon: Code, title: t("about.software"), desc: t("about.softwareDesc") },
    { icon: Lightbulb, title: t("about.innovation"), desc: t("about.innovationDesc") },
  ];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{t("about.label")}</p>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {t("about.title")} <span className="gradient-text">{t("about.titleAccent")}</span>
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("about.desc")}</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="glass group rounded-2xl p-6 transition-all hover:glow-primary">
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
