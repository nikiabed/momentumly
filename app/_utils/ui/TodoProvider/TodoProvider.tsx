"use client";
import {
  ListItemProps,
  ListItems,
  todoDate,
  TodoListType,
  TodoType,
} from "@/app/todo/_common/Todo/Todo.const";
import { useEffect, useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { items, sidebar } from "@/app/todo/_common/Sidebar/Sidebar.const";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todo, setTodo] = useState<TodoListType>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState(items);
  const [editedBoard, setEditedBoard] = useState("");
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [activeBoard, setActiveBoard] = useState<string>("myDay");
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  type Board = {
    title: string;
    state: boolean;
    _id: string;
    icon: string;
    color: string;
    boardKey: string;
    order: number;
    editable: boolean;
    isEdit: boolean;
    filter: (todo: any) => any;
  };

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const saveTodo = localStorage.getItem("todo");
  //   // const saveFocused = localStorage.getItem("focused");
  //   // const saveBoardList = localStorage.getItem("boardList");
  //   if (saveTodo) {
  //     setTodo(JSON.parse(saveTodo));
  //   }

  //   // if (saveBoardList) {
  //   //   setBoardList(JSON.parse(saveBoardList));
  //   // }

  //   // if (saveFocused) {
  //   //   const parsedFocused = JSON.parse(saveFocused);
  //   //   const rehydrateFocused = parsedFocused.map((item: ListItemProps) => ({
  //   //     ...item,
  //   //     filter: (todo: TodoType) => {
  //   //       if (item.title === sidebar.All)
  //   //         return (
  //   //           (todo.item === item.title ||
  //   //             todo.item === sidebar.myDay ||
  //   //             todo.item === sidebar.important) &&
  //   //           !todo.status
  //   //         );
  //   //       if (item.title === sidebar.complete) return todo.status;
  //   //       if (item.title === sidebar.important) return todo.isImportant;
  //   //       if (item.title === sidebar.myDay)
  //   //         return (
  //   //           todo.item === sidebar.myDay &&
  //   //           !todo.status &&
  //   //           todo.date === todoDate
  //   //         );

  //   //       return todo.itemId === item.id;
  //   //     },
  //   //   }));
  //   //   setFocused(() => rehydrateFocused);
  //   // } else {
  //   //   setFocused(() => items);
  //   // }
  // }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   localStorage.setItem("todo", JSON.stringify(todo));
  // }, [todo]);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   localStorage.setItem("focused", JSON.stringify(focused));
  // }, [focused]);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   localStorage.setItem("boardList", JSON.stringify(boardList));
  // }, [boardList]);

  const uiBoard = useMemo(() => {
    const boards = [...boardList];
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
      filter: (todo: any) => todo.isImportant,
    };

    const exists = boardList?.some((f) => f.title === "Important");
    if (hasImportant && !exists) {
      const index = boards.findIndex((b) => b.order === 2);
      boards.splice(index, 0, importantView);
    }

    return boards;
  }, [boardList, todo]);

  // const importantView = {
  //   _id: "important",
  //   title: "Important",
  //   boardKey: "important",
  //   icon: "Star1",
  //   color: "important",
  //   state: activeBoard === "important",
  //   order: 2,
  //   filter: (todo: any) => todo.isImportant,
  // };
  // const searchView = {
  //   _id: "search",
  //   title: "Search",
  //   boardKey: "search",
  //   icon: "SearchNormal1",
  //   color: "search",
  //   state: activeBoard === "search",
  //   order: 0,
  //   filter: (todo: any) =>
  //     todo.title?.toLowerCase().includes(searchText.toLowerCase()),
  // };
  // const hasImportant = todo.some((t) => t.isImportant);
  // const finalBoard = [...boardList];
  // if (hasImportant && !exists) {
  //   const index = finalBoard.findIndex((b) => b.order === 2);
  //   finalBoard.splice(index, 0, importantView);
  // }
  // if (searchText.trim()) {
  //   finalBoard.unshift(searchView);
  // }

  useEffect(() => {
    loadBoards();
  }, []);

  function selectBoard(board: Board, id: string) {
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
    setLoading(true);
    const res = await fetch("/api/boards");
    setBoardList(await res.json());
    setLoading(false);
  }

  async function createBoard(name: string) {
    await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    await loadBoards();
  }

  async function loadTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodo(data);
  }

  async function saveBoard(id: string) {
    await fetch("/api/boards/title", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title: editedBoard,
      }),
    });

    await loadBoards();
  }

  async function createTodo(todo: {
    title: string;
    status: boolean;
    isImportant: boolean;
    item: string;
    boardKey?: string;
  }) {
    await fetch("/api/todos", {
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
      }),
    });

    await loadTodos();
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function deleteTodo(id: string) {
    await fetch("/api/todos/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    await loadTodos();
  }

  async function toggleImportant(id: string, value: boolean) {
    await fetch("/api/todos/important", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        isImportant: value,
      }),
    });

    await loadTodos();
    const importantExists = todo.some((t) => t._id !== id && t.isImportant);
    if (activeBoard === "important" && !importantExists) {
      setActiveBoard("myDay");
    }
  }

  async function toggleStatus(id: string, value: boolean) {
    await fetch("/api/todos/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: value,
      }),
    });

    await loadTodos();
  }

  const addTodo = async (title: string, item: ListItemProps) => {
    await createTodo({
      title,
      status: false,
      isImportant: item.title === sidebar.important,
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

 const handleNewChange = async (id: string) => {
  const newTitle = editedBoard;
  setTodo((prev) =>
    prev.map((t) =>
      t._id === id
        ? { ...t, title: newTitle, isEdit: false }
        : t
    )
  );

  await fetch("/api/todos/title", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title: newTitle,
    }),
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

  const handleBoardSubmit = (index: string, text: string) => {
    const newList = focused.map((l: ListItemProps) => {
      if (index === l._id) {
        l.title = text;
        l.filter = (todo: TodoType) => todo.itemId === index;
        return l;
      }
      return l;
    });
    setFocused(newList);
    handleBoardIsEdit(index);
    const newBoard = text;
    setBoardList((prev: any) => {
      const old = [...prev];
      return [...old, newBoard];
    });
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
    setFocused((prev: ListItemProps[]) =>
      prev.map((item: ListItemProps) =>
        item.id === index ? { ...item, isEdit: !item.isEdit } : item,
      ),
    );
  };

  async function handleNewList() {
    const last = Math.max(...boardList.map((b) => b.order), 0);
    await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: "untitled",
        boardKey: `board-${Date.now()}`,
        state: false,
        icon: "HamburgerMenu",
        color: "newList",
        editable: true,
        isEdit: true,
        order: last + 1,
      }),
    });

    await loadBoards();
  }

  async function removeList(id: string) {
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

    if (activeBoard === id) {
      setActiveBoard("myDay");
    }
  }

  const moveToMyDay = (index: string) => {
    setTodo((prev: TodoListType) => {
      const old = [...prev];
      old.map((todo: TodoType) => {
        if (todo.id === index) {
          todo.date = todoDate;
          todo.item = items[0].title;
        }
      });
      return old;
    });
  };

  const value = useMemo(
    () => ({
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
      handleNewChange,
      handleIsEdit,
      focused,
      setFocused,
      handleBoardSubmit,
      handleBoardInput,
      handleBoardClick,
      handleNewList,
      handleBoardIsEdit,
      handleBoardEditable,
      removeList,
      moveToMyDay,
    }),
    [
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
      handleNewChange,
      handleIsEdit,
      focused,
      setFocused,
      handleBoardSubmit,
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
