"use client";
import { Board, BoardList, Todo } from "@/app/types";
import { useMemo, useState } from "react";
import { BOARD_KEYS, BOARD_LABELS } from "../constants";

export function useBoardView(
  boardList: BoardList,
  todo: Todo[],
  activeBoard: string,
  searchText: string,
  systemBoards: Record<string, Board>,
) {
  const uiBoard = useMemo(() => {
    if (!boardList) return [];

    const base = [...boardList];

    const hasImportant = todo.some((t) => t.isImportant);

    if (
      hasImportant &&
      !base.some((b) => b.boardKey === BOARD_KEYS.IMPORTANT)
    ) {
      base.splice(1, 0, systemBoards.important);
    }

    if (searchText) {
      base.unshift(systemBoards.search);
    }

    return base.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [boardList, todo, systemBoards, searchText]);

  return {
    uiBoard,
    systemBoards,
  };
}
