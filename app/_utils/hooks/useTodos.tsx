"use client";
import { Todo, TodoList } from "@/app/types/todo";
import { useEffect, useState } from "react";
import { TodoUpdate } from "../ui";
import { todoService, uploadService } from "../services";
import { Board } from "@/app/types/board";
import { BOARD_KEYS } from "../constants";
import { getDateKey } from "../date";

export function useTodos(activeBoard: string) {
  const [todo, setTodo] = useState<TodoList>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getTodos();
      console.log("LOADED TODOS AFTER CREATE", data);

      setTodo(data);
    } catch (err) {
      console.error("Load todos failed:", err);
    }
    console.log("LOAD TODOS RESULT", todo);
  };

  const updateTodo = async (id: string, changes: TodoUpdate) => {
    try {
      const updated = await todoService.update(id, changes);

      console.log("UPDATED FROM API", updated.todo);

      setTodo((prev) => {
        const next = prev.map((t) => (t._id === id ? updated.todo : t));
        console.log(
          "STATE AFTER UPDATE",
          next.find((t) => t._id === id),
        );

        return next;
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const createTodo = async (todo: {
    title: string;
    status: boolean;
    isImportant: boolean;
    item: string;
    boardKey?: string;
  }) => {
    try {
      console.log("CREATE TODO", todo.title);
      const isMyDay =
        activeBoard === BOARD_KEYS.MY_DAY ||
        activeBoard === BOARD_KEYS.IMPORTANT;
      const result = await todoService.create({
        ...todo,
        boardKey:
          activeBoard === BOARD_KEYS.IMPORTANT
            ? BOARD_KEYS.MY_DAY
            : activeBoard,
        status: false,
        isImportant: activeBoard === BOARD_KEYS.IMPORTANT ? true : false,
        isEdit: false,
        myDayDate: isMyDay ? getDateKey(new Date()) : null,
      });
      console.log("result", result);

      await loadTodos();
      console.log("🔥 LOAD TODOS CALLED");
    } catch (err) {
      console.error("Create todo failed:", err);
    }
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

  const toggleStatus = async (id: string, value: boolean) => {
    await updateTodo(id, {
      status: value,
    });
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

  const handleSubmit = async (e: any, item: Board) => {
    e.preventDefault();
    console.log("🔥 HANDLE SUBMIT");
    if (!inputValue.trim()) return;
    await addTodo(inputValue, item);
  };

  const handleUpdateTodo = async (list: Todo, title: string) => {
    const result = await updateTodo(list._id, {
      title: title,
      isEdit: false,
    });
    console.log("result", result);
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
  };
}
