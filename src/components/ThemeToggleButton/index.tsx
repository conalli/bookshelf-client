import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

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
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  };
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={toggleTheme}
      className={buttonClass}
      type="button"
      aria-pressed
    >
      {theme === "dark" ? (
        <SunIcon className={iconClass.dark} />
      ) : (
        <MoonIcon className={iconClass.light} />
      )}
    </motion.button>
  );
};

export default ThemeToggleButton;
