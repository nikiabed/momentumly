export type Theme = {
  key: string;
  name: string;
  className: string;
};

export const colors: Theme[] = [
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
  {
    key: "pink-soft",
    name: "Pink Soft",
    className: "bg-pink-100",
  },
  {
    key: "purple-soft",
    name: "Purple Soft",
    className: "bg-purple-100",
  },
  {
    key: "blue-soft",
    name: "Blue Soft",
    className: "bg-blue-100",
  },
  {
    key: "green-soft",
    name: "Green Soft",
    className: "bg-green-100",
  },
  {
    key: "red-soft",
    name: "Red Soft",
    className: "bg-red-100",
  },
];

export const backgroundImages = [
  "/images/background2.jpg",
  "/images/background3.jpg",
  "/images/background4.jpg",
  "/images/background5.jpg",
  "/images/background6.jpg",
  "/images/background7.jpg",
];

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