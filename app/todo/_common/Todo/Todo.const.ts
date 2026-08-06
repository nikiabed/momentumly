import { SystemBoard } from "@/app/_utils";
import { Board, CreateTodoInput, Todo, TodoEntry, TodoList } from "@/app/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
export type ActiveTimer = {
  todoId: string;
  startedAt: number;
  accumulatedSeconds: number;
  status: "running" | "paused";
};

export type Context = {
  todo: TodoList;
  setTodo: Dispatch<SetStateAction<TodoList>>;
  inputValue?: string | null;
  addTodo?: (title: string, item: Board) => void;
  handleChange?: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  deleteTodo?: (id: string) => Promise<void>;
  handleSubmit?: (
    e: React.FormEvent<HTMLFormElement>,
    item: Board,
  ) => Promise<void>;
  isEdit?: boolean;
  handleIsEdit?: (id: string, value: boolean) => void;
  handleBoardInput?: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  handleNewList?: () => void;
  handleBoardEditable?: (id: string) => void;
  removeList?: (id: string) => Promise<void>;
  moveToMyDay?: (id: string) => Promise<void>;
  boardList: Board[];
  setBoardList?: Dispatch<SetStateAction<Board[]>>;
  loadBoards?: () => Promise<void>;
  createBoard?: (name: string) => void;
  activeBoard?: string;
  setActiveBoard?: Dispatch<SetStateAction<string>>;
  selectBoard?: (board: Board, id: string) => void;
  toggleImportant?: (id: string, value: boolean) => Promise<boolean>;
  toggleStatus: (
    id: string,
    value: boolean,
    completedAt?: Date | null,
    completionSource?: "manual" | "realtime",
  ) => Promise<void>;
  finalBoard?: Board[];
  searchText?: string;
  setSearchText?: Dispatch<SetStateAction<string>>;
  uiBoard?: Board[];
  saveBoard?: (id: string) => Promise<void>;
  handleUpdateTodo?: (list: Todo, title: string) => Promise<void>;
  systemBoards?: Record<string, SystemBoard>;
  setSystemBoards?: Dispatch<SetStateAction<Record<string, SystemBoard>>>;
  newBoardKey?: string | null;
  setNewBoardKey?: React.Dispatch<React.SetStateAction<string | null>>;
  removeFromMyDay?: (id: string) => Promise<void>;
  moveTodo?: (todoId: string, boardKey: string) => Promise<void>;
  setDeadline?: (id: string, date: Date | null) => Promise<boolean>;
  handleFile?: (file: File, id: string) => Promise<void>;
  uploadFile?: (file: File) => Promise<any>;
  removeLink?: (id: string) => Promise<void>;
  handleToggleImportant?: (id: string, value: boolean) => Promise<void>;
  completeTodoManually: (id: string, completedAt: Date) => Promise<void>;
  saveTrackedTime?: (id: string, seconds: number) => Promise<void>;
  saveTodoTimeEntry: (
    todoId: string,
    date: string,
    durationSeconds: number,
  ) => Promise<any>;
  todoEntries: TodoEntry[];
  setTodoEntries: Dispatch<SetStateAction<TodoEntry[]>>;

  createAITodos: (parent: Todo, steps: any[]) => Promise<void>;
  activeTool: string | null;
  setActiveTool: Dispatch<SetStateAction<string | null>>;
  createTodo: (todo: CreateTodoInput, shouldReload?: boolean) => Promise<any>;
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
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
