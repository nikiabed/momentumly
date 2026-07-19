"use client";
import { Board, BoardList, Todo } from "@/app/types";
import { useMemo } from "react";
import { BOARD_LABELS } from "../constants";

export function useBoardView(
  boardList: BoardList,
  todo: Todo[],
  activeBoard: string,
  searchText: string,
) {
  const uiBoard = useMemo(() => {
    if (!boardList) return [];

    const hasImportant = todo.some((t) => t.isImportant);

    const importantView = {
      _id: BOARD_LABELS.important,
      title: BOARD_LABELS.important,
      boardKey: BOARD_LABELS.important,
      icon: "Star1",
      color: BOARD_LABELS.important,
      order: 2,
      state: activeBoard === BOARD_LABELS.important,
      editable: false,
      isEdit: false,
      theme: "fire",
      filter: (todo: any) => todo.isImportant,
    };

    const base = [...boardList];

    const exists = base.some((b) => b.boardKey === BOARD_LABELS.important);

    if (hasImportant && !exists) {
      base.splice(1, 0, importantView);
    }
    return [...base].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [boardList, todo, activeBoard]);

  const systemBoards: Record<string, Board> = {
    important: {
      _id: "important",
      title: "Important",
      boardKey: "important",
      icon: "Star1",
      color: "important",
      order: 2,
      editable: false,
      isEdit: false,
      filter: (todo: any) => todo.isImportant,
      theme: "fire",
      state: false,
    },
    search: {
      _id: "search",
      title: "Search",
      boardKey: "search",
      icon: "SearchNormal1",
      color: "search",
      editable: false,
      isEdit: false,
      order: 0,
      theme: "purple",
      filter: (todo: any) =>
        searchText &&
        todo.title.toLowerCase().includes(searchText.toLowerCase()),
      state: false,
    },
  };

  return {
    uiBoard,
    systemBoards,
  };
}
