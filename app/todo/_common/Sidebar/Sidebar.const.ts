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
export const items = [
  {
    title: sidebar.myDay,
    state: true,
    id: crypto.randomUUID(),
    icon: "Sun1",
    color: ["purple-300", "rose-400"],
    isEdit: false,
    editable: false,
    filter: (todo: any) =>  todo.item === sidebar.myDay && !todo.status
  },
  {
    title: sidebar.All,
    state: false,
    id: crypto.randomUUID(),
    icon: "Card",
    color: ["purple-300", "purple-400"],
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo && !todo.status
  },
  {
    title: sidebar.complete,
    state: false,
    id: crypto.randomUUID(),
    icon: "TickCircle",
    color: ["[#cac8d8]", "[#239e9a]"],
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo.status
  },
  {
    title: sidebar.progress,
    state: false,
    id: crypto.randomUUID(),
    icon: "Chart",
    color: ["[#a4cbce]", "rose-400"],
    isEdit: false,
    editable: false,
    filter: (todo: any) => todo
  },
  {
    title: sidebar.work,
    state: false,
    id: crypto.randomUUID(),
    icon: "HamburgerMenu",
    color: ["purple-300", "purple-400"],
    isEdit: false,
    editable: true,
    filter: (todo: any) => todo.item === sidebar.work
  },
];

