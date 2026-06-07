"use client";
import { More } from "iconsax-reactjs";
import { useState } from "react";

export const Palette = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        <div className="absolute left-0 w-70 z-50  bg-rose-50 text-gray-600 rounded shadow flex flex-col flex-wrap gap-4 p-4">
          <div className="pr-2">تم ها</div>
          <div className="flex gap-2 flex-wrap p-2">

          <div className="p-2 cursor-pointer bg-linear-45 from-purple-300 to-rose-400 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-linear-45 from-purple-300 to-purple-400 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-linear-45 from-[#cac8d8] to-[#239e9a] rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-linear-45 from-[#a4cbce] to-blue-400 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-linear-45 from-purple-300 to-purple-400 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-linear-45 from-red-300 to-red-400 rounded h-10 w-10  "></div>

          <div className="p-2 cursor-pointer bg-amber-100 border-2 border-amber-600 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-blue-100 border-2 border-blue-600 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-gray-100 border-2 border-gray-600 rounded h-10 w-10  "></div>
          <div className="p-2 cursor-pointer bg-green-100 border-2 border-green-600 rounded h-10 w-10  "></div>

          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background1.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background2.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background3.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background4.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background5.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background6.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background7.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>
          <div className=" cursor-pointer  h-10 w-10 "><img src="images/background8.jpg" alt="Image" className="rounded h-full w-full object-cover" /></div>


          </div>

          
        </div>
      )}
    </div>
  );
};
