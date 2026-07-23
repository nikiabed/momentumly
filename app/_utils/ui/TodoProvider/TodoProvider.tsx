"use client";
import { useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { BOARD_KEYS, BOARD_LABELS } from "../../constants";
import { Todo, Board } from "@/app/types";
import { useBoards } from "../../hooks/useBoards";
import { useTodos } from "../../hooks/useTodos";
import { useBoardView } from "../../hooks/useBoardView";

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
  const [systemBoards, setSystemBoards] = useState<Record<string, Board>>({
    important: {
      _id: BOARD_KEYS.IMPORTANT,
      title: BOARD_LABELS.important,
      boardKey: BOARD_KEYS.IMPORTANT,
      icon: "Star1",
      color: BOARD_KEYS.IMPORTANT,
      order: 2,
      editable: false,
      isEdit: false,
      theme: "fire",
      state: false,
      filter: (todo: any) => todo.isImportant,
    },

    search: {
      _id: BOARD_KEYS.SEARCH,
      title: BOARD_LABELS.search,
      boardKey: BOARD_KEYS.SEARCH,
      icon: "SearchNormal1",
      color: BOARD_KEYS.SEARCH,
      order: 0,
      editable: false,
      isEdit: false,
      theme: "purple",
      state: false,
      filter: (todo: any) =>
        searchText &&
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
    },
  });

  const todos = useTodos(activeBoard);
  const boards = useBoards(activeBoard, setActiveBoard);
  const view = useBoardView(
    boards.boardList,
    todos.todo,
    activeBoard,
    searchText,
    systemBoards,
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
    console.log("CLICK BOARD", board);
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
      systemBoards,
      setSystemBoards,
      searchText,
      setSearchText,
    }),
    [
      todos,
      boards,
      view,
      selectBoard,
      setActiveBoard,
      activeBoard,
      handleToggleImportant,
      systemBoards,
      setSystemBoards,
      searchText,
      setSearchText,
    ],
  );
  console.log("PROVIDER SEARCH", searchText);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
