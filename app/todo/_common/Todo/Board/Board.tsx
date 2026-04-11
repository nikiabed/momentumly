"use client";
import { ListItemProps, TodoType } from "../Todo.const";
import { memo, useMemo } from "react";
import { TodoList } from "../TodoList";
import { Progress } from "../Progress";
import { TodoInput } from "../TodoInput";
import { useTodoContext } from "@/app/_utils";
import { Header } from "../../Header";
import { sidebar } from "../../Sidebar/Sidebar.const";

export const Board = ({
  item,
}: {
  item: ListItemProps;
}) => {
  
  const { todo, setTodo } = useTodoContext()
  const filtered = useMemo(()=>{ return todo.filter((list: TodoType) => {
    switch (item.title) {
      case sidebar.myDay:
        const date = new Date();
        return !list.status && list.date === date.toDateString();
      case sidebar.important:
        return list.isImportant;
      case sidebar.All:
        return list;
      case sidebar.complete:
        return list.status;
      default:
        return;
    }
  })
},[todo])

  const filter2 = useMemo(()=>todo.filter(item.filter),[todo]);
  return (
    <div
      className={` from-${item.color[0]} to-${item.color[1]} overflow-hidden flex-4 bg-linear-45 h-screen w-full pt-5`}
    >
      <div className="flex gap-4 flex-col h-screen">
        <div className="shrink-0 px-15 flex flex-col gap-4">
          <Header item={item} />
          {item.title !== sidebar.progress &&<TodoInput item={item}/>}
        </div>

        {item.title === sidebar.progress ? (
          <Progress item={item} />
        ) : (
        <div className=" overflow-y-auto grow flex flex-col gap-5 px-15 pb-5 w-full">
          <TodoList todo={filter2} setTodo={setTodo} />

          {/* {itemList.map((list:ListItemProps)=>{
            return <Lists key={list.id} todo={filtered} list={list.title} />
          })} */}
        </div>
         )} 
      </div>
    </div>
  );
};
