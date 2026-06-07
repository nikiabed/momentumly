"use client";
import { More } from "iconsax-reactjs";
import { useState } from "react";
import { ListItemProps } from "../..";

const colors = [
  "bg-linear-45 from-purple-300 to-rose-400",
  "bg-linear-45 from-purple-300 to-purple-400",
  "bg-linear-45 from-[#a4cbce] to-blue-400",
  "bg-linear-45 from-[#cac8d8] to-[#239e9a]",
  "bg-linear-45 from-red-300 to-red-400",
  "bg-pink-100 border-2 border-pink-600",
  "bg-purple-100 border-2 border-purple-600",
  "bg-blue-100 border-2 border-blue-600",
  "bg-green-100 border-2 border-green-600",
  "bg-red-100 border-2 border-red-600",
]; 

export const Palette = ({ item }: { item: ListItemProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePalette = () => {
    setIsOpen(!isOpen);
  };
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorChange = () => {
    // setSelectedColor(gradiants[color]);
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
        <div className="absolute left-0 w-70 z-50  bg-rose-50 text-gray-600 rounded shadow flex flex-col flex-wrap gap-4 p-4">
          <div className="pr-2">تم ها</div>
          <div className="flex gap-2 flex-wrap p-2">
            {colors.map((theme: string, i: number) => (
              <div
                key={i}
                onClick={() => setSelectedColor(theme)}
                className={`p-2 cursor-pointer ${theme} rounded h-10 w-10
                ${selectedColor === theme ? "ring-2 ring-offset-2 ring-blue-500" : ""}
              `}
              />
            ))}

            <div className=" cursor-pointer  h-10 w-10 ">
              <img
                src="images/background1.jpg"
                alt="Image"
                className="rounded h-full w-full object-cover"
              />
            </div>
            <div className=" cursor-pointer  h-10 w-10 ">
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
