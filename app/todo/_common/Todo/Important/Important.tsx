import { useContext } from "react";
import Header from "../../Header/Header";
import { ListItemProps } from "../Todo.const";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import TodoList from "../TodoList";

const Important = ({ item }: { item: ListItemProps }) => {
  const { todo, setTodo } = useContext(TodoContext);
  const importantTodo = todo.filter((list: any) => list.isImportant);

  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-red-300 to-red-400 h-screen px-15 pt-5">
      <Header item={item} />
      <TodoList todo={importantTodo} setTodo={setTodo} />
    </div>
  );
};

export default Important;
