"use client";
import { ListItemProps, todoDate } from "../Todo.const";
import { TodoList } from "../TodoList";
import { Progress } from "../Progress";
import { TodoInput } from "../TodoInput";
import { useTodoContext } from "@/app/_utils";
import { Header } from "../../Header";
import { gradiants, sidebar } from "../../Sidebar/Sidebar.const";
import { Lists } from "../Lists";
import { useMemo } from "react";
import { titleToKey } from "../../Sidebar";

export const Board = ({ item }: any) => {
  const { todo, setTodo, boardList } = useTodoContext();
  const currentBoard = item;

  const filteredTodos = todo.filter((t) => {
    if (!currentBoard) return false;
    if (currentBoard.boardKey === "all") return true;
    if (currentBoard.boardKey === "important") return t.isImportant;
    if (currentBoard.boardKey === "complete") return t.status;
    return t.boardKey === currentBoard.boardKey;
  });

  // const completedTodo = todo.filter(
  //   (todo: any) =>
  //     todo.item === sidebar.myDay && todo.status && todo.date === todoDate,
  // );
  // const importantTodo = todo.filter((todo: any) => todo.isImportant);
  const sliceIndex = () => {
    if (importantTodo.length > 0) {
      return 5;
    } else {
      return 4;
    }
  };

  const activeTodos = filteredTodos.filter((t) => !t.status);
  const completedTodos = filteredTodos.filter((t) => t.status);
  console.log(completedTodos);
  return (
    <div
      className={` ${gradiants[currentBoard.color]} overflow-hidden flex-4 h-screen w-full py-5`}
    >
      <div className="flex gap-4 flex-col h-screen py-5">
        <div className="shrink-0 px-15 flex flex-col gap-4 ">
          <Header item={currentBoard} />
          {currentBoard?.boardKey !== "progress" &&
            currentBoard?.boardKey !== "complete" && (
              <TodoInput item={currentBoard} />
            )}
        </div>

        {currentBoard?.title === "Progress" ? (
          <Progress item={currentBoard} />
        ) : (
          <div className=" overflow-y-auto grow flex flex-col gap-5 px-15 pb-5 w-full">
            {/* MY DAY */}
            {currentBoard.boardKey === "myDay" && (
              <>
                <TodoList todo={activeTodos} setTodo={setTodo} />
                {completedTodos.length > 0 && (
                  <Lists todo={completedTodos} list="انجام شده" />
                )}
              </>
            )}

            {currentBoard.boardKey === "all" && (
              <>
                {boardList?.map((board) => {
                  const grouped = activeTodos.filter((t) => {
                    return t.item === board.title;
                  });

                  if (!grouped.length) return null;

                  return (
                    <Lists key={board._id} todo={grouped} list={board.title} />
                  );
                })}

                {completedTodos.length > 0 && (
                  <Lists todo={completedTodos} list="انجام شده" />
                )}
              </>
            )}

            {currentBoard.boardKey === "complete" && (
              <>
                {boardList?.map((board) => {
                  const grouped = completedTodos.filter((t) => {
                    return t.item === board.title;
                  });

                  if (!grouped.length) return null;

                  return (
                    <Lists key={board._id} todo={grouped} list={board.title} />
                  );
                })}
              </>
            )}

            {!["myDay", "all", "complete"].includes(currentBoard.boardKey) && (
              <>
                <TodoList todo={activeTodos} setTodo={setTodo} />
                {completedTodos.length > 0 && (
                  <Lists todo={completedTodos} list="انجام شده" />
                )}
              </>
            )}

            {currentBoard?.title === sidebar.All &&
              boardList
                ?.slice(sliceIndex())
                .map((board: any) => (
                  <Lists key={board._id} todo={todo} list={board.title} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
