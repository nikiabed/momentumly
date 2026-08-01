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
      px-3 py-1
      rounded-2xl
      bg-background
      backdrop-blur
      border border-border
      text-foreground
      "
    >
      {theme === "dark" ? (
        <Sun size={22}/>
      ) : (
        <Moon size={22}/>
      )}
    </button>
  );
};