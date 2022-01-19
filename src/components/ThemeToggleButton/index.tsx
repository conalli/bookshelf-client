import { SunIcon, MoonIcon } from "@heroicons/react/solid";
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
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-10 h-10 transition duration-150 focus:shadow-outline"
      type="button"
      aria-pressed
    >
      {theme === "dark" ? (
        <SunIcon className="p-2 text-orange-200 hover:text-orange-300 rounded-full" />
      ) : (
        <MoonIcon className="p-2 text-gray-500 hover:text-gray-50 rounded-full" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
