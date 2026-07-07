"use client";
import { More } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { ListItemProps } from "../..";
import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";

export const themeIconFill: Record<string, string> = {
  fire: "#ffffff",
  sunset: "#ffffff",
  lavender: "#ffffff",
  ocean: "#ffffff",
  mint: "#ffffff",
  purple: "#ffffff",

  "pink-soft": "#364153",
  "blue-soft": "#364153",
  "purple-soft": "#364153",
  "green-soft": "#364153",
  "red-soft": "#364153",
};
export const colors = [
  {
    key: "sunset",
    name: "Sunset",
    className: "bg-linear-45 from-purple-300 to-rose-400",
  },
  {
    key: "lavender",
    name: "Lavender",
    className: "bg-linear-45 from-purple-300 to-purple-400",
  },
  {
    key: "ocean",
    name: "Ocean",
    className: "bg-linear-45 from-[#a4cbce] to-blue-400",
  },
  {
    key: "mint",
    name: "Mint",
    className: "bg-linear-45 from-[#cac8d8] to-[#239e9a]",
  },
  {
    key: "fire",
    name: "Fire",
    className: "bg-linear-45 from-red-300 to-red-400",
  },
  {
    key: "purple",
    name: "Purple",
    className: "bg-linear-45 from-purple-400 to-purple-600",
  },

  // solid / bordered themes
  {
    key: "pink-soft",
    name: "Pink Soft",
    className: "bg-pink-100 ",
  },
  {
    key: "purple-soft",
    name: "Purple Soft",
    className: "bg-purple-100 ",
  },
  {
    key: "blue-soft",
    name: "Blue Soft",
    className: "bg-blue-100 ",
  },
  {
    key: "green-soft",
    name: "Green Soft",
    className: "bg-green-100 ",
  },
  {
    key: "red-soft",
    name: "Red Soft",
    className: "bg-red-100 ",
  },
];

export const Palette = ({ item }: { item: ListItemProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setBoardList, setSystemBoardsState } = useTodoContext();
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

    const isMongoBoard = /^[a-f\d]{24}$/i.test(item._id);

    if (isMongoBoard) {
      setBoardList?.((prev: any) =>
        prev.map((b: any) => (b._id === item._id ? { ...b, theme: key } : b)),
      );
    } else {
      setSystemBoardsState?.((prev: any) => ({
        ...prev,
        [item.boardKey]: {
          ...prev[item.boardKey],
          theme: key,
        },
      }));
    }

    if (isMongoBoard) {
      const res = await fetch("/api/boards/theme", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boardId: item._id,
          theme: key,
        }),
      });

      if (!res.ok) {
        console.error("SAVE FAILED");
      }
    }
  };

  const togglePalette = () => {
    setIsOpen(!isOpen);
  };

  const isImage = item.theme?.startsWith("img:");

  const handleImageChange = (src: string) => {
    handleColorChange(`img:${src}`);
  };

  const iconFill = isImage ? "#374151" : themeIconFill[item.theme];

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
            {colors.map((theme: any, i: number) => (
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
              onClick={() => handleImageChange("/images/background2.jpg")}
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
              onClick={() => handleImageChange("/images/background3.jpg")}
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
              onClick={() => handleImageChange("/images/background4.jpg")}
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
              onClick={() => handleImageChange("/images/background5.jpg")}
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
              onClick={() => handleImageChange("/images/background6.jpg")}
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
              onClick={() => handleImageChange("/images/background7.jpg")}
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
