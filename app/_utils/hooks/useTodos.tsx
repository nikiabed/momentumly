"use client";
import { TodoList } from "@/app/types/todo";
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
      setTodo(data);
    } catch (err) {
      console.error("Load todos failed:", err);
    }
  };

  const updateTodo = async (id: string, changes: TodoUpdate) => {
    try {
      await todoService.update(id, changes);
      setTodo((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...changes } : t)),
      );
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
      await todoService.create({
        ...todo,
        boardKey: activeBoard,
        status: false,
        isImportant: false,
        isEdit: false,
        myDayDate:
          activeBoard === BOARD_KEYS.MY_DAY ? getDateKey(new Date()) : null,
      });
      await loadTodos();
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

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: any, item: Board) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await addTodo(inputValue, item);
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    await updateTodo(id, {
      title,
    });
  };

  const handleIsEdit = (id: string) => {
    setTodo((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              isEdit: true,
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
