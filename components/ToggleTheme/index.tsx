import { useTheme } from "next-themes";
import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  };
  return (
    <button
      onClick={toggleColorMode}
      className="inline-flex items-center justify-center w-10 h-10 mr-2 transition duration-150 focus:shadow-outline"
    >
      {theme === "dark" ? (
        <SunIcon className="text-orange-300 p-2 hover:bg-gray-600 rounded-md" />
      ) : (
        <MoonIcon className="text-gray-600 p-2 hover:bg-gray-300 rounded-md" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
