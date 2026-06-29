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
  search: " bg-linear-45 from-purple-300 to-purple-600",
} as const;

export type GradientsKey = keyof typeof gradiants;

export const items = [
  {
    _id: "myDay",
    theme: "lavender",
    title: sidebar.myDay,
    state: true,
    icon: "Sun1",
    color: "myDay",
    boardKey: "myDay",
    isEdit: false,
    editable: false,
    filter: (todo: any) =>
      todo.item === sidebar.myDay && !todo.status && todo.date === todoDate,
    order: 1,
  },
  {
    _id: "all",
    theme: "lavender",
    title: sidebar.All,
    state: false,
    icon: "Card",
    color: "all",
    boardKey: "all",
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo && !todo.status,
    order: 2,
  },
  {
    _id: "complete",
    theme: "lavender",
    title: sidebar.complete,
    state: false,
    icon: "TickCircle",
    color: "complete",
    boardKey: "complete",
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo.status,
    order: 3,
  },
  {
    _id: "progress",
    theme: "lavender",
    title: sidebar.progress,
    state: false,
    icon: "Chart",
    color: "progress",
    boardKey: "progress",
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo,
    order: 4,
  },
  {
    _id: "myDay",
    theme: "lavender",
    title: sidebar.work,
    state: false,
    icon: "HamburgerMenu",
    color: "newList",
    boardKey: "newList",
    isEdit: false,
    editable: true,
    filter: (todo: any) => todo.item === sidebar.work,
    order: 5,
  },
];
