import {
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
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
}>;

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
};

export const header = {
  today: "امروز"
}

export const completed = {
  header: "تموم شده ها",
};

export const input = {
  placeholder : "یک کار اضافه کن..",
};

export const sidebar = {
  placeholder: "پیدا کردن..",
  myDay: "امروز",
  All: "همه",
  complete: "تکمیل شده",
  
}
