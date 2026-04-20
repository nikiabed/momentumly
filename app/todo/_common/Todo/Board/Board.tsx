"use client";
import { ListItemProps, todoDate, TodoType } from "../Todo.const";
import { memo, useMemo } from "react";
import { TodoList } from "../TodoList";
import { Progress } from "../Progress";
import { TodoInput } from "../TodoInput";
import { useTodoContext } from "@/app/_utils";
import { Header } from "../../Header";
import { sidebar } from "../../Sidebar/Sidebar.const";
import { Lists } from "../Lists";

export const Board = ({ item }: { item: ListItemProps }) => {
  const { todo, setTodo, focused } = useTodoContext();
  const filter2 = todo.filter(item.filter);
  const completedTodo = todo.filter(
    (todo: any) =>
      todo.item === sidebar.myDay && todo.status && todo.date === todoDate,
  );
  const importantTodo = todo.filter((todo: any) => todo.isImportant);
  const sliceIndex = () => {
    if (importantTodo.length > 0) {
      return 5
    } else {
      return 4
    }
  }
  return (
    <div
      className={` from-${item.color[0]} to-${item.color[1]} overflow-hidden flex-4 bg-linear-45 h-screen w-full py-5`}
    >
      <div className="flex gap-4 flex-col h-screen py-5">
        <div className="shrink-0 px-15 flex flex-col gap-4">
          <Header item={item} />
          {item.title !== sidebar.progress && <TodoInput item={item} />}
        </div>

        {item.title === sidebar.progress ? (
          <Progress item={item} />
        ) : (
          <div className=" overflow-y-auto grow flex flex-col gap-5 px-15 pb-5 w-full">
            <TodoList todo={filter2} setTodo={setTodo} />
            {item.title === sidebar.myDay && completedTodo.length > 0 && (
              <Lists
                key={item.id}
                todo={completedTodo}
                list={sidebar.complete}
              />
            )}
            {item.title === sidebar.All &&
              focused
                ?.slice(sliceIndex())
                .map((item: any) => (
                  <Lists
                    key={item.id}
                    todo={todo.filter(item.filter)}
                    list={item.title}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
