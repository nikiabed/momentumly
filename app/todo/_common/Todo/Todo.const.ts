import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export type TodoType = {
  id: string;
  title: string;
  status: boolean;
  isEdit: boolean;
  date: string;
  isImportant: boolean;
  item: string;
};
export type TodoListType = TodoType[];

export type ListItems = ListItemProps[];

export type ListItemProps = {
  title: string;
  state: boolean;
  id: string;
  icon: string;
  color: string[];
  isEdit: boolean;
  editable: boolean;
  filter: (todo: TodoType) => any
};

export type Context = {
  todo: TodoListType;
  setTodo?: any;
  inputValue?: string | undefined;
  addTodo?: (title: string, item: ListItemProps) => void;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  handleDelete?: (index: string) => void;
  changeTaskState?: (index: string) => void;
  handleSubmit?: (e: any, item: ListItemProps) => void;
  isEdit?: boolean;
  setEdit?: any;
  editedTask?: string | undefined;
  handleNewChange?: (index: string) => void;
  setEditedTask?: any;
  handleEditedTask?: (e: any) => void;
  focused?: ListItems;
  setFocused?: Dispatch<SetStateAction<ListItems>>;
  handleIsEdit?: (index: string) => void;
  handleImportant?: (index: string) => void;
  handleBoardSubmit?: (index: string, text: string) => void;
  boardValue?: string;
  handleBoardInput?: (e: any) => void;
  handleBoardClick?: (index: string) => void;
  handleNewList?: () => void;
  handleBoardIsEdit?: (index: string) => void;
  handleBoardEditable?: (index: string) => void;
};

export const header = {
  today: "امروز",
};

export const completed = {
  header: "تموم شده ها",
};

export const input = {
  placeholder: "یک کار اضافه کن..",
};

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
export const items = [
  {
    title: sidebar.myDay,
    state: true,
    id: crypto.randomUUID(),
    icon: "Sun1",
    color: ["purple-300", "rose-400"],
    isEdit: false,
    editable: false,
    filter: (todo: TodoType) =>  todo.item === sidebar.myDay && !todo.status
  },
  {
    title: sidebar.All,
    state: false,
    id: crypto.randomUUID(),
    icon: "Card",
    color: ["purple-300", "purple-400"],
    isEdit: false,
    editable: false,
    filter: (todo: TodoType) => todo && !todo.status
  },
  {
    title: sidebar.complete,
    state: false,
    id: crypto.randomUUID(),
    icon: "TickCircle",
    color: ["[#cac8d8]", "[#239e9a]"],
    isEdit: false,
    editable: false,
    filter: (todo: TodoType) => todo.status
  },
  {
    title: sidebar.progress,
    state: false,
    id: crypto.randomUUID(),
    icon: "Chart",
    color: ["[#a4cbce]", "rose-400"],
    isEdit: false,
    editable: false,
    filter: (todo: TodoType) => todo
  },
  {
    title: sidebar.work,
    state: false,
    id: crypto.randomUUID(),
    icon: "HamburgerMenu",
    color: ["purple-300", "purple-400"],
    isEdit: false,
    editable: true,
    filter: (todo: TodoType) => todo.item === sidebar.work
  },
];
export const todoData = [
  {
    id: crypto.randomUUID(),
    title: "باشگاه",
    status: false,
    isEdit: false,
    date: todoDate,
    isImportant: false,
    item: items[0].title,
  },
  {
    id: crypto.randomUUID(),
    title: "خرید خانه",
    status: false,
    isEdit: false,
    date: todoDate,
    isImportant: false,
    item: items[0].title,
  },
  {
    id: crypto.randomUUID(),
    title: "آب دادن به گل ها",
    status: false,
    isEdit: false,
    date: "Sun Mar 27 2026",
    isImportant: false,
    item: items[1].title,
  },
  {
    id: crypto.randomUUID(),
    title: "حموم!",
    status: false,
    isEdit: false,
    date: "Sun Mar 28 2026",
    isImportant: false,
    item: items[1].title,
  },
];
