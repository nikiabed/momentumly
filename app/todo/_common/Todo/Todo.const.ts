import {
  ChangeEventHandler,
  DetailedHTMLProps,
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  SubmitEventHandler,
} from "react";

export type InputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type TodoListType = Array<{
  id: number;
  title: string;
  status: boolean;
}>;

export type Context = {
  todo: TodoListType;
  setTodo?:
    | Dispatch<
        SetStateAction<
          {
            id: number;
            title: string;
            status: boolean;
          }[]
        >
      >
    | undefined;
  inputValue?: string | undefined;
  addTodo?: (title: string, status: boolean) => void;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  handleDelete?: (index: number) => void;
  changeTaskState?: (index: number) => void;
  handleSubmit?: SubmitEventHandler<HTMLFormElement> | undefined;
  isCompleted?: any[];
};

{
}
