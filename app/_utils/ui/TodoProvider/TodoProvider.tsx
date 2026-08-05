"use client";
import { useEffect, useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { BOARD_KEYS, BOARD_LABELS } from "../../constants";
import { Todo, Board } from "@/app/types";
import { useBoards } from "../../hooks/useBoards";
import { useTodos } from "../../hooks/useTodos";
import { useBoardView } from "../../hooks/useBoardView";
import { userPreferenceService } from "../../services";
import { ActiveTimer } from "@/app/todo/_common";

export type SystemBoard = Board & {
  filter: (todo: Todo, searchText?: string) => boolean;
};
export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeBoard, setActiveBoard] = useState<string>("myDay");
  const [searchText, setSearchText] = useState("");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [systemBoards, setSystemBoards] = useState<Record<string, SystemBoard>>(
    {
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
        filter: (todo: Todo) => todo.isImportant,
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
        filter: (todo, searchText = "") =>
          todo.title.toLowerCase().includes(searchText.toLowerCase()),
      },
    },
  );
  const isTimerRunning = activeTimer?.status === "running";

  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setActiveTimer((prev) => {
        if (!prev || prev.status !== "running") return prev;

        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const todos = useTodos(activeBoard);
  const boards = useBoards(activeBoard, setActiveBoard);
  const view = useBoardView(
    boards.boardList,
    todos.todo,
    activeBoard,
    searchText,
    systemBoards,
  );

  const startTimer = (todoId: string, initialSeconds = 0) => {
    setActiveTimer({
      todoId,
      elapsedSeconds: initialSeconds,
      startedAt: Date.now(),
      status: "running",
    });
  };

  const pauseTimer = () => {
    setActiveTimer((prev) =>
      prev
        ? {
            ...prev,
            status: "paused",
          }
        : null,
    );
  };

  const resumeTimer = () => {
    setActiveTimer((prev) =>
      prev
        ? {
            ...prev,
            status: "running",
            startedAt: Date.now(),
          }
        : null,
    );
  };

  const resetTimer = () => {
    setActiveTimer(null);
  };
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

    setActiveTool(null);
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const data = await userPreferenceService.getPreferences();
        setSystemBoards((prev) => ({
          ...prev,
          important: {
            ...prev.important,
            theme: data.systemBoards?.important?.theme ?? prev.important.theme,
          },
          search: {
            ...prev.search,
            theme: data.systemBoards?.search?.theme ?? prev.search.theme,
          },
        }));
      } catch (err) {
        console.log(err);
      }
    };

    loadPreferences();
  }, []);



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
      startTimer,
      pauseTimer,
      resumeTimer,
      activeTimer,
      setActiveTimer,
      resetTimer,
      activeTool,
      setActiveTool,
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
      startTimer,
      pauseTimer,
      resumeTimer,
      activeTimer,
      setActiveTimer,
      resetTimer,
      activeTool,
      setActiveTool,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
