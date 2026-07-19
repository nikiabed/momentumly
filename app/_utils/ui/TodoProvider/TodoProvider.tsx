"use client";
import { useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { BOARD_KEYS } from "../../constants";
import { Todo, Board } from "@/app/types";
import { useBoards } from "../../hooks/useBoards";
import { useTodos } from "../../hooks/useTodos";
import { useBoardView } from "../../hooks/useBoardView";

type SystemBoard = {
  _id: string;
  theme: string;
  title: string;
  state: boolean;
  icon: string;
  color: string;
  boardKey: string;
  isEdit: boolean;
  editable: boolean;
  filter: (todo: any) => any;
};

export type TodoUpdate = Partial<
  Pick<
    Todo,
    | "title"
    | "status"
    | "isImportant"
    | "boardKey"
    | "myDayDate"
    | "deadline"
    | "attachment"
    | "completedAt"
  >
>;

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [activeBoard, setActiveBoard] = useState<string>("myDay");
  const [searchText, setSearchText] = useState("");

  const todos = useTodos(activeBoard);
  const boards = useBoards(activeBoard, setActiveBoard);
  const view = useBoardView(
    boards.boardList,
    todos.todo,
    activeBoard,
    searchText,
  );
  const handleToggleImportant = async (id: string, value: boolean) => {
    const success = await todos.toggleImportant(id, value);
    if (!success) return;
    const remaining = todos.todo.some((t) => t._id !== id && t.isImportant);
    if (activeBoard === BOARD_KEYS.IMPORTANT && !remaining) {
      setActiveBoard(BOARD_KEYS.MY_DAY);
    }
  };
  const selectBoard = (board: Board, id: string) => {
    if (searchText) {
      setActiveBoard?.("search");
    }
    setActiveBoard?.(board.boardKey);
    boards.setBoardList((prev) =>
      prev.map((board) => ({
        ...board,
        state: board._id === id,
      })),
    );
  };

  const value = useMemo(
    () => ({
      ...todos,
      ...boards,
      ...view,
      handleToggleImportant,
      selectBoard,
      activeBoard,
      setActiveBoard,
    }),
    [
      todos,
      boards,
      view,
      selectBoard,
      setActiveBoard,
      activeBoard,
      handleToggleImportant,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
