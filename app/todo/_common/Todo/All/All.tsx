import { useContext, useState } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import TodoList from "../TodoList";
import Header from "../../Header/Header";
import { ArrowDown2 } from "iconsax-reactjs";
import { completed } from "../Todo.const";
import { TodoListItems } from "../TodoListItems";

const All = ({ item }: any) => {
  const { todo, setTodo } = useContext(TodoContext);
  const [isOpen, setOpen] = useState(true);
  const completedTodo = todo.filter((list: any) => list.status);
  const notCompletedTodo = todo.filter((list: any) => !list.status);

  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-purple-400 h-screen px-15 pt-5">
      <Header item={item} />
      <TodoList todo={notCompletedTodo} setTodo={setTodo} />
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" cursor-pointer bg-pink-200 px-1 items-center max-w-44 justify-center py-1 text-md rounded-md text-black flex gap-2 hover:bg-pink-50"
      >
        {
          <ArrowDown2
            className={`${isOpen ? "rotate-0" : "rotate-90"} transition-all`}
            size={15}
          />
        }

        <span>{completed.header}</span>
        <span className="text-sm bg-rose-400 text-pink-50 rounded-lg px-2">
          {todo.length}
        </span>
      </div>

      {isOpen && (
        <ul className="flex flex-col gap-1 w-full">
          {completedTodo.map((list: any) => {
            return <TodoListItems key={list.id} list={list} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default All;
