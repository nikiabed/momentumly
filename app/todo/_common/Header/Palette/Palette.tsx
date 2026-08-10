"use client";
import { More } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { Board } from "@/app/types";
import {
  boardService,
  userPreferenceService,
  useTodoContext,
} from "@/app/_utils";
import { colors, Theme, themeIconFill } from "./paletteData";
import { getImageTheme, isMongoBoard } from "./paletteUtil";

export const Palette = ({ item }: { item: Board }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setBoardList, setSystemBoards } = useTodoContext();
  const [selectedColor, setSelectedColor] = useState(item.theme);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = async (key: string) => {
    console.log("changing theme to:", key);
    setSelectedColor(key);
    if (isMongoBoard(item._id)) {
      setBoardList?.((prev: Board[]) =>
        prev.map((b: Board) => (b._id === item._id ? { ...b, theme: key } : b)),
      );
      try {
        await boardService.updateTheme(item._id, key);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSystemBoards?.((prev) => ({
        ...prev,
        [item.boardKey]: {
          ...prev[item.boardKey],
          theme: key,
        },
      }));

      try {
        await userPreferenceService.updateTheme(item.boardKey, key);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const togglePalette = () => {
    setIsOpen(!isOpen);
  };

  const isImage = item.theme?.startsWith("img:");
  const iconFill = isImage ? "#374151" : themeIconFill[item.theme];

  const isDark = document.documentElement.classList.contains("dark");

  const visibleThemes = colors.filter(
    (theme) => theme.mode === (isDark ? "dark" : "light"),
  );
  useEffect(() => {
    const handleThemeChange = () => {
      const dark = document.documentElement.classList.contains("dark");

      const availableThemes = colors.filter(
        (theme) => theme.mode === (dark ? "dark" : "light"),
      );

      const isImageTheme = item.theme?.startsWith("img:");

      const currentThemeExists =
        isImageTheme ||
        availableThemes.some((theme) => theme.key === item.theme);

      if (!currentThemeExists && availableThemes.length > 0) {
        handleColorChange(availableThemes[0].key);
      }
    };

    handleThemeChange();

    const observer = new MutationObserver(handleThemeChange);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [item.theme]);

  return (
    <div className="relative" ref={paletteRef}>
      <More
        size={24}
        color="transparent"
        style={{
          fill: "var(--foreground)",
        }}
        className="cursor-pointer"
        onClick={togglePalette}
      />
      {isOpen && (
        <div className="absolute left-0 w-70 z-500 bg-background text-foreground rounded shadow flex flex-col flex-wrap gap-4 p-4">
          <div className="pr-2">تم ها</div>
          <div className="flex gap-2 flex-wrap p-2">
            {visibleThemes.map((theme: Theme, i: number) => (
              <div
                key={i}
                onClick={() => {
                  console.log("CLICKED COLOR:", theme.key);
                  handleColorChange(theme.key);
                }}
                className={`p-2 cursor-pointer ${theme.className} rounded h-10 w-10
                ${
                  item.theme === theme.key
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }
              `}
              />
            ))}

            <div
              className=" cursor-pointer h-10 w-10 "
              onClick={() => handleColorChange("img:/images/background2.webp")}
            >
              <img
                src="/images/background2.webp"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background2.webp"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => handleColorChange("img:/images/background3.webp")}
            >
              <img
                src="/images/background3.webp"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background3.webp"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => handleColorChange("img:/images/background4.webp")}
            >
              <img
                src="/images/background4.webp"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background4.webp"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => handleColorChange("img:/images/background5.webp")}
            >
              <img
                src="/images/background5.webp"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background5.webp"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => handleColorChange("img:/images/background6.webp")}
            >
              <img
                src="/images/background6.webp"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background6.webp"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => handleColorChange("img:/images/background7.webp")}
            >
              <img
                src="/images/background7.webp"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background7.webp"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
