import { useContext } from "react";
import { TodoContext } from "@/app/_utils/contexts/TodoContext";
import TodoList from "../TodoList";
import Header from "../../Header/Header";

const All = ({ item }: any) => {
  const { todo, setTodo } = useContext(TodoContext);
  return (
    <div className="overflow-y-auto flex-4 flex gap-3 flex-col bg-linear-45 from-purple-300 to-purple-400 h-screen p-15">
      <Header item={item} />
      {<TodoList todo={todo} setTodo={setTodo} />}
    </div>
  );
};

export default All;
