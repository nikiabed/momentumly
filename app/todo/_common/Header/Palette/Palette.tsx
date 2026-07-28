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
  const [selectedColor, setSelectedColor] = useState(item.theme ?? "sunset");
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
    setSelectedColor(key);
    if (isMongoBoard(item._id)) {
      setBoardList?.((prev: Board[]) =>
        prev.map((b: Board) => (b._id === item._id ? { ...b, theme: key } : b)),
      );
      try {
        await boardService.updateTheme(item._id, key);
        const board = await boardService.getBoards();
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

  useEffect(() => {
    setSelectedColor(item.theme ?? "sunset");
  }, [item.theme]);

  return (
    <div className="relative" ref={paletteRef}>
      <More
        size={24}
        color="transparent"
        style={{
          fill: iconFill,
        }}
        className="cursor-pointer"
        onClick={togglePalette}
      />
      {isOpen && (
        <div className="absolute left-0 w-70 z-500 bg-rose-50 text-gray-600 rounded shadow flex flex-col flex-wrap gap-4 p-4">
          <div className="pr-2">تم ها</div>
          <div className="flex gap-2 flex-wrap p-2">
            {colors.map((theme: Theme, i: number) => (
              <div
                key={i}
                onClick={() => handleColorChange(theme.key)}
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
              onClick={() => getImageTheme("/images/background2.jpg")}
            >
              <img
                src="/images/background2.jpg"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background2.jpg"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => getImageTheme("/images/background3.jpg")}
            >
              <img
                src="/images/background3.jpg"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background3.jpg"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => getImageTheme("/images/background4.jpg")}
            >
              <img
                src="/images/background4.jpg"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background4.jpg"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => getImageTheme("/images/background5.jpg")}
            >
              <img
                src="/images/background5.jpg"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background5.jpg"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => getImageTheme("/images/background6.jpg")}
            >
              <img
                src="/images/background6.jpg"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background6.jpg"
        ? "ring-2 ring-offset-2 ring-blue-500"
        : ""
    }
  `}
              />
            </div>
            <div
              className=" cursor-pointer  h-10 w-10 "
              onClick={() => getImageTheme("/images/background7.jpg")}
            >
              <img
                src="/images/background7.jpg"
                alt="Image"
                className={`h-10 w-10 cursor-pointer rounded
    ${
      item.theme === "img:/images/background7.jpg"
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
