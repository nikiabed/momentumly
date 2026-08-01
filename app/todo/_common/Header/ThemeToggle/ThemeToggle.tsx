"use client";

import { Moon, Sun } from "iconsax-reactjs";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="
      rounded-full
      p-2
      bg-white/20
      backdrop-blur
      "
    >
      {theme === "dark" ? (
        <Sun size={20}/>
      ) : (
        <Moon size={20}/>
      )}
    </button>
  );
};