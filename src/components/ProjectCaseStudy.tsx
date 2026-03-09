import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CaseStudy {
  problem: string;
  approach: string;
  technologies: string[];
  challenges: string;
  outcome: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  caseStudy: CaseStudy;
}

const ProjectCaseStudy = ({ open, onClose, title, caseStudy }: Props) => {
  const { t } = useTranslation();

  const sections = [
    { key: "problem", label: t("projects.caseStudy.problem"), content: caseStudy.problem },
    { key: "approach", label: t("projects.caseStudy.approach"), content: caseStudy.approach },
    { key: "technologies", label: t("projects.caseStudy.technologies"), content: caseStudy.technologies.join(", ") },
    { key: "challenges", label: t("projects.caseStudy.challenges"), content: caseStudy.challenges },
    { key: "outcome", label: t("projects.caseStudy.outcome"), content: caseStudy.outcome },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] z-[101] mx-auto max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-2xl md:inset-x-auto"
          >
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="mb-1 font-mono text-xs uppercase tracking-widest text-primary">Case Study</p>
                <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <h3 className="mb-2 font-mono text-sm font-medium text-primary">{section.label}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectCaseStudy;
