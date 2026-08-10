"use client";

import { Moon, Sun } from "iconsax-reactjs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="تغییر تم"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-2xl
          border
          border-border
          bg-background
          text-foreground
        "
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "فعال کردن تم روشن" : "فعال کردن تم تاریک"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-2xl
        border
        border-border
        bg-background
        text-foreground
        transition
        hover:scale-105
        hover:bg-foreground/5
      "
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};
