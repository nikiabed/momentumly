"use client";
import { CreateTodoInput, Todo, TodoList, TodoUpdate } from "@/app/types/todo";
import { AIStep } from "@/app/types/ai";
import { useEffect, useState } from "react";
import { todoService, uploadService } from "../services";
import { Board } from "@/app/types/board";
import { BOARD_KEYS } from "../constants";
import { getDateKey } from "../date";
import { useSession } from "next-auth/react";
import { TodoEntry } from "@/app/types";
import { useFeedback } from "@/app/feedback";

export const useTodos = (activeBoard: string) => {
  const [todo, setTodo] = useState<TodoList>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [todoEntries, setTodoEntries] = useState<TodoEntry[]>([]);
  const { status } = useSession();
  const { todoCompleted, coinEarned } = useFeedback();

  useEffect(() => {
    if (status === "authenticated") {
      loadTodos();
    }

    if (status === "unauthenticated") {
      setTodo([]);
    }
  }, [status]);

  const loadTodos = async () => {
    try {
      const data = await todoService.getTodos();
      setTodo(data);
    } catch (err) {
      console.error("Load todos failed:", err);
    }
  };

  const updateTodo = async (id: string, changes: TodoUpdate) => {
    try {
      const updated = await todoService.update(id, changes);
      setTodo((prev) => {
        const next = prev.map((t) => (t._id === id ? updated.todo : t));
        return next;
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const createTodo = async (todo: CreateTodoInput) => {
    const finalBoardKey =
      activeBoard === BOARD_KEYS.IMPORTANT
        ? BOARD_KEYS.MY_DAY
        : (todo.boardKey ?? activeBoard);
    if (!finalBoardKey) {
      throw new Error("Board key is required");
    }
    try {
      const isMyDay =
        activeBoard === BOARD_KEYS.MY_DAY ||
        activeBoard === BOARD_KEYS.IMPORTANT;

      const result = await todoService.create({
        ...todo,
        boardKey: finalBoardKey,
        status: todo.status ?? false,
        isImportant: todo.isImportant ?? activeBoard === BOARD_KEYS.IMPORTANT,
        isEdit: false,
        myDayDate: isMyDay ? getDateKey(new Date()) : null,
      });

      await loadTodos();
      return result;
    } catch (err) {
      console.error("Create todo failed:", err);
    }
  };

  const createAITodos = async (parent: Todo, steps: AIStep[]) => {
    console.log("CREATE AI CHILDREN", {
      parent,
      steps,
    });

    const boardKey = parent.boardKey ?? activeBoard;

    if (!boardKey) {
      console.error("No boardKey found for child todo");
      return;
    }

    for (const step of steps) {
      console.log("CREATING CHILD", step);

      await todoService.create({
        title: step.title,
        item: step.description || step.title,
        status: false,
        isImportant: false,
        boardKey,
        parentTodoId: parent._id,
        isAIStep: true,
        isEdit: false,
        myDayDate: parent.myDayDate ?? null,
      });
    }

    await loadTodos();
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoService.remove(id);

      setTodo((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Delete todo failed:", err);
    }
  };

  const toggleImportant = async (id: string, value: boolean) => {
    return updateTodo(id, {
      isImportant: value,
    });
  };

  const toggleStatus = async (
    id: string,
    value: boolean,
    completedAt: Date | null = null,
    completionSource: "realtime" | "manual" = "realtime",
  ) => {
    const success = await updateTodo(id, {
      status: value,
      completedAt: value ? (completedAt ?? new Date()) : null,
      completionSource: value ? completionSource : "realtime",
    });

    if (success && value) {
      todoCompleted();

      setTimeout(() => {
        coinEarned(10);
      }, 2000);
    }
  };

  const completeTodoManually = async (id: string, completedAt: Date) => {
    const success = await updateTodo(id, {
      status: true,
      completedAt,
      completionSource: "manual",
    });

    if (success) {
      todoCompleted();
    }
  };

  type AddTodoBoard = Pick<Board, "_id" | "title">;

  const addTodo = async (title: string, item: AddTodoBoard) => {
    await createTodo({
      title,
      status: false,
      isImportant: item.title === BOARD_KEYS.IMPORTANT,
      item: item.title,
      boardKey: item._id,
    });

    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    item: Board,
  ) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await addTodo(inputValue, item);
  };

  const handleUpdateTodo = async (list: Todo, title: string) => {
    await updateTodo(list._id, {
      title: title,
      isEdit: false,
    });
  };

  const handleIsEdit = (id: string, value: boolean) => {
    setTodo((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isEdit: value,
            }
          : item,
      ),
    );
  };

  const moveToMyDay = async (id: string) => {
    await updateTodo(id, {
      myDayDate: getDateKey(new Date()),
    });
  };

  const removeFromMyDay = async (id: string) => {
    await updateTodo(id, {
      myDayDate: null,
    });
  };

  const moveTodo = async (id: string, boardKey: string) => {
    const changes =
      boardKey === BOARD_KEYS.MY_DAY
        ? {
            myDayDate: getDateKey(new Date()),
          }
        : {
            boardKey,
            myDayDate: null,
          };

    await updateTodo(id, changes);
  };

  const setDeadline = async (id: string, date: Date | null) =>
    await updateTodo(id, {
      deadline: date,
    });

  const handleFile = async (file: File, id: string) => {
    try {
      const url = await uploadService.upload(file);

      await todoService.update(id, {
        attachment: url,
      });

      setTodo((prev) =>
        prev.map((t) => (t._id === id ? { ...t, attachment: url } : t)),
      );
    } catch (err) {
      console.error("Handle file failed:", err);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      return await uploadService.upload(file);
    } catch (err) {
      console.error("Upload file failed:", err);
      return null;
    }
  };

  const removeLink = async (id: string) => {
    try {
      await todoService.update(id, {
        attachment: "",
      });
      setTodo((prev) =>
        prev.map((t) => (t._id === id ? { ...t, attachment: "" } : t)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const saveTrackedTime = async (id: string, seconds: number) => {
    console.log("🔥 SAVE TRACKED TIME:", {
      id,
      seconds,
    });

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackedTimeSeconds: seconds,
        }),
      });

      const data = await res.json();

      console.log("🔥 SAVE RESPONSE:", res.status, data);

      if (!res.ok) {
        throw new Error("Failed to save tracked time");
      }
    } catch (error) {
      console.error("❌ Error saving tracked time:", error);
    }
  };

  const saveTodoTimeEntry = async (
    todoId: string,
    date: string,
    durationSeconds: number,
  ) => {
    const res = await fetch("/api/time-entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoId,
        date,
        durationSeconds,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save todo time entry");
    }

    return res.json();
  };

  const fetchTodoTimeEntries = async () => {
    try {
      const res = await fetch("/api/time-entries");

      if (!res.ok) {
        throw new Error("Failed to fetch todo time entries");
      }

      const data = await res.json();

      setTodoEntries(data.entries ?? []);
    } catch (error) {
      console.error("Error fetching todo time entries:", error);
    }
  };

  useEffect(() => {
    fetchTodoTimeEntries();
  }, []);

  return {
    todo,
    setTodo,
    inputValue,
    setInputValue,
    addTodo,
    handleChange,
    handleSubmit,
    handleUpdateTodo,
    handleIsEdit,
    moveToMyDay,
    removeFromMyDay,
    moveTodo,
    setDeadline,
    handleFile,
    uploadFile,
    deleteTodo,
    toggleImportant,
    toggleStatus,
    removeLink,
    completeTodoManually,
    saveTrackedTime,
    saveTodoTimeEntry,
    todoEntries,
    setTodoEntries,
    createAITodos,
    createTodo,
  };
};
