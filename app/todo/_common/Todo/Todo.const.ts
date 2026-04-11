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


const date = new Date();
export const todoDate = date.toDateString();
export const todoData = [
  {
    id: crypto.randomUUID(),
    title: "باشگاه",
    status: false,
    isEdit: false,
    date: todoDate,
    isImportant: false,
    item: "همه",
  },
  {
    id: crypto.randomUUID(),
    title: "خرید خانه",
    status: false,
    isEdit: false,
    date: todoDate,
    isImportant: false,
    item: "همه",
  },
  {
    id: crypto.randomUUID(),
    title: "آب دادن به گل ها",
    status: false,
    isEdit: false,
    date: "Sun Mar 27 2026",
    isImportant: false,
    item: "امروز",
  },
  {
    id: crypto.randomUUID(),
    title: "حموم!",
    status: false,
    isEdit: false,
    date: "Sun Mar 28 2026",
    isImportant: false,
    item: "امروز",
  },
];
