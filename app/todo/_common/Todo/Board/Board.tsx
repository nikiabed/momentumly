"use client";
import { ListItemProps, todoDate } from "../Todo.const";
import { TodoList } from "../TodoList";
import { Progress } from "../Progress";
import { TodoInput } from "../TodoInput";
import { useTodoContext } from "@/app/_utils";
import { Header } from "../../Header";
import { gradiants, sidebar } from "../../Sidebar/Sidebar.const";
import { Lists } from "../Lists";

export const Board = () => {
  const { todo, setTodo, boardList, activeBoard } = useTodoContext();

  const currentBoard = boardList?.find(b => b.title === activeBoard)
  
  if (!currentBoard) return null;
  const boardFilters = {
    "My Day": (todo: any) => todo.item === "My Day",
    "All": () => true,
    "Important": (todo: any) => todo.isImportant,
    "Complete": (todo: any) => todo.status,
    "Progress": () => true,
    "Work": (todo: any) => todo.item === "Work",
  };

const filter = boardFilters[currentBoard?.title as keyof typeof boardFilters || "All"]
const filteredTodos = todo.filter(filter)

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

  return (
    <div
      className={` ${gradiants[currentBoard.color]} overflow-hidden flex-4 h-screen w-full py-5`}
    >
      <div className="flex gap-4 flex-col h-screen py-5">
        <div className="shrink-0 px-15 flex flex-col gap-4 ">
          <Header item={currentBoard} />
          {currentBoard?.title !== sidebar.progress && (
            <TodoInput item={currentBoard} />
          )}
        </div>

        {currentBoard?.title === "Progress" ? (
          <Progress item={currentBoard} />
        ) : (
          <div className=" overflow-y-auto grow flex flex-col gap-5 px-15 pb-5 w-full">
            <TodoList todo={filteredTodos} setTodo={setTodo} />
            {/* {currentBoard?.title === sidebar.myDay && completedTodo.length > 0 && (
              <Lists
                key={currentBoard?._id}
                todo={completedTodo}
                list={sidebar.complete}
              />
            )} */}
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
