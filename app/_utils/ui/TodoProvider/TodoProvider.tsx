"use client";
import { useEffect, useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { items } from "@/app/todo/_common/Sidebar/Sidebar.const";
import { useSession } from "next-auth/react";
import { getDateKey } from "../../date";
import { BOARD_KEYS } from "../../constants";
import { boardService, todoService, uploadService } from "../../services";
import { TodoList, Todo, BoardList, Board } from "@/app/types";

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
  const [todo, setTodo] = useState<TodoList>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState(items);
  const [editedBoard, setEditedBoard] = useState("");
  const [boardList, setBoardList] = useState<BoardList>([]);
  const [activeBoard, setActiveBoard] = useState<string>("myDay");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    loadBoards();
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

  const selectBoard = (board: Board, id: string) => {
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
  };

  const loadBoards = async () => {
    try {
      setLoading(true);
      const data = await boardService.getBoards();
      setBoardList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (name: string) => {
    try {
      await boardService.create({
        name,
      });
      await loadBoards();
    } catch (err) {
      console.error("Create board failed", err);
    }
  };

  const saveBoard = async (id: string) => {
    try {
      const newTitle = editedBoard;
      setFocused((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, title: newTitle, isEdit: false } : b,
        ),
      );

      await boardService.updateTitle(id, newTitle);
      await loadBoards();
    } catch (err) {
      console.error("Save board failed:", err);
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
    const success = await updateTodo(id, {
      isImportant: value,
    });
    if (!success) return;
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

  const handleNewList = async () => {
    const last = Math.max(...boardList.map((b: Board) => b.order ?? 0), 0);
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
      const updated = prev.map((b: Board) => ({ ...b, state: false }));
      return [...updated, newBoard];
    });

    await boardService.create({
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
    });

    setNewBoardKey(key);
    setActiveBoard(key);
    await loadBoards();
  };

  const removeList = async (id: string) => {
    try {
      const index = boardList.findIndex((b) => b._id === id);
      const nextBoard = boardList[index - 1] || boardList[0];
      await boardService.remove(id);
      await loadBoards();
      if (activeBoard === boardList[index]?.boardKey) {
        setActiveBoard(nextBoard?.boardKey || "myDay");
      }
    } catch (err) {
      console.error("Remove board failed:", err);
    }
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
