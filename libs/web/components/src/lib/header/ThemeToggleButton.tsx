import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleButtonProps = {
  buttonClass: string;
  iconClass: {
    light: string;
    dark: string;
  };
};

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  buttonClass,
  iconClass,
}) => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [currentIcon, setCurrentIcon] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  };

  useEffect(() => {
    if (theme === "light") setCurrentIcon("light");
    if (theme === "dark") setCurrentIcon("dark");
  }, [theme]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={toggleTheme}
      className={buttonClass}
      type="button"
      title="theme-toggle"
      aria-pressed
    >
      {currentIcon === "dark" ? (
        <SunIcon title="light-mode" className={iconClass.dark} />
      ) : (
        <MoonIcon title="dark-mode" className={iconClass.light} />
      )}
    </motion.button>
  );
};

export default ThemeToggleButton;
