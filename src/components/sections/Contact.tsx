import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:harshita@example.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Contact</p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p className="mx-auto mb-12 max-w-md text-base text-muted-foreground">
            Open to internships, research collaborations, and hackathon opportunities worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex items-center gap-3 rounded-full px-6 py-3 transition-all hover:glow-primary"
            >
              <link.icon size={18} className="text-primary" />
              <span className="text-sm font-medium">{link.label}</span>
              <ArrowUpRight size={14} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-24 font-mono text-xs text-muted-foreground"
        >
          © 2026 Harshita. Built with precision.
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
