import { Icon } from "iconsax-reactjs";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  JSX,
  SetStateAction,
  SubmitEventHandler,
} from "react";

export type InputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type TodoListType = Array<{
  id: string;
  title: string;
  status: boolean;
  isEdit: boolean;
  date: string;
}>;

export type ListItems = ListItemProps[];

export type ListItemProps = {
  title: string;
  state: boolean;
  id: string;
  icon: Icon;
  component: ({ item }: any) => React.JSX.Element;
};

export type Context = {
  todo: TodoListType;
  setTodo?: any;
  inputValue?: string | undefined;
  addTodo?: (title: string, status: boolean) => void;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  handleDelete?: (index: string) => void;
  changeTaskState?: (index: string) => void;
  handleSubmit?: SubmitEventHandler<HTMLFormElement> | undefined;
  isEdit?: boolean;
  setEdit?: any;
  editedTask?: string | undefined;
  handleNewChange?: (index: string) => void;
  setEditedTask?: any;
  handleEditedTask?: (e: any) => void;
  focused?: ListItems;
  newList?: ListItems;
  setNewList?: Dispatch<SetStateAction<ListItems>>;
  setFocused?: Dispatch<SetStateAction<ListItems>>;
  handleIsEdit?: (index: string) => void;
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
  All: "همه",
  complete: "تکمیل شده",
  button: "لیست جدید",
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
  },
  {
    id: crypto.randomUUID(),
    title: "خرید خانه",
    status: false,
    isEdit: false,
    date: todoDate,
  },
  {
    id: crypto.randomUUID(),
    title: "آب دادن به گل ها",
    status: false,
    isEdit: false,
    date: "Sun Mar 27 2026",
  },
  {
    id: crypto.randomUUID(),
    title: "حموم!",
    status: false,
    isEdit: false,
    date: "Sun Mar 28 2026",
  },
];
