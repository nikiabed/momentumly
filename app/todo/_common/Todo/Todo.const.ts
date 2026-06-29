import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import { GradientsKey } from "../Sidebar/Sidebar.const";
import { v4 as uuidv4 } from "uuid";

export type TodoType = {
  _id: string;
  title: string;
  status: boolean;
  date?: string;
  isImportant: boolean;
  item: string;
  boardKey?: string;
  createdAt: string;
  myDayDate?: string | null;
};

export type TodoListType = TodoType[];

export type ListItems = ListItemProps[];

export type ListItemProps = {
  title: string;
  state: boolean;
  _id: string;
  icon: string;
  color: GradientsKey;
  boardKey: string;
  theme: string;
  filter: (todo: TodoType) => any;
};

export type Context = {
  todo: TodoListType;
  setTodo?: any;
  inputValue?: string | undefined;
  addTodo?: (title: string, item: ListItemProps) => void;
  handleChange?:
    | ChangeEventHandler<HTMLInputElement, HTMLInputElement>
    | undefined;
  deleteTodo?: (id: string) => Promise<void>;
  changeTaskState?: (index: string) => void;
  handleSubmit?: (e: any, item: ListItemProps) => void;
  isEdit?: boolean;
  setEdit?: any;
  editedTask?: string | undefined;
  handleNewChange?: (id: string, title: string) => Promise<void>;
  setEditedTask?: any;
  handleEditedTask?: (e: any) => void;
  focused: ListItems;
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
  removeList?: (index: string) => void;
  moveToMyDay?: (index: string) => void;
  boardList: ListItemProps[];
  setBoardList?: Dispatch<SetStateAction<ListItemProps[]>>;
  loadBoards?: () => Promise<void>;
  createBoard?: (name: string) => void;
  activeBoard?: string;
  setActiveBoard?: Dispatch<SetStateAction<string>>;
  selectBoard?: (board: ListItemProps, id: string) => void;
  toggleImportant?: (id: string, value: boolean) => Promise<void>;
  toggleStatus?: (id: string, value: boolean) => Promise<void>;
  loading?: boolean;
  finalBoard?: ListItemProps[];
  searchText?: string;
  setSearchText?: Dispatch<SetStateAction<string>>;
  uiBoard?: ListItemProps[];
  saveBoard?: (id: string) => Promise<void>;
  handleUpdateTodo?: (id: string, title: string) => Promise<void>;
  systemBoardsState?: Record<string, ListItemProps>;
  setSystemBoardsState?: Dispatch<
    SetStateAction<Record<string, ListItemProps>>
  >;
  newBoardKey?: string;
  setNewBoardKey?: React.Dispatch<React.SetStateAction<string | null>>;
  removeFromMyDay?: (id: string) => Promise<void>;
  moveTodo?: (todoId: string, boardKey: string) => Promise<void>;
  setDeadline?: (id: string, date: string) => Promise<void>;
  handleFile: (
    e: ChangeEvent<HTMLInputElement, Element>,
    id: string,
  ) => Promise<void>;
  uploadFile: (file: File) => Promise<any>;
  removeLink: (id: string) => Promise<void>;
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
