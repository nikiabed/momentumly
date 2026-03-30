import { useContext } from "react";
import CompletedList from "../CompletedList";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import { ListItemProps } from "../Todo.const";
import Header from "../../Header/Header";
import TodoList from "../TodoList";

const Complete = ({ item }: { item: ListItemProps }) => {
  const { todo, setTodo } = useContext(TodoContext);
  const completedTodo = todo.filter((list: any) => list.status);
  const Icon = item.icon;
  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-[#cac8d8] to-[#239e9a] h-screen px-15 pt-5">
      <Header item={item} />
      <TodoList setTodo={setTodo} todo={completedTodo} />
    </div>
  );
};

export default Complete;
