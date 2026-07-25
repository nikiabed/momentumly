import { TodoList } from "@/app/types/todo";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Board } from "@/app/types/board";

// export type ListItemProps = {
//   _id: string;
//   title: string;
//   state: boolean;
//   icon: string;
//   color: string;
//   boardKey: string;
//   theme: string;
//   isEdit?: boolean;
//   editable?: boolean;
//   filter: (todo: TodoType) => boolean;
//   order: number;
// };

export type Context = {
  todo: TodoList;
  setTodo?: any;
  inputValue?: string | null;
  addTodo?: (title: string, item: Board) => void;
  handleChange?: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  deleteTodo?: (id: string) => Promise<void>;
  changeTaskState?: (index: string) => void;
  handleSubmit?: (e: any, item: Board) => Promise<void>;
  isEdit?: boolean;
  setEdit?: any;
  editedTask?: string | null;
  handleNewChange?: (id: string, title: string) => Promise<void>;
  setEditedTask?: any;
  handleEditedTask?: (e: any) => void;
  setFocused?: Dispatch<SetStateAction<Board[]>>;
  handleIsEdit?: (id: string, value: boolean) => void;
  handleImportant?: (index: string) => void;
  handleBoardSubmit?: (index: string, text: string) => void;
  boardValue?: string;
  handleBoardInput?: (e: any) => void;
  handleBoardClick?: (index: string) => void;
  handleNewList?: () => void;
  handleBoardIsEdit?: (index: string) => void;
  handleBoardEditable?: (index: string) => void;
  removeList?: (index: string) => void;
  moveToMyDay?: (index: string) => void;
  boardList: Board[];
  setBoardList?: Dispatch<SetStateAction<Board[]>>;
  loadBoards?: () => Promise<void>;
  createBoard?: (name: string) => void;
  activeBoard?: string;
  setActiveBoard?: Dispatch<SetStateAction<string>>;
  selectBoard?: (board: Board, id: string) => void;
  toggleImportant?: (id: string, value: boolean) => Promise<void>;
  toggleStatus?: (
    id: string,
    value: boolean,
    completedAt: Date,
  ) => Promise<void>;
  finalBoard?: Board[];
  searchText?: string;
  setSearchText?: Dispatch<SetStateAction<string>>;
  uiBoard?: Board[];
  saveBoard?: (id: string) => Promise<void>;
  handleUpdateTodo?: (id: string, title: string) => Promise<void>;
  systemBoards?: Record<string, Board>;
  setSystemBoards?: Dispatch<SetStateAction<Record<string, Board>>>;
  newBoardKey?: string | null;
  setNewBoardKey?: React.Dispatch<React.SetStateAction<string | null>>;
  removeFromMyDay?: (id: string) => Promise<void>;
  moveTodo?: (todoId: string, boardKey: string) => Promise<void>;
  setDeadline?: (id: string, date: Date | null) => Promise<boolean>;
  handleFile?: (file: File, id: string) => Promise<void>;
  uploadFile?: (file: File) => Promise<any>;
  removeLink?: (id: string) => Promise<void>;
  handleToggleImportant?: (id: string, value: boolean) => Promise<void>;
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
    id: uuidv4(),
    title: "باشگاه",
    status: false,
    isEdit: false,
    date: todoDate,
    isImportant: false,
    item: "همه",
  },
  {
    id: uuidv4(),
    title: "خرید خانه",
    status: false,
    isEdit: false,
    date: todoDate,
    isImportant: false,
    item: "همه",
  },
  {
    id: uuidv4(),
    title: "آب دادن به گل ها",
    status: false,
    isEdit: false,
    date: "Sun Mar 27 2026",
    isImportant: false,
    item: "امروز",
  },
  {
    id: uuidv4(),
    title: "حموم!",
    status: false,
    isEdit: false,
    date: "Sun Mar 28 2026",
    isImportant: false,
    item: "امروز",
  },
];
