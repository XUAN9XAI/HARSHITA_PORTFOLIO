import { useState, useEffect } from "react";
import { Sun, Moon, Eye } from "lucide-react";
import { motion } from "framer-motion";

type Theme = "dark" | "light" | "eye-protection";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "eye-protection");
    root.classList.add(theme);
  }, [theme]);

  const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "eye-protection", icon: Eye, label: "Eye Protection" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className="relative rounded-full p-2 transition-colors"
          aria-label={label}
        >
          {theme === value && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon
            size={14}
            className={`relative z-10 transition-colors ${
              theme === value ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
