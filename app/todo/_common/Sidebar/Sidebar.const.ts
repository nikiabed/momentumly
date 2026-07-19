import { BOARD_LABELS } from "@/app/_utils";
import { Todo } from "@/app/types/todo";

export const sidebar = {
  placeholder: "پیدا کردن..",
  work: "کار",
  button: "لیست جدید",
  signOut: "خارج شدن",
};

const date = new Date();

export const gradients = {
  myDay: " bg-linear-45 from-purple-300 to-rose-400",
  all: " bg-linear-45 from-purple-300 to-purple-400",
  complete: " bg-linear-45 from-[#cac8d8] to-[#239e9a]",
  progress: " bg-linear-45 from-[#a4cbce] to-blue-400",
  newList: " bg-linear-45 from-purple-300 to-purple-400",
  important: " bg-linear-45 from-red-300 to-red-400",
  search: " bg-linear-45 from-purple-300 to-purple-600",
} as const;

export type GradientsKey = keyof typeof gradients;

export const items = [
  {
    _id: "myDay",
    theme: "lavender",
    title: BOARD_LABELS.myDay,
    state: true,
    icon: "Sun1",
    color: "myDay",
    boardKey: "myDay",
    isEdit: false,
    editable: false,
    filter: (todo: Todo) =>
      todo.item === BOARD_LABELS.myDay &&
      !todo.status &&
      todo.deadline === date,
    order: 1,
  },
  {
    _id: "all",
    theme: "lavender",
    title: BOARD_LABELS.all,
    state: false,
    icon: "Card",
    color: "all",
    boardKey: "all",
    isEdit: false,
    editable: false,
    filter: (todo: Todo) => todo && !todo.status,
    order: 2,
  },
  {
    _id: "complete",
    theme: "lavender",
    title: BOARD_LABELS.complete,
    state: false,
    icon: "TickCircle",
    color: "complete",
    boardKey: "complete",
    isEdit: false,
    editable: false,
    filter: (todo: Todo) => todo.status,
    order: 3,
  },
  {
    _id: "progress",
    theme: "lavender",
    title: BOARD_LABELS.progress,
    state: false,
    icon: "Chart",
    color: "progress",
    boardKey: "progress",
    isEdit: false,
    editable: false,
    filter: (todo: Todo) => todo,
    order: 4,
  },
  {
    _id: "myDay",
    theme: "lavender",
    title: BOARD_LABELS.work,
    state: false,
    icon: "HamburgerMenu",
    color: "newList",
    boardKey: "newList",
    isEdit: false,
    editable: true,
    filter: (todo: Todo) => todo.item === BOARD_LABELS.work,
    order: 5,
  },
];
