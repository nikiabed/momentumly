"use client";
import { TodoList } from "../TodoList";
import { Progress } from "../Progress";
import { TodoInput } from "../TodoInput";
import {
  BOARD_KEYS,
  BOARD_LABELS,
  getDateKey,
  isInMyDay,
  useTodoContext,
} from "@/app/_utils";
import { colors, Header } from "../../Header";
import { Lists } from "../Lists";
import { HamburgerMenu } from "iconsax-reactjs";
import { Board as BoardType } from "@/app/types";

export const Board = ({ item, sidebarOpen, setSidebarOpen }: any) => {
  const { todo, setTodo, boardList, searchText, systemBoards } =
    useTodoContext();

  const normalize = (key?: string) => key?.toLowerCase().replace(/\s/g, "");
  const currentBoard =
    systemBoards?.[item.boardKey] ??
    boardList.find((b) => b.boardKey === item.boardKey);
  const isAll = currentBoard?.boardKey === BOARD_KEYS.ALL;
  const isImportant = currentBoard?.boardKey === BOARD_KEYS.IMPORTANT;
  const isComplete = currentBoard?.boardKey === BOARD_KEYS.COMPLETE;
  const isMyDay = currentBoard?.boardKey === BOARD_KEYS.MY_DAY;
  const isSearch = currentBoard?.boardKey === BOARD_KEYS.SEARCH;

  const filteredTodos = todo.filter((t) => {
    if (!currentBoard) return false;
    if (isAll) return true;
    if (isImportant) return t.isImportant;
    if (isSearch) {
      return (
        searchText && t.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (isComplete) return t.status;
    if (isMyDay) {
      return isInMyDay(t);
    }
    return t.boardKey === currentBoard.boardKey;
  });

  const activeTodos = filteredTodos.filter((t) => !t.status);
  const completedTodos = filteredTodos.filter((t) => t.status);
  const searchTodos = todo
    .filter((t) => !t.status)
    .filter((t) =>
      t.title.toLowerCase().includes((searchText ?? "").toLowerCase()),
    );

  const isImage = currentBoard?.theme?.startsWith("img:");

  const bgStyle = isImage
    ? {
        backgroundImage: `url(${currentBoard?.theme.replace("img:", "")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  const bgClass = !isImage
    ? colors.find((c) => c.key === currentBoard?.theme)?.className
    : "";
  if (!currentBoard) return null;

  type BoardKey = keyof typeof BOARD_LABELS;

  if (!boardList?.length) {
    return <div>Loading boards...</div>;
  }

  console.log("SEARCH DEBUG", {
    item,
    currentBoard,
    searchText,
    todoCount: todo.length,
  });

  console.log("SEARCH TODOS", searchTodos);
  console.log("BOARD SEARCH", searchText);

  return (
    <div
      className={` flex-4 min-h-screen justify-center overflow-y-auto relative w-full ${bgClass}`}
      style={bgStyle}
    >
      <button
        className="md:hidden absolute  top-5
      right-4
      z-600
      shadow
      rounded-xl
      p-1"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <HamburgerMenu size={24} />
      </button>
      <div className="flex gap-4 flex-col min-h-screen py-5">
        <div className="shrink-0 px-16 flex flex-col gap-4 ">
          <Header item={currentBoard} todo={filteredTodos} />
          {currentBoard?.boardKey !== BOARD_KEYS.PROGRESS &&
            currentBoard?.boardKey !== BOARD_KEYS.COMPLETE &&
            currentBoard?.boardKey !== BOARD_KEYS.SEARCH && (
              <TodoInput item={currentBoard} />
            )}
        </div>

        {currentBoard?.boardKey === BOARD_KEYS.PROGRESS ? (
          <Progress />
        ) : (
          <div className=" grow flex flex-col gap-5 px-16 pb-5">
            {/* MY DAY */}
            {currentBoard?.boardKey === BOARD_KEYS.MY_DAY && (
              <>
                <TodoList todo={activeTodos} setTodo={setTodo} />
                {completedTodos.length > 0 && (
                  <Lists todo={completedTodos} list="انجام شده" />
                )}
              </>
            )}
            {currentBoard?.boardKey === BOARD_KEYS.ALL && (
              <>
                {boardList?.map((board: BoardType) => {
                  const grouped = activeTodos.filter((t) => {
                    return (
                      t.boardKey &&
                      normalize(t.boardKey) === normalize(board.boardKey)
                    );
                  });
                  const groupByDate = (todos: any[]) => {
                    return todos.reduce(
                      (acc, todo) => {
                        const date = getDateKey(todo.createdAt);

                        if (!acc[date || ""]) {
                          acc[date || ""] = [];
                        }

                        acc[date || ""].push(todo);

                        return acc;
                      },
                      {} as Record<string, any[]>,
                    );
                  };

                  const groupedByDate = groupByDate(grouped);
                  if (!grouped.length) return null;
                  return (
                    <Lists
                      key={board._id}
                      todo={grouped}
                      list={
                        BOARD_LABELS[board.boardKey as BoardKey] ?? board.title
                      }
                    />
                  );
                })}

                {completedTodos.length > 0 && (
                  <Lists todo={completedTodos} list="انجام شده" />
                )}
              </>
            )}
            {currentBoard?.boardKey === BOARD_KEYS.COMPLETE && (
              <>
                {boardList?.map((board: BoardType) => {
                  const grouped = completedTodos.filter((t) => {
                    return (
                      t.boardKey &&
                      normalize(t.boardKey) === normalize(board.boardKey)
                    );
                  });
                  if (!grouped.length) return null;
                  return (
                    <Lists
                      key={board._id}
                      todo={grouped}
                      list={
                        BOARD_LABELS[board.boardKey as BoardKey] ?? board.title
                      }
                    />
                  );
                })}
              </>
            )}
            {currentBoard &&
              !["myDay", "all", "complete"].includes(currentBoard.boardKey) && (
                <>
                  <TodoList todo={activeTodos} setTodo={setTodo} />
                  {completedTodos.length > 0 && (
                    <Lists todo={completedTodos} list="انجام شده" />
                  )}
                </>
              )}
            {currentBoard?.boardKey === BOARD_LABELS[BOARD_KEYS.ALL] &&
              boardList
                ?.slice()
                .map((board: any) => (
                  <Lists
                    key={board._id}
                    todo={todo}
                    list={
                      BOARD_LABELS[board.boardKey as BoardKey] ?? board.title
                    }
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
