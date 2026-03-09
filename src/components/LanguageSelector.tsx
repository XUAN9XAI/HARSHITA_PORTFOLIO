import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "ja", label: "日本語", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "zh", label: "中文", dir: "ltr" },
  { code: "ko", label: "한국어", dir: "ltr" },
  { code: "ta", label: "தமிழ்", dir: "ltr" },
  { code: "pa", label: "ਪੰਜਾਬੀ", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLang = (code: string) => {
    const lang = languages.find((l) => l.code === code);
    i18n.changeLanguage(code);
    document.documentElement.dir = lang?.dir || "ltr";
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
      >
        <Globe size={14} />
        <span>{current.label}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="glass absolute right-0 top-full mt-2 z-50 min-w-[140px] overflow-hidden rounded-xl py-1 shadow-xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLang(lang.code)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-secondary ${
                  lang.code === current.code ? "text-primary font-medium" : "text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
