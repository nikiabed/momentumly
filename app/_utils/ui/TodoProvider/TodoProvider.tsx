"use client";
import {
  Boards,
  ListItemProps,
  TodoListType,
  TodoType,
} from "@/app/todo/_common/Todo/Todo.const";
import { useEffect, useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { items } from "@/app/todo/_common/Sidebar/Sidebar.const";
import { useSession } from "next-auth/react";
import { getDateKey } from "../../date";
import { BOARD_KEYS } from "../../constants";
import { todoService } from "../../services/todo.service";

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
    TodoType,
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
  const [todo, setTodo] = useState<TodoListType>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState(items);
  const [editedBoard, setEditedBoard] = useState("");
  const [boardList, setBoardList] = useState<Boards[]>([]);
  const [activeBoard, setActiveBoard] = useState<string>("myDay");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    loadBoards();
    loadTodos();
  }, []);

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

  const systemBoards: Record<string, Boards> = {
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

  const [systemBoardsState, setSystemBoardsState] = useState(systemBoards);

  const uiBoard = useMemo(() => {
    if (!boardList) return [];

    const hasImportant = todo.some((t) => t.isImportant);

    const importantView = {
      _id: "important",
      title: "Important",
      boardKey: "important",
      icon: "Star1",
      color: "important",
      order: 2,
      state: activeBoard === "important",
      editable: false,
      isEdit: false,
      theme: "fire",
      filter: (todo: any) => todo.isImportant,
    };

    const base = [...boardList];

    const exists = base.some((b) => b.boardKey === "important");

    if (hasImportant && !exists) {
      base.splice(1, 0, importantView);
    }
    return [...base].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [boardList, todo, activeBoard]);

  function selectBoard(board: Boards, id: string) {
    if (searchText) {
      setActiveBoard("search");
    }
    setActiveBoard(board.boardKey);
    setBoardList((prev) =>
      prev.map((board) => ({
        ...board,
        state: board._id === id,
      })),
    );
  }

  async function loadBoards() {
    try {
      setLoading(true);
      const res = await fetch("/api/boards");
      if (!res.ok) {
        throw new Error();
      }
      setBoardList(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createBoard(name: string) {
    try {
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      await loadBoards();
    } catch (err) {
      console.error("Create board failed:", err);
    }
  }

  async function loadTodos() {
    try {
      const res = await fetch("/api/todos");
      if (res.status === 401) {
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to load todos");
      }
      const data = await res.json();
      setTodo(data);
    } catch (err) {
      console.error(err);
    }
  }

  const saveBoard = async (id: string) => {
    try {
      const newTitle = editedBoard;

      setFocused((prev: any[]) =>
        prev.map((b) =>
          b._id === id ? { ...b, title: newTitle, isEdit: false } : b,
        ),
      );

      const res = await fetch("/api/boards/title", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: newTitle,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      await loadBoards();
    } catch (err) {
      console.error("Save board failed:", err);
    }
  };

  async function createTodo(todo: {
    title: string;
    status: boolean;
    isImportant: boolean;
    item: string;
    boardKey?: string;
  }) {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          boardKey: activeBoard,
          status: false,
          isImportant: false,
          isEdit: false,
          myDayDate:
            activeBoard === BOARD_KEYS.MY_DAY ? getDateKey(new Date()) : null,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      await loadTodos();
    } catch (err) {
      console.error(err);
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await todoService.remove(id);

      setTodo((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Delete todo failed:", err);
    }
  };

  const toggleImportant = async (id: string, value: boolean) => {
    await updateTodo(id, {
      isImportant: value,
    });
    const importantExists = todo.some((t) => t._id !== id && t.isImportant);
    if (activeBoard === BOARD_KEYS.IMPORTANT && !importantExists) {
      setActiveBoard(BOARD_KEYS.MY_DAY);
    }
  };

  const toggleStatus = async (id: string, value: boolean) => {
    await updateTodo(id, {
      status: value,
    });
  };

  const addTodo = async (title: string, item: ListItemProps) => {
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

  const handleSubmit = async (e: any, item: ListItemProps) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    await addTodo(inputValue, item);
  };

  const handleUpdateBoard = async (id: string) => {
    const newTitle = editedBoard;
    setTodo((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, title: newTitle, isEdit: false } : t,
      ),
    );
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

  const handleBoardInput = (e: any) => {
    setEditedBoard(e.target.value);
  };

  const handleBoardEditable = (id: string) => {
    setBoardList((prev) =>
      prev.map((board) =>
        board._id === id && board.editable
          ? {
              ...board,
              isEdit: true,
            }
          : board,
      ),
    );
  };

  const handleBoardClick = (index: string) => {
    setFocused &&
      setFocused((prev: any) =>
        prev.map((item: any) =>
          index === item.id
            ? { ...item, state: true }
            : { ...item, state: false },
        ),
      );
  };

  const handleBoardIsEdit = (index: string) => {
    setFocused((prev: any) =>
      prev.map((item: any) =>
        item.id === index ? { ...item, isEdit: !item.isEdit } : item,
      ),
    );
  };

  const [newBoardKey, setNewBoardKey] = useState<string | null>(null);

  async function handleNewList() {
    const last = Math.max(...boardList.map((b) => b.order ?? 0), 0);
    const key = `board-${Date.now()}`;
    const newBoard = {
      _id: key,
      title: "untitled",
      boardKey: key,
      state: false,
      icon: "HamburgerMenu",
      color: "newList",
      editable: true,
      isEdit: true,
      order: last + 1,
      theme: "purple",
    };

    setFocused((prev: any) => {
      const updated = prev.map((b: any) => ({ ...b, state: false }));
      return [...updated, newBoard];
    });

    await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: "بدون عنوان",
        boardKey: key,
        state: false,
        icon: "HamburgerMenu",
        color: "newList",
        editable: true,
        isEdit: true,
        order: last + 1,
        theme: "lavender",
        userId: session?.user?.id,
      }),
    });

    setNewBoardKey(key);

    setActiveBoard(key);
    await loadBoards();
  }

  async function removeList(id: string) {
    const index = boardList.findIndex((b) => b._id === id);

    const nextBoard = boardList[index - 1] || boardList[0];

    await fetch("/api/boards/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id,
      }),
    });

    await loadBoards();

    if (activeBoard === boardList[index].boardKey) {
      setActiveBoard(nextBoard?.boardKey || "myDay");
    }
  }

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
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      const data = await uploadRes.json();

      const todoRes = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attachment: data.url,
        }),
      });

      if (!todoRes.ok) {
        throw new Error("Failed to save attachment");
      }

      setTodo((prev: any) =>
        prev.map((t: any) =>
          t._id === id ? { ...t, attachment: data.url } : t,
        ),
      );
    } catch (err) {
      console.error("Handle file failed:", err);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      return data.url;
    } catch (err) {
      console.error("Upload file failed:", err);
      return null;
    }
  };

  const removeLink = async (id: string) =>
    await updateTodo(id, {
      attachment: "",
    });

  const value = useMemo(
    () => ({
      removeLink,
      uploadFile,
      handleFile,
      setDeadline,
      moveTodo,
      moveToMyDay,
      removeFromMyDay,
      newBoardKey,
      setNewBoardKey,
      setSystemBoardsState,
      systemBoardsState,
      handleUpdateTodo,
      saveBoard,
      uiBoard,
      setActiveBoard,
      searchText,
      setSearchText,
      loading,
      toggleStatus,
      toggleImportant,
      deleteTodo,
      activeBoard,
      selectBoard,
      createBoard,
      loadBoards,
      boardList,
      setBoardList,
      todo,
      setTodo,
      inputValue,
      addTodo,
      handleChange,
      handleSubmit,
      handleUpdateBoard,
      handleIsEdit,
      focused,
      setFocused,
      handleBoardInput,
      handleBoardClick,
      handleNewList,
      handleBoardIsEdit,
      handleBoardEditable,
      removeList,
    }),
    [
      removeLink,
      uploadFile,
      handleFile,
      setDeadline,
      moveTodo,
      removeFromMyDay,
      newBoardKey,
      setNewBoardKey,
      setSystemBoardsState,
      systemBoardsState,
      handleUpdateTodo,
      saveBoard,
      uiBoard,
      setActiveBoard,
      searchText,
      setSearchText,
      loading,
      toggleStatus,
      toggleImportant,
      deleteTodo,
      activeBoard,
      selectBoard,
      createBoard,
      boardList,
      setBoardList,
      loadBoards,
      todo,
      setTodo,
      inputValue,
      addTodo,
      handleChange,
      handleSubmit,
      handleUpdateBoard,
      handleIsEdit,
      focused,
      setFocused,
      handleBoardInput,
      handleBoardClick,
      handleNewList,
      handleBoardIsEdit,
      handleBoardEditable,
      removeList,
      moveToMyDay,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
