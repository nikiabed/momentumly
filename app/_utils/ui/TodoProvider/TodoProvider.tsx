"use client";
import {
  ListItemProps,
  ListItems,
  todoData,
  todoDate,
  TodoListType,
  TodoType,
} from "@/app/todo/_common/Todo/Todo.const";
import { useEffect, useMemo, useState } from "react";
import { TodoContext } from "../../hooks";
import { items, sidebar } from "@/app/todo/_common/Sidebar/Sidebar.const";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todo, setTodo] = useState<TodoListType>(todoData);
  const [inputValue, setInputValue] = useState<string>("");
  const [editedTask, setEditedTask] = useState<string>("");
  const [focused, setFocused] = useState(items);
  const [boardValue, setBoardValue] = useState("");
  const [boardList, setBoardList] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saveTodo = localStorage.getItem("todo");
    const saveFocused = localStorage.getItem("focused");
    const saveBoardList = localStorage.getItem("boardList");
    if (saveTodo) {
      setTodo(JSON.parse(saveTodo));
    }

    if (saveBoardList) {
      setBoardList(JSON.parse(saveBoardList));
    }

    if (saveFocused) {
      const parsedFocused = JSON.parse(saveFocused);
      const rehydrateFocused = parsedFocused.map((item: ListItemProps) => ({
        ...item,
        filter: (todo: TodoType) => {
          if (item.title === sidebar.All)
            return (
              (todo.item === item.title ||
                todo.item === sidebar.myDay ||
                todo.item === sidebar.important) &&
              !todo.status
            );
          if (item.title === sidebar.complete) return todo.status;
          if (item.title === sidebar.important) return todo.isImportant;
          if (item.title === sidebar.myDay)
            return (
              todo.item === sidebar.myDay &&
              !todo.status &&
              todo.date === todoDate
            );

          return todo.itemId === item.id;
        },
      }));
      setFocused(() => rehydrateFocused);
    } else {
      setFocused(() => items);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("focused", JSON.stringify(focused));
  }, [focused]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("boardList", JSON.stringify(boardList));
  }, [boardList]);

  const addTodo = (title: string, item: ListItemProps) => {
    let newTask = {
      id: crypto.randomUUID(),
      title: title,
      status: false,
      isEdit: false,
      date: todoDate,
      isImportant: false,
      item: item.title,
      itemId: item.id,
    };
    setTodo((prev: any) => {
      if (item.title === sidebar.important) {
        newTask.isImportant = true;
      }
      let clone = [...prev, newTask];
      return clone;
    });
    setInputValue("");
    console.log(item.id);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any, item: ListItemProps) => {
    e.preventDefault();
    if (inputValue.length != 0) {
      addTodo(inputValue, item);
    }
  };

  const handleDelete = (index: string) => {
    setTodo((list: any) => {
      return list.filter((l: any) => l.id !== index);
    });
  };

  const changeTaskState = (index: string) => {
    setTodo((prev: any) =>
      prev.map((item: any) =>
        item.id === index ? { ...item, status: !item.status } : item,
      ),
    );
  };

  const handleNewChange = (index: string) => {
    const newList = todo.map((l: any) => {
      if (index === l.id) {
        l.title = editedTask;
        return l;
      }
      return l;
    });
    setTodo(newList);
    handleIsEdit(index);
  };

  const handleEditedTask = (e: any) => {
    setEditedTask(e.target.value);
  };

  const handleIsEdit = (index: string) => {
    setTodo((prev: TodoListType) =>
      prev.map((item: any) =>
        item.id === index ? { ...item, isEdit: !item.isEdit } : item,
      ),
    );
  };

  const updateFocused = (list: TodoListType) => {
    let newItem = {
      title: sidebar.important,
      state: false,
      id: crypto.randomUUID(),
      icon: "Star1",
      todos: [],
      color: "important",
      isEdit: false,
      editable: false,
      filter: (todo: TodoType) => todo.isImportant,
    };
    const exists = focused.find(
      (focus: ListItemProps) => focus.title == sidebar.important,
    );

    const importantCount = list.filter((l: any) => l.isImportant).length;
    const open = focused.find((f: ListItemProps) => f.state);
    setFocused((prev: any) => {
      let old = [...prev];
      if (exists) {
        if (importantCount == 0) {
          old.splice(1, 1);
          let today = old[0];
          if (open?.title == sidebar.important) {
            today = { ...today, state: true };
          }
          old.splice(0, 1, today);
          return old;
        } else {
          return old;
        }
      } else {
        old.splice(1, 0, newItem);
        return old;
      }
    });
  };

  const handleImportant = (index: string) => {
    const newTodos = todo.map((item: any) =>
      item.id === index ? { ...item, isImportant: !item.isImportant } : item,
    );
    setTodo(newTodos);
    updateFocused(newTodos);
  };

  const handleBoardInput = (e: any) => {
    setBoardValue(e.target.value);
  };

  const handleBoardEditable = (index: string) => {
    setFocused((prev: ListItemProps[]) => {
      return prev.map((item: ListItemProps) => {
        if (item.id === index && item.editable && !item.isEdit) {
          return { ...item, isEdit: true };
        }
        return item;
      });
    });
  };

  const handleBoardSubmit = (index: string, text: string) => {
    const newList = focused.map((l: ListItemProps) => {
      if (index === l.id) {
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

  const handleNewList = () => {
    const newItem = {
      title: sidebar.untitled,
      state: true,
      id: crypto.randomUUID(),
      icon: "HamburgerMenu",
      color: "newList",
      isEdit: true,
      editable: true,
      filter: (todo: TodoType) => todo.item === sidebar.untitled,
    };
    setFocused &&
      setFocused((prev: any) => {
        let old = [...prev];
        const newList = old.map((item: any) => {
          return { ...item, state: false };
        });
        return [...newList, newItem];
      });
  };

  const removeList = (index: string) => {
    setFocused((items: ListItems) => {
      const old = [...items];
      const removeIndex = old.findIndex(
        (item: ListItemProps) => item.id === index,
      );
      old.splice(removeIndex, 1);
      old[removeIndex - 1] = {
        ...old[removeIndex - 1],
        state: true,
      };
      return old;
    });
  };

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
      todo,
      setTodo,
      inputValue,
      addTodo,
      handleChange,
      handleDelete,
      changeTaskState,
      handleSubmit,
      handleNewChange,
      setEditedTask,
      handleEditedTask,
      handleIsEdit,
      handleImportant,
      focused,
      setFocused,
      handleBoardSubmit,
      handleBoardInput,
      boardValue,
      handleBoardClick,
      handleNewList,
      handleBoardIsEdit,
      handleBoardEditable,
      removeList,
      moveToMyDay,
    }),
    [
      todo,
      setTodo,
      inputValue,
      addTodo,
      handleChange,
      handleDelete,
      changeTaskState,
      handleSubmit,
      handleNewChange,
      setEditedTask,
      handleEditedTask,
      handleIsEdit,
      handleImportant,
      focused,
      setFocused,
      handleBoardSubmit,
      handleBoardInput,
      boardValue,
      handleBoardClick,
      handleNewList,
      handleBoardIsEdit,
      handleBoardEditable,
      removeList,
      moveToMyDay
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
