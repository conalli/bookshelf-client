import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React from "react";

const ThemeToggleButton = () => {
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
      className="inline-flex items-center justify-center w-10 h-10 focus:shadow-outline"
      type="button"
      aria-pressed
    >
      {theme === "dark" ? (
        <SunIcon className="p-2 text-orange-200 hover:text-orange-300 rounded-full" />
      ) : (
        <MoonIcon className="p-2 text-gray-500 hover:text-gray-800 rounded-full" />
      )}
    </motion.button>
  );
};

export default ThemeToggleButton;
