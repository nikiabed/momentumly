import { v4 as uuidv4 } from "uuid";
import { Search } from "./Search";

export const sidebar = {
  placeholder: "پیدا کردن..",
  myDay: "امروز",
  important: "مهم",
  All: "همه",
  complete: "تکمیل شده",
  button: "لیست جدید",
  progress: "پیشرفت",
  work: "کار",
  untitled: "بدون عنوان",
};

const date = new Date();
export const todoDate = date.toDateString();

export const gradiants = {
    myDay: " bg-linear-45 from-purple-300 to-rose-400",
    all: " bg-linear-45 from-purple-300 to-purple-400",
    complete: " bg-linear-45 from-[#cac8d8] to-[#239e9a]",
    progress: " bg-linear-45 from-[#a4cbce] to-blue-400",
    newList: " bg-linear-45 from-purple-300 to-purple-400",
    important: " bg-linear-45 from-red-300 to-red-400",
    search: " bg-linear-45 from-purple-300 to-purple-600"
  } as const;

export type GradientsKey = keyof typeof gradiants

export const items = [
  {
    title: sidebar.myDay,
    state: true,
    id: uuidv4(),
    icon: "Sun1",
    color: "myDay",
    isEdit: false,
    editable: false,
    filter: (todo: any) =>  todo.item === sidebar.myDay && !todo.status && todo.date === todoDate
  },
  {
    title: sidebar.All,
    state: false,
    id: uuidv4(),
    icon: "Card",
    color: "all",
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo && !todo.status
  },
  {
    title: sidebar.complete,
    state: false,
    id: uuidv4(),
    icon: "TickCircle",
    color: "complete",
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo.status
  },
  {
    title: sidebar.progress,
    state: false,
    id: uuidv4(),
    icon: "Chart",
    color: "progress",
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo
  },
  {
    title: sidebar.work,
    state: false,
    id: uuidv4(),
    icon: "HamburgerMenu",
    color: "newList",
    isEdit: false,
    editable: true,
    filter: (todo: any) => todo.item === sidebar.work
  },
];

