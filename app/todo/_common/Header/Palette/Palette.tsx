"use client";
import { More } from "iconsax-reactjs";
import { useState } from "react";
import { ListItemProps } from "../..";
import { useTodoContext } from "@/app/_utils/hooks/useTodoContext";

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

type BoardTheme = {
  type: "gradient" | "image";
  value: string;
};

export const Palette = ({ item }: { item: ListItemProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setBoardList } = useTodoContext();
  const [selectedColor, setSelectedColor] = useState(item.theme ?? "sunset");

  const handleColorChange = async (key: string) => {
    setBoardList?.((prev: any) =>
      prev.map((board: any) =>
        board._id === item._id ? { ...board, theme: key } : board,
      ),
    );
    setSelectedColor(key);

    await fetch("/api/boards/theme", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        boardId: item._id,
        theme: key,
      }),
    });
  };

  const togglePalette = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative" onClick={togglePalette}>
      <More
        size={24}
        className="cursor-pointer "
        color="transparent"
        style={{
          fill: "#fff",
        }}
      />
      {isOpen && (
        <div className="absolute left-0 w-70 z-50 bg-rose-50 text-gray-600 rounded shadow flex flex-col flex-wrap gap-4 p-4">
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

            <div className=" cursor-pointer h-10 w-10 ">
              <img
                src="images/background1.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer h-10 w-10 ">
              <img
                src="images/background2.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background3.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background4.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background5.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background6.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background7.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background8.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
