import { motion } from "framer-motion";
import { ArrowDown, Briefcase, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import harshitaImg from "@/assets/harshita.jpeg";
import NeuralCircuitBackground from "@/components/NeuralCircuitBackground";

const Hero = () => {
  const { t } = useTranslation();

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden section-padding pt-32">
      <NeuralCircuitBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-border bg-secondary px-4 py-1.5"
          >
            <span className="font-mono text-xs text-muted-foreground">{t("hero.badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
          >
            <span className="gradient-text">{t("hero.name")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4 text-lg text-muted-foreground md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10 max-w-lg text-base text-muted-foreground/80 lg:mx-0 mx-auto"
          >
            {t("hero.desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <button
              onClick={() => handleScroll("#projects")}
              className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              <Briefcase size={16} />
              {t("hero.viewProjects")}
            </button>
            <button
              onClick={() => handleScroll("#contact")}
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              <Mail size={16} />
              {t("hero.contactMe")}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex-shrink-0"
        >
          <div className="gradient-border glow-primary relative h-72 w-72 overflow-hidden rounded-3xl md:h-80 md:w-80">
            <img
              src={harshitaImg}
              alt="Harshita — ECE Student & Full-Stack Developer"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl animate-pulse-glow" />
          <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-accent/10 blur-2xl animate-pulse-glow" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={20} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
